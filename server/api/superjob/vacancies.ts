import type { SuperJobVacanciesResponse } from "~/types/jobs";

const runtimeConfig = useRuntimeConfig();

const SJ_VACANCIES =
  "https://api.superjob.ru/2.0/vacancies?town=Великий Новгород&catalogues=33";

export async function fetchVacancies(
  page = 0,
): Promise<SuperJobVacanciesResponse> {
  return await $fetch(SJ_VACANCIES + `&page=${page}`, {
    headers: {
      "X-Api-App-Id": runtimeConfig.superjobKey,
    },
  });
}

export default defineEventHandler(async () => {
  return fetchVacancies();
});
