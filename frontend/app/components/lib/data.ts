import { DictType, ServiceType, SignInType } from "./definitions";

const api_host = process.env.API_HOST;

export async function signIn(email: string, password: string) {
  const response = await fetch(`${api_host}/api/token`);
  if (response.ok) {
    if (response.status === 200) {
      return (await response.json()) as SignInType;
    }
  }

  return null;
}

export async function getServices() {
  const response = await fetch(`${api_host}/api/services/`);
  if (response.ok) {
    if (response.status === 200) {
      return (await response.json()) as ServiceType[];
    }
  }

  return [];
}

export async function getDepartments() {
  const response = await fetch(`${api_host}/api/departments/`);
  if (response.ok) {
    if (response.status === 200) {
      return (await response.json()) as DictType[];
    }
  }

  return [];
}

export async function getManagements() {
  const response = await fetch(`${api_host}/api/managements/`);
  if (response.ok) {
    if (response.status === 200) {
      return (await response.json()) as DictType[];
    }
  }

  return [];
}

export async function getDivisions() {
  const response = await fetch(`${api_host}/api/divisions/`);
  if (response.ok) {
    if (response.status === 200) {
      return (await response.json()) as DictType[];
    }
  }

  return [];
}
