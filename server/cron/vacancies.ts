import { fetchAllVacancies } from "~/server/api/hh/all";
import type { HHVacancy, SupabaseVacancy } from "~/types/jobs";
import { defineCronHandler } from "#nuxt/cron";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";

async function deleteOldVacancies(supabase: SupabaseClient, tableName: string) {
  // time delta calculations for removing vacancies older than 24 hours
  const now = Date.now();
  const timestamp24HoursBefore = now - 24 * 60 * 60 * 1000;
  const timeDelta = new Date(timestamp24HoursBefore).toISOString();

  const { error } = await supabase
    .from(tableName)
    .delete()
    .lt("created_at", timeDelta);
  return error;
}

async function addHHVacanciesToDB(supabase: SupabaseClient) {
  const hhVacancies: HHVacancy[] = await fetchAllVacancies();

  const insertDataArray: SupabaseVacancy[] = [];
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

    insertDataArray.push(insertData);
  });
  const res = await deleteOldVacancies(supabase, "vacancy2");
  if (!res) {
    const { error } = await supabase.from("vacancy2").insert(insertDataArray);
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

    await addHHVacanciesToDB(supabase);
  },
  { runOnInit: true },
);
