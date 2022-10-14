import http from "./http.api";
import { TOKEN_LOCAL_KEY } from "../core/variables.core";

const AuthApi = new http("/user");

AuthApi.gets = null;
AuthApi.get = null;
AuthApi.post = null;
AuthApi.patch = null;
AuthApi.delete = null;

AuthApi.login = function (body) {
  return this.instance.post(`${this.baseApisUrl}/login`, body);
};

AuthApi.validateToken = function (config) {
  const token = localStorage.getItem(TOKEN_LOCAL_KEY);
  return this.instance.get(`${this.baseApisUrl}/get-profile`, {
    ...config,
    headers: { "x-auth-token": token },
  });
};

export { AuthApi };

// this is just for test and show how to write our apis
