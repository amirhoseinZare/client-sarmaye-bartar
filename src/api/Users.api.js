import http from "./http.api";

const UsersApi = new http("/user");

UsersApi.gets = null;
UsersApi.get = null;
UsersApi.post = null;
UsersApi.patch = null;
UsersApi.delete = null;

UsersApi.all = function (pageSize, pageNumber) {
  return this.instance.get(
    `${this.baseApisUrl}?pageSize=${pageSize}&pageNumber=${pageNumber}`
  );
};

UsersApi.delUser = function (id) {
  return this.instance.delete(`${this.baseApisUrl}/${id}`);
};

export { UsersApi };
