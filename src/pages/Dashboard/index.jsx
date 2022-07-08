// packages
import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, message, Skeleton, Divider, Statistic  } from "antd";

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
import { ReactComponent as LogoSvg  } from "../../assets/logo.svg"
import { FaLess } from "react-icons/fa";
ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend );
const { Countdown } = Statistic;
const todayBrokerEndTime = new Date()
todayBrokerEndTime.setUTCHours(21)
todayBrokerEndTime.setUTCMinutes(0)
todayBrokerEndTime.setUTCSeconds(0)
todayBrokerEndTime.setUTCMilliseconds(0)
const tomorrowBrokerTime = todayBrokerEndTime.getTime() + 86400*1000

const deadline = new Date().getTime() < todayBrokerEndTime ? todayBrokerEndTime : tomorrowBrokerTime

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
  const [loading, setLoading] = useState({
    chart:false,
    objective:false
  });

  useEffect(() => {
    setLoading(s=>({ ...s, chart:true, objective:true  }));
    if (user._id) {
      asyncFetch({userId:user._id, mtAccountId:user.mtAccountId});
    }
  }, [user]);

  console.log(user)

  const asyncFetch = ({userId, mtAccountId}) => {
    UsersApi.getChart(mtAccountId).then((response) => {
      setLoading(s=>({ ...s, chart:false }));
      if (!response.success) {
        message.error(response.message)
        return 
      }
      setData(response.result);
    });

    DashboardApi.objectives(userId).then((response) => {
      setLoading(s=>({ ...s, objective:false }));
      if (!response.success) {
        message.error(response.message)
        return
      }
      setObjectives(response.result);
    });
  };

  const options = useMemo(()=>({
    responsive: true,
    plugins: {
      legend: {
        display:false,
      },
      title: {
        display: true,
        text: 'Performance & Balance',
      },
    },
  }), [])

  const labels = useMemo(()=>data ? data.map(item=>item.startBrokerTime): [], [data])
  const dataSet = useMemo(()=>({
    labels,
    datasets: [
      {
        label: '',
        data: data ? data.map(item=>item.minEquity) : [],
        borderColor: 'rgb(59,72,89)',
        backgroundColor: 'rgba(59,72,89, 0.1)',
        pointStyle: 'dash'
      },
      {
        label: '',
        data: data ? data.map(item=>item.minBalance) : [],
        borderColor: 'rgb(255,182,41)',
        backgroundColor: 'rgb(255,182,41, 0.1)',
        pointStyle: 'dash'
      },
    ],

  }), [data])

  return (
    <>
      {user.isAuth ? (
        <div className={classes.root}>
          <Navbar />
          <Row className={classes.row}>
            <Col className={classes.col} xs={23} sm={23} md={17} lg={17} >
              {loading.chart ? <Skeleton title={false} active paragraph={{ rows: 15 }} /> : 
                <Line options={options} data={dataSet} /> }
            </Col>
            <Col className={classes.col} xs={23} sm={23} md={6} lg={6}>
              <DataBox classes={classes} user={user} />
            </Col>
            <Col className={classes.col} xs={23} sm={23} md={11} lg={11}>
              <div className={classes.container3}>
                <h2 className={classes.title} style={{textAlign:"left"}}>Your statistics</h2>
                <Divider
                  style={{
                    borderColor: "rgb(177 177 177 / 40%)",
                    width: "50%",
                    marginBottom: 30,
                    marginTop: 0,
                  }}
                />
                {loading.objective ? (
                  <Skeleton title={false} active paragraph={{ rows: 8 }} />
                ) : ( <>
                    <div className={classes.body}>
                      <div className={classes.results}>
                      </div>
                      <div>
                        {/* <p>{objectives["maxDailyLoss"]?.equity}</p> */}
                        <p>$ {+objectives["profitTarget"]?.firstBalance}</p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          First balance
                          {/* ( {+objectives["maxDailyLoss"]?.limit}$) */}
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
                      </div>
                      <div>
                        {/* <p>{objectives["maxDailyLoss"]?.equity}</p> */}
                        <p>$ {+objectives["profitTarget"]?.balance}</p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Balance
                          {/* ( {+objectives["maxDailyLoss"]?.limit}$) */}
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

                    <div className={classes.body} style={{width:"100%", fontWeight:"bolder"}}>
                      <div className={classes.results} style={{fontWeight:"bolder"}}>
                      </div>
                      <div>
                        <p style={{fontWeight:"bolder"}}>$ {objectives["maxLoss"]?.equity}</p>
                      </div>
                      <div className={classes.text}>
                        <p style={{fontWeight:"bolder"}}>
                          Equity
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
                      </div>
                      <div>
                        {/* <p>{objectives["maxDailyLoss"]?.equity}</p> */}
                        <p>$ {+objectives["maxDailyLoss"]?.dayBalance}</p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Day Balance
                          {/* ( {+objectives["maxDailyLoss"]?.limit}$) */}
                        </p>
                      </div>
                    
                    </div>

                  </>
                )}

              </div>

            </Col>
           
            <Col className={classes.col} xs={23} sm={23} md={11} lg={11}>
              <div className={classes.container3}>
                <div style={{display: "flex", justifyContent: "space-between", flexDirection: "row-reverse"}}><h2 className={classes.title} style={{textAlign:"left"}}>Objectives </h2> <Countdown value={deadline} /></div>
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
                {loading.objective ? (
                  <Skeleton title={false} active paragraph={{ rows: 8 }} />
                ) : (
                  <>
                    <div className={classes.body}>
                      <div className={classes.results}>
                        <p className={classes.status}>
                          {/* {objectives["minimumTradeDaysObjective"]?.passed
                            ? "passed"
                            : "failed"} */}
                          <span>
                            {/* {objectives["minimumTradeDaysObjective"]?.passed ? (
                              <BsFillCheckCircleFill className={classes.icon} />
                            ) : (
                              <IoMdCloseCircle className={classes.iconRed} />
                            )} */}
                            updating...
                          </span>
                        </p>
                      </div>
                      <div>
                        updating...
                        {/* <p>{objectives["minimumTradeDaysObjective"]?.count}</p> */}
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
                        {/* <p>{objectives["maxDailyLoss"]?.equity}</p> */}
                        <p>$ {+objectives["maxDailyLoss"]?.limit}</p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Max Daily loss 5% 
                          {/* ( {+objectives["maxDailyLoss"]?.limit}$) */}
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
                        {/* <p>{objectives["maxLoss"]?.equity}</p> */}
                        <p>$ {+objectives["maxLoss"]?.limit}</p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Max Loss {+objectives["maxLoss"]?.allowableMaxLossLimit}% 
                          {/* ( {+objectives["maxLoss"]?.limit} $) */}
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
                              {objectives["profitTarget"]?.passed
                                ? "passed"
                                : "failed"}
                              <span>
                                {objectives["profitTarget"]?.passed ? (
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
                            <>$ {objectives["profitTarget"]?.balance}</>
                          )}
                        </p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Profit Target {objectives["profitTarget"]?.percentDays}{objectives["profitTarget"]?.percentDays &&"%"} 
                          {/* ( {+objectives["profitTarget"]?.limit} $ ) */}
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
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
