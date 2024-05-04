import { serverSupabaseClient } from "#supabase/server";
// TODO: запускать парсер через nuxt cron
async function addHHVacanciesToDB() {
  const hhVacancies = await $fetch("api/vacancies/all");
}

export default eventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);

  const insertData = [
    {
      name: "Name",
      url: "Url",
      salary: "Salary",
      employer: "Employer",
      service: 1,
    },
  ];
  // @ts-ignore
  const { data, error } = await supabase
    .from("vacancy")
    .insert(insertData)
    .select();
  return data;
});
