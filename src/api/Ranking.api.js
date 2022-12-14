import http from "./http.api";

const RankingApi = new http("/user");

RankingApi.gets = null;
RankingApi.get = null;
RankingApi.post = null;
RankingApi.patch = null;
RankingApi.delete = null;

RankingApi.Rank = function (pageSize, pageNumber, firstBalance) {
  return this.instance.get(
    `${this.baseApisUrl}/rankings/balance/?pageSize=${pageSize}&pageNumber=${pageNumber}${firstBalance?`&firstBalance=${firstBalance}`:""}`
  );
};

export { RankingApi };
