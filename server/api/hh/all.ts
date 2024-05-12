import { fetchVacancies } from "~/server/api/hh/vacancies";
import type { HHVacancy } from "~/types/jobs";

export async function fetchAllHHVacancies() {
  const res = await fetchVacancies();
  const pagesTotal = res.pages;

  const vacancies: HHVacancy[] = [];
  let page = 0;
  while (page < pagesTotal) {
    const res = await fetchVacancies(page);
    res.items.map((vacancy) => {
      vacancies.push(vacancy);
    });
    page++;
  }
  return vacancies;
}

export default defineEventHandler(async () => {
  return fetchAllHHVacancies();
});
