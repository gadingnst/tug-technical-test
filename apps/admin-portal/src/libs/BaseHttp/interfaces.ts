export type BaseHttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export type BaseHttpResponseJson = Record<string, unknown>;

export interface BaseHttpConfig extends RequestInit {
  baseURL: string;
}

export interface BaseHttpError extends Error {
  response?: Response;
}
