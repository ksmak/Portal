export const API_HOST = "http://localhost:8000"

export type ServiceType = {
  id: number;
  name_ru: string;
  name_kk: string;
  category: number;
  image: string;
  target: string;
};

export type CredentialsType = {
  email: string;
  password: string;
};

export type DictType = {
  id: number;
  name_kk: string;
  name_ru: string;
};

export type UserType = {
  email: string;
  last_name: string;
  first_name: string;
  middle_name: string;
  department: number;
  management: number;
  division: number;
  rank: number;
  job: string;
  date_of_birth: string;
  phone: number;
};

export const ListOfMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export type QuoteType = {
  text_ru: string;
  text_kk: string;
  author_ru: string;
  author_kk: string;
}
