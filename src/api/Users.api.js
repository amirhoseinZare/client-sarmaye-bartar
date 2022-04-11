import http from "./http.api";

const UsersApi = new http("/user");

UsersApi.gets = null;
UsersApi.get = null;
UsersApi.post = null;
UsersApi.patch = null;
UsersApi.delete = null;

UsersApi.all = function (pageSize, pageNumber, user_email="") {
  return this.instance.get(
    `${this.baseApisUrl}?pageSize=${pageSize}&pageNumber=${pageNumber}&user_email=${user_email}`
  );
};

UsersApi.delUser = function (id) {
  return this.instance.delete(`${this.baseApisUrl}/${id}`);
};

UsersApi.patchUser = function (id, body) {
  return this.instance.patch(`${this.baseApisUrl}/${id}`, body);
};

UsersApi.addUser = function (body) {
  return this.instance.post(`${this.baseApisUrl}`, body);
};

UsersApi.getUser = function (id, body) {
  return this.instance.get(`${this.baseApisUrl}/${id}`, body);
};

export { UsersApi };
