import http from "./http.api";

const DashboardApi = new http("/user");

DashboardApi.gets = null;
DashboardApi.get = null;
DashboardApi.post = null;
DashboardApi.patch = null;
DashboardApi.delete = null;

DashboardApi.chart = function (UserId) {
  return this.instance.get(
    `${this.baseApisUrl}/equity-by-trades/all/${UserId}`
  );
};

DashboardApi.objectives = function (UserId) {
  return this.instance.get(
    `${this.baseApisUrl}/objectives/all/${UserId}`
  );
};


export { DashboardApi };

