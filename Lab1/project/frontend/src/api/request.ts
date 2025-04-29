import axios from "axios";
import { getHost } from "../utils/utils";

export const request = async <T>(
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  body?: any,
) => {
  const host = getHost();
  const url = `${host}/api/v1${endpoint}`;

  const methodFunc = defineRequestMethod(method);
  const headers = defineRequestHeaders(body);

  try {
    let response = ["GET", "DELETE"].includes(method)
      ? await methodFunc(url, { headers })
      : await methodFunc(url, body, { headers });

    return {
      data: response.data,
      status: response.status,
    } as T
  } catch (e) {
    console.error(e);
    return {
      data: (e as any).response.data,
      status: (e as any).status,
    } as T
  }
}



const defineRequestMethod = (method: "GET" | "POST" | "PUT" | "DELETE") => {
  switch (method) {
    case "GET":
      return axios.get;
    case "POST":
      return axios.post;
    case "PUT":
      return axios.put;
    case "DELETE":
      return axios.delete;
  }
}

const defineRequestHeaders = (body?: any) => {
  const headers: Record<string, string> = {};

  if (body instanceof FormData) {
    headers["Content-Type"] = "multipart/form-data";
  } else if (body) {
    headers["Content-Type"] = "application/json";
  }

  return headers;
}
