import { HttpClientInterface } from '../model';

export class HttpClientService implements HttpClientInterface {
  private readonly baseUrl: string;
  private readonly requestInit: RequestInit;

  constructor(baseUrl?: string, init?: RequestInit) {
    if (!baseUrl || !process.env.REACT_APP_BASE_URL) {
      throw new Error('baseUrl is undefined');
    }
    this.baseUrl = baseUrl;
    this.requestInit = init ?? {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  private requestOptions(options?: RequestInit): RequestInit {
    return { ...options, ...this.requestInit };
  }

  async fetch<T>(url: string, options?: RequestInit) {
    const response = await fetch(`${this.baseUrl}${url}`, this.requestOptions(options));
    if (!response.ok) {
      throw new Error('Response failed');
    }
    try {
      return response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async get<T>(url: string, options?: RequestInit) {
    try {
      return this.fetch(url, this.requestOptions({ method: 'GET', ...options }));
    } catch (error) {
      console.error(error);
    }
  }

  async post<T>(url: string, options?: RequestInit) {
    try {
      return this.fetch(url, this.requestOptions({ method: 'POST', ...options }));
    } catch (error) {
      console.error(error);
    }
  }

  async put<T>(url: string, options?: RequestInit) {
    try {
      return this.fetch(url, this.requestOptions({ method: 'PUT', ...options }));
    } catch (error) {
      console.error(error);
    }
  }

  async patch<T>(url: string, options?: RequestInit) {
    try {
      return this.fetch(url, this.requestOptions({ method: 'PATCH', ...options }));
    } catch (error) {
      console.error(error);
    }
  }

  async delete<T>(url: string, options?: RequestInit) {
    try {
      return this.fetch(url, this.requestOptions({ method: 'DELETE', ...options }));
    } catch (error) {
      console.error(error);
    }
  }
}
