import wretch from "wretch";

const api_host = process.env.API_HOST;

export async function getServices() {
  return wretch(`${api_host}/api/services/`)
    .get()
    .json()
}

export async function getDepartments() {
  return wretch(`${api_host}/api/departments/`)
    .get()
    .json()
}

export async function getManagements() {
  return wretch(`${api_host}/api/managements/`)
    .get()
    .json()
}

export async function getDivisions() {
  return wretch(`${api_host}/api/divisions/`)
    .get()
    .json()
}
