import { API_URL } from "./config";
import { LoginParams, RegisterParams } from "./types/Authentication";
import { TaskParams } from "./types/Task";
import { formatUrl } from "./utils/formatters";

/**
 * Communication layer, all routes in the system are specified here
 */
export const login = (params: LoginParams) => {
  const method = "POST";
  const url = formatUrl(API_URL, "auth/login");
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });
  const body = JSON.stringify(params);

  return httpRequest({
    method,
    url,
    headers,
    body,
  });
};

export const register = (params: RegisterParams) => {
  const method = "POST";
  const url = formatUrl(API_URL, "auth/register");
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });
  const body = JSON.stringify(params);

  return httpRequest({
    method,
    url,
    headers,
    body,
  });
};

export const getTasks = (page: number, pageSize: number) => {
  const method = "GET";
  const url = `${formatUrl(
    API_URL,
    "tasks"
  )}?page=${page}&pageSize=${pageSize}`;
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  return httpRequest({
    method,
    url,
    headers,
  });
};

export const getTask = (id: number) => {
  const method = "GET";
  const url = formatUrl(API_URL, `tasks/${id}`);
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });

  return httpRequest({
    method,
    url,
    headers,
  });
};

export const createTask = (params: TaskParams, accessToken: string) => {
  const method = "POST";
  const url = formatUrl(API_URL, "tasks");
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  });
  const body = JSON.stringify(params);

  return httpRequest({
    method,
    url,
    headers,
    body,
  });
};

export const updateTask = (
  params: TaskParams,
  id: number,
  accessToken: string
) => {
  const method = "PUT";
  const url = formatUrl(API_URL, `tasks/${id}`);
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  });
  const body = JSON.stringify(params);

  return httpRequest({
    method,
    url,
    headers,
    body,
  });
};

export const deleteTask = (id: number, accessToken: string) => {
  const method = "DELETE";
  const url = `${formatUrl(API_URL, "tasks")}/${id}`;
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
  });

  return httpRequest({
    method,
    url,
    headers,
  });
};

interface RequestOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  body?: BodyInit | null | undefined;
  headers?: Headers;
}

const httpRequest = async ({ method, url, body, headers }: RequestOptions) => {
  try {
    const response = await fetch(url, {
      method,
      body,
      headers,
    });

    const data = await response.json();
    const succeeded = response.ok;

    return {
      succeeded,
      data,
    };
  } catch (error) {
    return {
      succeeded: false,
      data: error,
    };
  }
};
