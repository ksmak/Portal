export const API_HOST = "http://localhost:8000";

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

export type StatReport = {
  title: string;
  date_of_create: string;
  file: string;
};

export interface WeatherDayType {
  dt?: number;
  main?: {
    temp?: number;
    feels_like?: number;
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
    sea_level?: number;
    grnd_level?: number;
    humidity?: number;
    temp_kf?: number;
  };
  weather: [
    {
      id?: number;
      main?: string;
      description?: string;
      icon?: string;
    }
  ];
  clouds?: {
    all?: number;
  };
  wind?: {
    speed?: number;
    deg?: number;
    gust?: number;
  };
  visibility?: number;
  pop?: number;
  rain?: {
    [`3h`]: number;
  };
  sys?: {
    pod?: string;
  };
  dt_txt?: string;
}

export interface WeatherType {
  cod?: number;
  message?: number;
  cnt?: number;
  list?: WeatherDayType[];
  city?: {
    id?: number;
    name?: string;
    coord?: {
      lat?: number;
      lon?: number;
    };
    country?: string;
    population?: number;
    timezone?: number;
    sunrise?: number;
    sunset?: number;
  };
}

export interface ConfigType {
  quote_text_ru?: string;
  quote_text_kk?: string;
  quote_author_ru?: string;
  quote_author_kk?: string;
  weather?: WeatherType;
}

export type ContactType = {
  last_name: string;
  first_name: string;
  middle_name: string;
  department: number;
  management: number;
  division: number;
  job: number;
  phone: number;
};
