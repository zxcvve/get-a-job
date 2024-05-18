import { serverSupabaseClient } from "#supabase/server";
import type { EventHandlerRequest, H3Event } from "h3";

async function getVacancy(event: H3Event<EventHandlerRequest>, id: number) {
  const supabase = await serverSupabaseClient(event);
  const query = supabase
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
    .eq("id", id);

  const { data } = await query;
  if (data !== null) {
    return data[0];
  }
}

export default eventHandler(async (event) => {
  const id = getRouterParam(event, "id");
  let idNumber = 0;
  if (typeof id !== "undefined") {
    idNumber = parseInt(id);
  }
  return getVacancy(event, idNumber);
});
