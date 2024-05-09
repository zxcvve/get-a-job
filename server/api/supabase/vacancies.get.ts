import { serverSupabaseClient } from "#supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

async function getTotalPages(supabase: SupabaseClient) {
  const { data, error } = await supabase.from("vacancy").select("*");
  if (data) {
    return Math.ceil(data?.length / 10);
  }
  return 1;
}

async function fetchSupabaseVacancies(
  event: any,
  page = 1,
  salaryFrom?: any,
  schedule?: any,
) {
  const supabase = await serverSupabaseClient(event);
  const totalPages = await getTotalPages(supabase);
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
        salary,
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
  return {
    data,
    pages: totalPages,
  };
}

export default eventHandler(async (event) => {
  const query = getQuery(event);
  // @ts-ignore
  return fetchSupabaseVacancies(
    event,
    query.page,
    query.salaryFrom,
    query.schedule,
  );
});
