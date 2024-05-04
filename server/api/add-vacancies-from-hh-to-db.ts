// import { serverSupabaseClient } from "#supabase/server";
import { fetchAllVacancies } from "~/server/api/hh/all";
import { serverSupabaseClient } from "#supabase/server";
// TODO: удалить это, когда будет реализован парсинг вакансий через nuxt cron
async function addHHVacanciesToDB(event) {
  const supabase = await serverSupabaseClient(event);

  const hhVacancies = await fetchAllVacancies();

  const insertDataArray = [];
  hhVacancies.map((vacancy) => {
    const salaryString = `От ${vacancy.salary?.from} до ${vacancy.salary?.to} ${vacancy.salary?.currency}`;

    const insertData = {
      name: vacancy.name,
      url: vacancy.alternate_url,
      salary: vacancy.salary,
      employer: vacancy.employer.name,
      service: 1,
    };

    insertDataArray.push(insertData);
  });

  const { data, error } = await supabase
    .from("vacancy")
    .insert(insertDataArray)
    .select();

  return data;
}

export default eventHandler(async (event) => {
  return addHHVacanciesToDB(event);
});
