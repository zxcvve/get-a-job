export type HHVacancy = {
  name: string;
  salary: Salary;
  alternate_url: string;
  employer: Employer;
  schedule: Schedule;
  experience: Experience;
  employment: Employment;
};

export type SupabaseVacancy = {
  name: string;
  salary: Salary;
  url: string;
  employer: string;
  schedule: Schedule;
  experience: Experience;
  employment: Employment;
  service: number;
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

export type SuperJobVacanciesResponse = {
  objects: SuperJobVacancy[];
  total: number;
  more: boolean;
  subscription_id: number;
  subscription_active: boolean;
};

export type SuperJobVacancy = {
  canEdit: boolean;
  is_closed: boolean;
  id: number;
  id_client: number;
  payment_from: number;
  payment_to: number;
  date_oub_to: number;
  date_archived: number;
  date_published: number;
  address: string;
  profession: string;
  work: null;
  compensation: null;
  candidat: string;
  metro: null[];
  currency: string;
  vacancyRichText: string;
  covid_vaccination_requirement: {
    id: number;
    title: string;
  };
  moveable: boolean;
  agreement: boolean;
  anonymous: boolean;
  is_archive: boolean;
  is_storage: boolean;
  type_of_work: {
    id: number;
    title: string;
  };
  place_of_work: {
    id: number;
    title: string;
  };
  education: {
    id: number;
    title: string;
  };
  experience: {
    id: number;
    title: string;
  };
  maritalstatus: {
    id: number;
    title: string;
  };
  children: {
    id: number;
    title: string;
  };
  client: {
    id: number;
    title: string;
    link: string;
    industry: [];
    description: string;
    vacancy_count: number;
    staff_count: string;
    client_logo: string;
    address: string | null;
    addresses: string[] | [];
    url: string;
    short_reg: boolean;
    is_blocked: boolean;
    registered_date: number;
    town: {
      id: number;
      title: string;
      declension: string;
      hasMetro: boolean;
      genitive: string;
    };
  };
  languages: [];
  driving_license: [];
  agency: {
    id: number;
    title: string;
  };
  town: {
    id: number;
    title: string;
    declension: string;
    hasMetro: boolean;
    genitive: string;
  };
  phone: string;
  phones: null;
  client_logo: string;
  age_from: number;
  age_to: number;
  gender: {
    id: number;
    title: string;
  };
  firm_name: string;
  firm_activity: string;
  link: string;
};
