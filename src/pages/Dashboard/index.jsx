// packages
import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, message, Skeleton, Divider } from "antd";

// css
import classes from "./Dashboard.module.scss";

// comps
import Navbar from "../../comps/Navbar/Navbar";
import Ranking from "../../comps/Ranking/Ranking";
import CurrentResults from "./comps/CurrentResults.component";

// api
import { DashboardApi } from "../../api";
import { UsersApi } from "../../api/Users.api";

// redux
import { useSelector } from "react-redux";

// icon
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";
import { IoMdCloseCircle } from "react-icons/io";

// variables
import { USER_ID_KEY } from "../../core/variables.core";
import DataBox from "./comps/DataBox.component";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );

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

  const options = useMemo(()=>({
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Performance',
      },
    },
  }), [])

  const labels = useMemo(()=>data.map(item=>item.trades), [data])
  const dataSet = useMemo(()=>({
    labels,
    datasets: [
      {
        label: 'equity by trades',
        data: data.map(item=>item.equity),
        borderColor: 'rgb(25, 144, 255)',
        backgroundColor: 'rgba(25, 144, 255, 0.5)',
      },
      
    ],
  }), [data])

  return (
    <>
      {user.isAuth ? (
        <div className={classes.root}>
          <Navbar />
          <Row className={classes.row}>
            <Col className={classes.col} xs={23} sm={23} md={20} lg={20}>
              <Line options={options} data={dataSet} />
            </Col>
            <Col className={classes.col} xs={23} sm={23} md={11} lg={12}>
              <div className={classes.container3}>
                <h2 className={classes.title} style={{textAlign:"left"}}>Objectives</h2>
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
                          Profit Target {objectives["profitTarget"]?.percentDays} {objectives["profitTarget"]?.percentDays && "%"} (
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
              <DataBox classes={classes} user={user} />
            </Col>
          </Row>
          <Row className={classes.row}>
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
