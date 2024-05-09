const SJ_VACANCIES =
  "https://api.superjob.ru/2.0/vacancies?town=Великий Новгород&catalogues=33";

// TODO: add correct type definition for superjob API responses
export async function fetchVacancies() {
  // @ts-expect-error
  return await $fetch(SJ_VACANCIES, {
    headers: {
      "X-Api-App-Id": process.env.SUPERJOB_KEY,
    },
  });
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  // @ts-expect-error
  return fetchVacancies(query.page);
});
