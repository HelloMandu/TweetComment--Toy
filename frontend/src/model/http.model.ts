export interface HttpClientInterface {
  fetch<T>(url: string, options?: RequestInit): Promise<T>;
  get<T>(url: string, options?: RequestInit): Promise<T>;
  post<T>(url: string, options?: RequestInit): Promise<T>;
  put<T>(url: string, options?: RequestInit): Promise<T>;
  delete<T>(url: string, options?: RequestInit): Promise<T>;
}
