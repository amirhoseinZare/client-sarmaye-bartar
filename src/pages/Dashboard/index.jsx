// packages
import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, message, Skeleton, Divider, Statistic  } from "antd";

// css
import classes from "./Dashboard.module.scss";

// comps
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
import { USER_ID_KEY, STAT_KEY } from "../../core/variables.core";
import DataBox from "./comps/DataBox.component";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

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

  const [data, setData] = useState({
    chart:[],
    objectives:[]
  });
  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user._id) {
      asyncFetch({userId:user._id, mtAccountId:user.mtAccountId});
    }
  }, [user]);

  const asyncFetch = ({userId, mtAccountId}) => {
    UsersApi.getChart(mtAccountId).then((response) => {
      setLoading(true);
      if (!response.success) {
        message.error(response.message)
        return 
      }
      const {chart, objective} = response.result
      setData({
        chart, 
        objectives:objective
      });
      setLoading(false);
      localStorage.setItem(STAT_KEY, btoa(JSON.stringify({
        chart,
        objective
      }))) 
    })

  };

  const options = useMemo(()=>({
    responsive: true,
    plugins: {
      // legend: {
      //   pointStyle: 'dash',
      // },
      // title: {
      //   display: true,
      //   text: 'Performance & Balance',
      // },
    },
  }), [])

  const labels = useMemo(()=>data.chart ? data.chart.map(item=>item.startBrokerTime): [], [data.chart])
  const dataSet = useMemo(()=>({
    labels,
    datasets: [
      {
        label: 'equity',
        data: data.chart ? data.chart.map(item=>item.minEquity) : [],
        borderColor: 'rgb(59,72,89)',
        backgroundColor: 'rgba(59,72,89, 0.1)',
        pointStyle: 'dash',
        tension: 0.4,
        cubicInterpolationMode: 'monotone',

      },
      {
        label: 'balance',
        data: data.chart ? data.chart.map(item=>item.minBalance) : [],
        borderColor: 'rgb(255,182,41)',
        backgroundColor: 'rgb(255,182,41, 0.1)',
        pointStyle: 'dash',
        tension: 0.4,
        cubicInterpolationMode: 'monotone',

      },
    ],

  }), [data.chart])
  console.log({isAuth:user.isAuth})
  return (
    <>
      {user.isAuth ? (
        <div className={classes.root}>
          
          {/* <UserMenu /> */}
          <Row className={classes.row}>
            <Col className={classes.col} xs={23} sm={23} md={17} lg={17} >
              {loading ? <Skeleton title={false} active paragraph={{ rows: 15 }} /> : 
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
                {loading ? (
                  <Skeleton title={false} active paragraph={{ rows: 8 }} />
                ) : ( <>
                    <div className={classes.body}>
                      <div className={classes.results}>
                      </div>
                      <div>
                        {/* <p>{data.objectives["maxDailyLoss"]?.equity}</p> */}
                        <p>$ {+data.objectives["profitTarget"]?.firstBalance}</p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          First balance
                          {/* ( {+data.objectives["maxDailyLoss"]?.limit}$) */}
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
                        {/* <p>{data.objectives["maxDailyLoss"]?.equity}</p> */}
                        <p>$ {+data.objectives["profitTarget"]?.balance}</p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Balance
                          {/* ( {+data.objectives["maxDailyLoss"]?.limit}$) */}
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
                        <p style={{fontWeight:"bolder"}}>$ {data.objectives["maxLoss"]?.equity}</p>
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
                        {/* <p>{data.objectives["maxDailyLoss"]?.equity}</p> */}
                        <p>$ {+data.objectives["maxDailyLoss"]?.dayBalance === null ? "updating..." : +data.objectives["maxDailyLoss"]?.dayBalance}</p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Day Balance
                          {/* ( {+data.objectives["maxDailyLoss"]?.limit}$) */}
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
                {loading ? (
                  <Skeleton title={false} active paragraph={{ rows: 8 }} />
                ) : (
                  <>
                    <div className={classes.body}>
                      <div className={classes.results}>
                        <p className={classes.status}>
                          {data.objectives["minimumTradeDaysObjective"]?.passed
                            ? "passed"
                            : "failed"}
                          <span>
                            {data.objectives["minimumTradeDaysObjective"]?.passed ? (
                              <BsFillCheckCircleFill className={classes.icon} />
                            ) : (
                              <IoMdCloseCircle className={classes.iconRed} />
                            )}
                          </span>
                        </p>
                      </div>
                      <div>
                        {/* <p className={classes.status}>
                          <span>...updating</span>
                        </p> */}
                        <p>{data.objectives["minimumTradeDaysObjective"]?.count}</p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Minimum {user.infinitive ? "-" : "5 Trading days"} 
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
                          {data.objectives["maxDailyLoss"]?.passed === null ? "...updating" :
                            data.objectives["maxDailyLoss"]?.passed ? "passed"
                            : "failed"}
                          <span>
                            {
                              data.objectives["maxDailyLoss"]?.passed === null ? "" :
                            data.objectives["maxDailyLoss"]?.passed ? (
                              <BsFillCheckCircleFill className={classes.icon} />
                            ) : (
                              <AiFillCloseCircle className={classes.iconRed} />
                            )}
                          </span>
                        </p>
                      </div>
                      <div>
                        {/* <p>{data.objectives["maxDailyLoss"]?.equity}</p> */}
                        <p>{ data.objectives["maxDailyLoss"]?.passed === null ? "...updating" : `$ ${+data.objectives["maxDailyLoss"]?.limit}`}</p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Max Daily loss 5% 
                          {/* ( {+data.objectives["maxDailyLoss"]?.limit}$) */}
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
                          {data.objectives["maxLoss"]?.passed ? "passed" : "failed"}
                          <span>
                            {data.objectives["maxLoss"]?.passed ? (
                              <BsFillCheckCircleFill className={classes.icon} />
                            ) : (
                              <AiFillCloseCircle className={classes.iconRed} />
                            )}
                          </span>
                        </p>
                      </div>
                      <div>
                        {/* <p>{data.objectives["maxLoss"]?.equity}</p> */}
                        <p>$ {+data.objectives["maxLoss"]?.limit}</p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Max Loss {+data.objectives["maxLoss"]?.allowableMaxLossLimit}% 
                          {/* ( {+data.objectives["maxLoss"]?.limit} $) */}
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
                              {data.objectives["profitTarget"]?.passed
                                ? "passed"
                                : "failed"}
                              <span>
                                {data.objectives["profitTarget"]?.passed ? (
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
                            <>$ {data.objectives["profitTarget"]?.balance}</>
                          )}
                        </p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Profit Target {data.objectives["profitTarget"]?.percentDays}{data.objectives["profitTarget"]?.percentDays &&"%"} 
                          {/* ( {+data.objectives["profitTarget"]?.limit} $ ) */}
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
