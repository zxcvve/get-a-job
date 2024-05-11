export type HHVacancy = {
  name: string;
  salary: Salary;
  alternate_url: string;
  employer: Employer;
  schedule: Schedule;
  experience: Experience;
  employment: Employment;
};

export type Employment = {
  id: number;
  name: string;
};

export type Experience = {
  id: number;
  name: string;
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

export type HHVacanciesResponse = {
  items: HHVacancy[];
  found: number;
  pages: number;
  page: number;
  per_page: number;
};

export type LogoUrls = { 90: string; original: string; 240: string };
