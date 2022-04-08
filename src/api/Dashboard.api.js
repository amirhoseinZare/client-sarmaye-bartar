import http from "./http.api";
import { TOKEN_LOCAL_KEY } from "../core/variables.core";

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

export { DashboardApi };
