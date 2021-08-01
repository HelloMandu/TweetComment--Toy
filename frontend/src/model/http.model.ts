export interface JsonResponse<T> extends Response {
  data?: {
    tweet: T;
  };
  errors?: Array<{ message: string }>;
}

export interface HttpClientInterface {
  baseUrl: string;
  requestInit?: RequestInit;
  fetch<T>(url: string, options?: RequestInit): Promise<JsonResponse<T> | void>;
}
