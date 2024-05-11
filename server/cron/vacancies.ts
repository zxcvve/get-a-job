import { fetchAllVacancies } from "~/server/api/hh/all";
import type { HHVacancy, SupabaseVacancy } from "~/types/jobs";
import { defineCronHandler } from "#nuxt/cron";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createClient } from "@supabase/supabase-js";
import { useLogger } from "@nuxt/kit";

async function clearDB(supabase: SupabaseClient, tableName: string) {
  const { error } = await supabase
    .from(tableName)
    .delete()
    .in("id", [...Array(1000).keys()]);

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
  const res = await clearDB(supabase, "vacancy2");
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

    const res = await addHHVacanciesToDB(supabase);
    const logger = useLogger("cron-vacancies");
    if (res) {
      logger.error(res);
    }
  },
  { runOnInit: true },
);
