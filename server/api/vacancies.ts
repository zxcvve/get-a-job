export type Vacancy = {
  employer: Employer;
  id: number;
  name: string;
  premium: boolean;
  salary?: Salary;
  schedule: Schedule;
};

export type Salary = {
  from: number;
  to: number;
  currency: string;
  gross: boolean;
};

export type Employer = {
  id: string;
  name: string;
  url: string;
  alternate_url: string;
  logo_urls: LogoUrls;
  vacancies_url: string;
  accredited_it_employer: boolean;
  trusted: boolean;
};

export type Schedule = {
  id: string;
  name: string;
};

export type VacanciesResponse = {
  items: Vacancy[];
  found: number;
  pages: number;
  page: number;
  per_page: number;
};

export type LogoUrls = { 90: string; original: string; 240: string };

// TODO: method should accept page number, at the moment only first page is returned

export default defineEventHandler(async (event) => {
  const res: VacanciesResponse = await $fetch(
    "https://api.hh.ru/vacancies?area=1051&professional_role=156&professional_role=160&professional_role=10&professional_role=12&professional_role=150&professional_role=25&professional_role=165&professional_role=34&professional_role=36&professional_role=73&professional_role=155&professional_role=96&professional_role=164&professional_role=104&professional_role=157&professional_role=107&professional_role=112&professional_role=113&professional_role=148&professional_role=114&professional_role=116&professional_role=121&professional_role=124&professional_role=125&professional_role=126",
  );
  return res;
});
