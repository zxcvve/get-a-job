import { serverSupabaseClient } from "#supabase/server";
import { SupabaseClient } from "@supabase/supabase-js";

function getTotalPages(count: number | null) {
  if (typeof count === "number") {
    return Math.ceil(count / 10);
  }
}

async function fetchSupabaseVacancies(
  event: any,
  page = 1,
  salaryFrom?: string | undefined,
  schedule?: any,
) {
  const supabase = await serverSupabaseClient(event);
  const pageMultiplier = 10 * (page - 1);
  const lowerRange = pageMultiplier;
  const upperRange = 9 + pageMultiplier;
  if (salaryFrom !== "0" && salaryFrom !== undefined) {
    const { data, error, count } = await supabase
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
        { head: false, count: "exact" },
      )
      .gte("salary->from", salaryFrom)
      .range(lowerRange, upperRange);
    const totalPages = getTotalPages(count);
    return { data, pages: totalPages };
  }
  const { data, error, count } = await supabase
    .from("vacancy")
    .select("*", { count: "exact", head: false })
    .range(lowerRange, upperRange);
  const totalPages = getTotalPages(count);
  return {
    data,
    pages: totalPages,
  };
}

export default eventHandler(async (event) => {
  const query = getQuery(event);
  // @ts-expect-error
  return fetchSupabaseVacancies(
    event,
    query.page,
    query.salaryFrom,
    query.schedule,
  );
});
