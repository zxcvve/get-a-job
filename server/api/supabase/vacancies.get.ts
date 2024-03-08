import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const { data: vacancies, error } = await supabase.from("vacancy").select("*");

  return { vacancies: vacancies };
});
