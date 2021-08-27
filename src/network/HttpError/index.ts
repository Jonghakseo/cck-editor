import { AxiosError, AxiosResponse } from "axios";

class HttpError {
  public status = -1;

  private rawError: any = null;

  private readonly response: any | null = null;

  private readonly message: any | null = null;

  constructor(error: AxiosResponse | AxiosError) {
    this.rawError = error;
    let data;
    // eslint-disable-next-line no-prototype-builtins
    if (error.hasOwnProperty("isAxiosError")) {
      // ? error type is AxiosError

      // @ts-ignore
      if (error.response) {
        // @ts-ignore
        data = error.response.data;
      }
    }
    // @ts-ignore
    if (error.data) {
      // @ts-ignore
      data = error.data;
    }

    if (data) {
      // const { message, status, response, timestamp } = data;
      // this.status = status;
      // this.response = response;
      // this.message = message;
    }
  }

  toString(): string {
    if (this.message) {
      return this.message;
    }
    return "";
  }

  getRawError(): any {
    return this.rawError;
  }
}

export default HttpError;
