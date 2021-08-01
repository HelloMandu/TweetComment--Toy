import { HttpClientInterface, JsonResponse } from '../model';

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

  async fetch<T>(url: string, options?: RequestInit): Promise<JsonResponse<T> | void> {
    const response = await fetch(`${this.baseUrl}${url}`, {
      ...options,
      ...this.requestInit,
    });
    const { data, errors }: JsonResponse<T> = await response.json();
    console.log(data, errors);
    // // let data: T;
    // // try {
    // //   data = await response.json();
    // // } catch (err) {
    // //   console.log(err);
    // // }
    // // const { status } = response;
    // // if (status < 200 || status > 299) {
    // //   const message = data && data.message ? data.message : 'Something Wrong!';
    // //   throw Error(message);
    // // }
    // return data;
  }
}
