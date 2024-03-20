import { serverSupabaseClient } from "#supabase/server";

async function fetchSupabaseVacancies(page = 1, event) {
  const supabase = await serverSupabaseClient(event);
  const pageMultiplier = 10 * (page - 1);
  const lowerRange = pageMultiplier;
  const upperRange = 9 + pageMultiplier;
  const { data, error } = await supabase
    .from("vacancy")
    .select("*")
    .range(lowerRange, upperRange);
  return data;
}

export default eventHandler(async (event) => {
  const query = getQuery(event);
  // @ts-ignore
  return fetchSupabaseVacancies(query.page, event);
});
