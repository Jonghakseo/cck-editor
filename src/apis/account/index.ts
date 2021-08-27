import { Method, request } from "../../network/Request";

const url = "20.41.102.169";

export function Login() {}

export function getSession() {
  return request({
    method: Method.GET,
    baseUrl: url,
  });
}
