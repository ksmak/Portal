export type ServiceType = {
  id: number;
  name: string;
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
