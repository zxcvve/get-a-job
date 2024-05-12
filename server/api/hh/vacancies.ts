import type { HHVacanciesResponse } from "~/types/jobs";

const HH_VACANCIES =
  "https://api.hh.ru/vacancies?area=1051&professional_role=156&professional_role=160&professional_role=10&professional_role=12&professional_role=150&professional_role=25&professional_role=165&professional_role=34&professional_role=36&professional_role=73&professional_role=155&professional_role=96&professional_role=164&professional_role=104&professional_role=157&professional_role=107&professional_role=112&professional_role=113&professional_role=148&professional_role=114&professional_role=116&professional_role=121&professional_role=124&professional_role=125&professional_role=126";

export async function fetchVacancies(
  page?: number,
): Promise<HHVacanciesResponse> {
  if (page) {
    return await $fetch(HH_VACANCIES + `&page=${page}`);
  }

  return await $fetch(HH_VACANCIES);
}

export default defineEventHandler(async (event) => {
  const query: { page: number } = getQuery(event);
  return fetchVacancies(query.page);
});
