import { fetchAllHHVacancies } from "~/server/api/hh/all";
import type {
  Experience,
  HHVacancy,
  Salary,
  Schedule,
  SupabaseVacancy,
  SuperJobVacancy,
} from "~/types/jobs";
import { defineCronHandler } from "#nuxt/cron";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import { fetchAllSuperJobVacancies } from "~/server/api/superjob/all";

async function deleteOldVacancies(supabase: SupabaseClient, tableName: string) {
  // time delta calculations for removing vacancies older than 24 hours
  const now = Date.now();
  const timestamp12HoursBefore = now - 12 * 60 * 60 * 1000;
  const timeDelta = new Date(timestamp12HoursBefore).toISOString();

  const { error } = await supabase
    .from(tableName)
    .delete()
    .lt("created_at", timeDelta);

  const { count } = await supabase
    .from(tableName)
    .select("*", { head: true, count: "exact" });

  return { count, error };
}

async function collectSuperJobVacancies() {
  const superJobVacancies: SuperJobVacancy[] =
    await fetchAllSuperJobVacancies();
  const processedSuperJobVacancies: SupabaseVacancy[] = [];
  superJobVacancies.map((vacancy) => {
    const vacancySchedule: Schedule = { id: "", name: "" };
    switch (vacancy.place_of_work.id) {
      case 2:
        vacancySchedule.id = "remote";
        vacancySchedule.name = "Удаленная работа";
        break;
      case 1:
      default:
        vacancySchedule.id = "fullDay";
        vacancySchedule.name = "Полный день";
        break;
    }

    const vacancyExperience: Experience = { id: "", name: "" };
    switch (vacancy.experience.id) {
      case 2:
        vacancyExperience.id = "between1And3";
        vacancyExperience.name = "От 1 года до 3 лет";
        break;
      case 3:
        vacancyExperience.id = "between1And6";
        vacancyExperience.name = "От 3 до 6 лет";
        break;
      case 4:
        vacancyExperience.id = "moreThan6";
        vacancyExperience.name = "Более 6 лет";
        break;
      case 1:
      default:
        vacancyExperience.id = "noExperience";
        vacancyExperience.name = "Нет опыта";
        break;
    }

    const vacancySalary: Salary = {
      from: vacancy.payment_from,
      to: vacancy.payment_to,
      currency: "RUR",
      gross: false,
    };

    const insertData: SupabaseVacancy = {
      name: vacancy.profession,
      salary: vacancySalary,
      url: vacancy.link,
      employer: vacancy.client.title,
      schedule: vacancySchedule,
      experience: vacancyExperience,
      service: 2,
    };
    processedSuperJobVacancies.push(insertData);
  });
  return processedSuperJobVacancies;
}

async function collectHHVacancies() {
  const hhVacancies: HHVacancy[] = await fetchAllHHVacancies();
  const processedHHVacancies: SupabaseVacancy[] = [];
  hhVacancies.map((vacancy) => {
    const insertData: SupabaseVacancy = {
      name: vacancy.name,
      salary: vacancy.salary,
      url: vacancy.alternate_url,
      employer: vacancy.employer.name,
      schedule: vacancy.schedule,
      experience: vacancy.experience,
      employment: vacancy.employment,
      service: 1,
    };

    processedHHVacancies.push(insertData);
  });
  return processedHHVacancies;
}

async function addVacanciesToDB(supabase: SupabaseClient) {
  const res = await deleteOldVacancies(supabase, "vacancy");

  if (res.error) {
    return res.error;
  }

  if (res.count === 0) {
    let processedVacancies: SupabaseVacancy[] = [];
    const HHVacancies = await collectHHVacancies();
    processedVacancies = processedVacancies.concat(HHVacancies);

    const superJobVacancies = await collectSuperJobVacancies();
    processedVacancies = processedVacancies.concat(superJobVacancies);

    const { error } = await supabase.from("vacancy").insert(processedVacancies);
    return error;
  }
}

export default defineCronHandler(
  "daily",
  async () => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_KEY!,
    );

    await addVacanciesToDB(supabase);
  },
  { runOnInit: true },
);
