import { serverSupabaseClient } from "#supabase/server";

async function fetchSupabaseVacancies(page = 1, salaryFrom?, schedule?, event) {
  const supabase = await serverSupabaseClient(event);
  const pageMultiplier = 10 * (page - 1);
  const lowerRange = pageMultiplier;
  const upperRange = 9 + pageMultiplier;
  if (salaryFrom) {
    const { data, error } = await supabase
      .from("vacancy")
      .select(
        `
        id,
        name,
        url,
        employer,
        service,
        minimal_salary: salary->from
      `,
      )
      .gte("salary->from", salaryFrom)
      .range(lowerRange, upperRange);
    return data;
  }
  const { data, error } = await supabase
    .from("vacancy")
    .select("*")
    .range(lowerRange, upperRange);
  return data;
}

export default eventHandler(async (event) => {
  const query = getQuery(event);
  // @ts-ignore
  return fetchSupabaseVacancies(
    query.page,
    query.salaryFrom,
    query.schedule,
    event,
  );
});
