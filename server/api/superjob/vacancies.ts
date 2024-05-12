import type { SuperJobVacanciesResponse } from "~/types/jobs";

const SJ_VACANCIES =
  "https://api.superjob.ru/2.0/vacancies?town=Великий Новгород&catalogues=33";

export async function fetchVacancies(): Promise<SuperJobVacanciesResponse> {
  return await $fetch(SJ_VACANCIES, {
    headers: {
      "X-Api-App-Id": process.env.SUPERJOB_KEY!,
    },
  });
}

export default defineEventHandler(async () => {
  return fetchVacancies();
});
