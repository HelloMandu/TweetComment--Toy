import { HttpClientInterface } from '../model';

export class HttpClientService implements HttpClientInterface {
  private readonly baseUrl: string;
  private readonly requestInit: RequestInit;

  constructor(baseUrl: string, init?: RequestInit) {
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
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async get<T>(url: string, options?: RequestInit) {
    try {
      return await this.fetch(url, this.requestOptions({ method: 'GET', ...options }));
    } catch (error) {
      console.error(error);
    }
  }

  async post<T>(url: string, options?: RequestInit) {
    try {
      return await this.fetch(url, this.requestOptions({ method: 'POST', ...options }));
    } catch (error) {
      console.error(error);
    }
  }

  async put<T>(url: string, options?: RequestInit) {
    try {
      return await this.fetch(url, this.requestOptions({ method: 'PUT', ...options }));
    } catch (error) {
      console.error(error);
    }
  }

  async delete<T>(url: string, options?: RequestInit) {
    try {
      return await this.fetch(url, this.requestOptions({ method: 'DELETE', ...options }));
    } catch (error) {
      console.error(error);
    }
  }
}
