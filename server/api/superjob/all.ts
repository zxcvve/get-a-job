import { fetchVacancies } from "~/server/api/superjob/vacancies";
import type { SuperJobVacancy } from "~/types/jobs";

export async function fetchAllSuperJobVacancies() {
  const res = await fetchVacancies();

  const vacancies: SuperJobVacancy[] = [];
  let page = 0;

  do {
    const tempRes = await fetchVacancies(page);
    page += 1;
    tempRes.objects.map((vacancy) => {
      vacancies.push(vacancy);
    });
  } while (res.more);

  return vacancies;
}

export default defineEventHandler(async () => {
  return fetchAllSuperJobVacancies();
});
