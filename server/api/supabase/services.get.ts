import { serverSupabaseClient } from "#supabase/server";

export default eventHandler(async (event) => {
  const supabase = await serverSupabaseClient(event);
  const { data: service } = await supabase.from("service").select("*");

  return { services: service };
});
