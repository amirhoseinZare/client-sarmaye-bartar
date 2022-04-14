import React, { useState, useEffect } from "react";
import { Row, Col, message } from "antd";
import { Line } from "@ant-design/plots";
import { Divider } from "antd";
import classes from "./Dashboard.module.scss";
import Navbar from "../../comps/Navbar/Navbar";

// api
import { DashboardApi } from "../../api";

// redux
import { useSelector } from "react-redux";
import { Skeleton } from "antd";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";
import { USER_ID_KEY } from "../../core/variables.core";
import { UsersApi } from "../../api/Users.api";

import Ranking from "../../comps/Ranking/Ranking";

const Dashboard = () => {
  const userData = useSelector((store) => store.user);

  const [user, setUser] = useState({});

  useEffect(() => {
    if (userData.role === "admin") {
      let userId = localStorage.getItem(USER_ID_KEY);
      UsersApi.getUser(userId).then((res) => {
        if (res.success) {
          setUser({ ...res.result, isAuth: true });
          message.success(res.message);
        } else {
          message.error(res.message);
        }
      });
    } else {
      setUser(userData);
    }
  }, [userData]);

  const [data, setData] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user._id) {
      asyncFetch(user._id);
    }
  }, [user]);

  const asyncFetch = (userId) => {
    DashboardApi.chart(userId).then((response) => {
      setData(response.result);
      if (response.success) {
        setLoading(false);
      }
    });

    DashboardApi.objectives(userId).then((response) => {
      setObjectives(response.result);
      if (response.success) {
        setLoading(false);
      }
    });
  };

  const config = {
    data,
    padding: "auto",
    xField: "trades",
    yField: "equity",
    xAxis: {
      tickCount: 5,
      title: {
        text: "Number of trades",
        style: {
          fontSize: 16,
        },
      },
    },
    yAxis: {
      tickCount: 15,
      min: 0,
      //  max: 5000,
      // 文本标签
      title: {
        text: "Balance",
        style: {
          fontSize: 16,
        },
      },
      // 坐标轴线的配置项 null 表示不展示
    },
    // annotations: [
    // 	// 低于中位数颜色变化
    // 	{
    // 		type: "regionFilter",
    // 		start: ["min", "median"],
    // 		end: ["max", "0"],
    // 		color: "#F4664A",
    // 	},
    // 	{
    // 		type: "text",
    // 		position: ["min", "median"],
    // 		// content: "中位数",
    // 		offsetY: -4,
    // 		style: {
    // 			textBaseline: "bottom",
    // 		},
    // 	},
    // 	{
    // 		type: "line",
    // 		start: ["min", "median"],
    // 		end: ["max", "median"],
    // 		style: {
    // 			stroke: "#F4664A",
    // 			lineDash: [2, 2],
    // 		},
    // 	},
    // ],
    smooth: true,
  };

  return (
    <>
      {user.isAuth ? (
        <div className={classes.root}>
          <Navbar />
          <Row className={classes.row}>
            <Col className={classes.col} xs={23} sm={23} md={20} lg={20}>
              <div className={classes.container}>
                <h2>Current Results</h2>
                <Divider
                  style={{
                    borderColor: "rgb(177 177 177 / 40%)",
                    width: "50%",
                    marginBottom: 30,
                    marginTop: 20,
                  }}
                />
                {loading ? (
                  <Skeleton active title={false} paragraph={{ rows: 12 }} />
                ) : (
                  <Line {...config} />
                )}
              </div>
            </Col>
            <Col className={classes.col} xs={23} sm={23} md={11} lg={12}>
              <div className={classes.container3}>
                <h2 style={{ textAlign: "left" }}>Objectives</h2>
                <Divider
                  style={{
                    borderColor: "rgb(177 177 177 / 40%)",
                    width: "50%",
                    marginBottom: 30,
                    marginTop: 0,
                  }}
                />
                <div className={classes.header}>
                  <div className={classes.results}>
                    <h3>Summary</h3>
                  </div>
                  <div>
                    <h3 style={{ paddingLeft: 25 }}>Your Results</h3>
                  </div>
                  <div className={classes.text}>
                    <h3>Trading Objectives</h3>
                  </div>
                </div>
                {loading ? (
                  <Skeleton title={false} active paragraph={{ rows: 8 }} />
                ) : (
                  <>
                    <div className={classes.body}>
                      <div className={classes.results}>
                        <p className={classes.status}>
                          {objectives["minimumTradeDaysObjective"]?.passed
                            ? "passed"
                            : "failed"}
                          <span>
                            {objectives["minimumTradeDaysObjective"]?.passed ? (
                              <BsFillCheckCircleFill className={classes.icon} />
                            ) : (
                              <IoMdCloseCircle className={classes.iconRed} />
                            )}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p>{objectives["minimumTradeDaysObjective"]?.count}</p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Minimum {user.infinitive ? "-" : "5"} Tradings day
                        </p>
                      </div>
                    </div>
                    <div style={{ width: "97%", margin: "0 auto" }}>
                      <Divider
                        style={{
                          borderColor: "rgb(177 177 177 / 40%)",
                          width: "50%",
                          marginBottom: 0,
                          marginTop: 0,
                        }}
                      />
                    </div>
                    <div className={classes.body}>
                      <div className={classes.results}>
                        <p className={classes.status}>
                          {objectives["maxDailyLoss"]?.passed
                            ? "passed"
                            : "failed"}
                          <span>
                            {objectives["maxDailyLoss"]?.passed ? (
                              <BsFillCheckCircleFill className={classes.icon} />
                            ) : (
                              <AiFillCloseCircle className={classes.iconRed} />
                            )}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p>{objectives["maxDailyLoss"]?.equity}</p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Max Daily loss 5% (
                          {+objectives["maxDailyLoss"]?.dayBalance * 0.95}$)
                        </p>
                      </div>
                    </div>
                    <div style={{ width: "97%", margin: "0 auto" }}>
                      <Divider
                        style={{
                          borderColor: "rgb(177 177 177 / 40%)",
                          width: "50%",
                          marginBottom: 0,
                          marginTop: 0,
                        }}
                      />
                    </div>
                    <div className={classes.body}>
                      <div className={classes.results}>
                        <p className={classes.status}>
                          {objectives["maxLoss"]?.passed ? "passed" : "failed"}
                          <span>
                            {objectives["maxLoss"]?.passed ? (
                              <BsFillCheckCircleFill className={classes.icon} />
                            ) : (
                              <AiFillCloseCircle className={classes.iconRed} />
                            )}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p>{objectives["maxLoss"]?.equity}</p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Max Loss 10% (
                          {+objectives["maxLoss"]?.firstBalance * 0.9}
                          $)
                        </p>
                      </div>
                    </div>
                    <div style={{ width: "97%", margin: "0 auto" }}>
                      <Divider
                        style={{
                          borderColor: "rgb(177 177 177 / 40%)",
                          width: "50%",
                          marginBottom: 0,
                          marginTop: 0,
                        }}
                      />
                    </div>
                    <div className={classes.body}>
                      <div className={classes.results}>
                        <p className={classes.status}>
                          {user.infinitive ? (
                            "-"
                          ) : (
                            <>
                              {" "}
                              {objectives["maxLoss"]?.passed
                                ? "passed"
                                : "failed"}
                              <span>
                                {objectives["maxLoss"]?.passed ? (
                                  <BsFillCheckCircleFill
                                    className={classes.icon}
                                  />
                                ) : (
                                  <AiFillCloseCircle
                                    className={classes.iconRed}
                                  />
                                )}
                              </span>
                            </>
                          )}
                        </p>
                      </div>
                      <div>
                        <p>
                          {user.infinitive ? (
                            "-"
                          ) : (
                            <>{objectives["profitTarget"]?.balance}</>
                          )}
                        </p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Profit Target 10% (
                          {+objectives["profitTarget"]?.firstBalance *
                            (1 +
                              +objectives["profitTarget"]?.percentDays / 100)}
                          $)
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </Col>
            <Col className={classes.col} xs={23} sm={23} md={7} lg={6}>
              <div className={classes.container2}>
                <h2>{user.user_login}</h2>
                <div style={{ width: "100%", margin: "0 auto" }}>
                  <Divider
                    style={{
                      borderColor: "rgb(177 177 177 / 40%)",
                      width: "50%",
                      marginBottom: 15,
                      marginTop: 15,
                    }}
                  />
                  <div className={classes.body}>
                    <div className={classes.item}>
                      <div>
                        {user.startTradeDay
                          ? user.startTradeDay.slice(0, 10)
                          : "-"}
                      </div>
                      <div>start</div>
                    </div>
                    <Divider
                      style={{
                        borderColor: "rgb(177 177 177 / 40%)",
                        width: "50%",
                        marginBottom: 15,
                        marginTop: 15,
                      }}
                    />
                    <div className={classes.item}>
                      <div>
                        {user.endTradeDay ? user.endTradeDay.slice(0, 10) : "-"}
                      </div>
                      <div>end</div>
                    </div>
                    <Divider
                      style={{
                        borderColor: "rgb(177 177 177 / 40%)",
                        width: "50%",
                        marginBottom: 15,
                        marginTop: 15,
                      }}
                    />
                    <div className={classes.item}>
                      <div>Sarmaye gozar bartar</div>
                      <div>Provider</div>
                    </div>
                    <Divider
                      style={{
                        borderColor: "rgb(177 177 177 / 40%)",
                        width: "50%",
                        marginBottom: 15,
                        marginTop: 15,
                      }}
                    />
                    <div className={classes.item}>
                      <div>{user.accountType}</div>
                      <div>Account Type</div>
                    </div>
                    <Divider
                      style={{
                        borderColor: "rgb(177 177 177 / 40%)",
                        width: "50%",
                        marginBottom: 15,
                        marginTop: 15,
                      }}
                    />
                    <div className={classes.item}>
                      <div>{user.platform}</div>
                      <div>Platform</div>
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row className={classes.row}>
            {console.log("test")}
            <Col
              xs={23}
              sm={23}
              md={20}
              lg={20}
              xl={20}
              className={classes.titleBox}
            >
              <h2 style={{ marginTop: "100px" }}>برترین کاربران</h2>
            </Col>
            <Col xs={23} sm={23} md={20} lg={20} xl={20}>
              <Ranking />
            </Col>
          </Row>
        </div>
      ) : null}
    </>
  );
};

export default Dashboard;
