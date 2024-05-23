import { serverSupabaseClient } from "#supabase/server";
import type { EventHandlerRequest, H3Event } from "h3";

function getTotalPages(count: number | null) {
  if (typeof count === "number") {
    return Math.ceil(count / 10);
  }
}

type VacancyFilters = {
  salaryFrom?: number;
  schedule: string;
  experience: string;
};

async function fetchSupabaseVacancies(
  event: H3Event<EventHandlerRequest>,
  page = 1,
  vacancyFilters: VacancyFilters,
) {
  const supabase = await serverSupabaseClient(event);
  const pageMultiplier = 10 * (page - 1);
  const lowerRange = pageMultiplier;
  const upperRange = 9 + pageMultiplier;
  let query = supabase.from("vacancy").select(
    `
        id,
        name,
        url,
        employer,
        service,
        salary,
        minimal_salary: salary->from,
        work_schedule: schedule->id
      `,
    { head: false, count: "exact" },
  );

  if (
    vacancyFilters.salaryFrom !== 0 &&
    vacancyFilters.salaryFrom !== undefined
  ) {
    query = query.gte("salary->from", vacancyFilters.salaryFrom);
  }

  if (vacancyFilters.schedule) {
    query = query.eq("schedule->id", `"${vacancyFilters.schedule}"`);
  }

  if (vacancyFilters.experience) {
    query = query.eq("experience->id", `"${vacancyFilters.experience}"`);
  }

  query = query.range(lowerRange, upperRange);
  const { data, count } = await query;
  const totalPages = getTotalPages(count);
  return {
    data,
    pages: totalPages,
  };
}

export default eventHandler(async (event) => {
  type queryValue = {
    page: number;
    salaryFrom: number;
    schedule: string;
    experience: string;
  };
  const query: queryValue = getQuery(event);
  const vacancyFilters: VacancyFilters = {
    salaryFrom: Number(query.salaryFrom),
    schedule: query.schedule,
    experience: query.experience,
  };
  return fetchSupabaseVacancies(event, query.page, vacancyFilters);
});
