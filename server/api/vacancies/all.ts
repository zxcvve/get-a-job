import { fetchVacancies } from "~/server/api/vacancies";
import { Vacancy } from "~/types";

async function fetchAllVacancies() {
  const res = await fetchVacancies();
  const pagesTotal = res.pages;

  const vacancies: Vacancy[] = [];
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

export default defineEventHandler(async (event) => {
  return fetchAllVacancies();
});
