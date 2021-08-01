import { HttpClientInterface } from '../model';

export class HttpClientService implements HttpClientInterface {
  baseUrl: string;
  requestInit: RequestInit;

  constructor(baseUrl: string, init?: RequestInit) {
    this.baseUrl = baseUrl;
    this.requestInit = init ?? {
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }

  async fetch<T>(url: string, options?: RequestInit) {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      ...this.requestInit,
    });
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
      return await this.fetch(url, {
        method: 'GET',
        ...options,
        ...this.requestInit,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async post<T>(url: string, options?: RequestInit) {
    try {
      return await this.fetch(url, {
        method: 'POST',
        ...options,
        ...this.requestInit,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async put<T>(url: string, options?: RequestInit) {
    try {
      return await this.fetch(url, {
        method: 'PUT',
        ...options,
        ...this.requestInit,
      });
    } catch (error) {
      console.error(error);
    }
  }

  async delete<T>(url: string, options?: RequestInit) {
    try {
      return await this.fetch(url, {
        method: 'DELETE',
        ...options,
        ...this.requestInit,
      });
    } catch (error) {
      console.error(error);
    }
  }
}
