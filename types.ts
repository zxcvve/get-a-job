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
