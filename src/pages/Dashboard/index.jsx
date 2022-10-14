// packages
import React, { useState, useEffect, useMemo } from "react";
import { Row, Col, message, Skeleton, Divider, Statistic,Button  } from "antd";

// css
import classes from "./Dashboard.module.scss";

// comps
import Ranking from "../../comps/Ranking/Ranking";

// api
import { UsersApi } from "../../api/Users.api";
import { RequestApi } from "../../api/Request.api";

// redux
import { useSelector } from "react-redux";

// icon
import { BsFillCheckCircleFill } from "react-icons/bs";
import { AiFillCloseCircle } from "react-icons/ai";

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
  console.log('user accounts ', user)
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
      if(userData.role === "admin"){
        asyncFetch({userId:user._id, mtAccountId:user.mtAccountId});
        return
      }
      const currentAccount = user.accounts[user.accounts.length-1]
      asyncFetch({userId:currentAccount._id, mtAccountId:currentAccount.mtAccountId});
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
        label: 'Minimum equity',
        data: data.chart ? data.chart.map(item=>item.minEquity) : [],
        borderColor: 'rgb(59,72,89)',
        backgroundColor: 'rgba(59,72,89, 0.1)',
        pointStyle: 'dash',
        tension: 0.4,
        cubicInterpolationMode: 'monotone',

      },
      {
        label: 'Balance',
        data: data.chart ? data.chart.map(item=>item.minBalance) : [],
        borderColor: 'rgb(50, 130, 184)',
        backgroundColor: 'rgb(50, 130, 184, 0.1)',
        pointStyle: 'dash',
        tension: 0.4,
        cubicInterpolationMode: 'monotone',

      },
    ],

  }), [data.chart])

  const [buttons, setButtons] = useState({
    extend:false,
    reset:false,
    nextPhase:false
  })

  const sendRequest = async (type) =>{
    setButtons(s=>({...s, [type]:true}))
    const call = await RequestApi.post({
      type,
      userId:user._id
    })
    setButtons(s=>({...s, [type]:false}))
    if(!call.success){
      message.error(call.message)
      return
    }
    message.success(call.message)
  }

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
                  <h2 className={classes.title} style={{textAlign:"left", display:"flex", flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
                      <div>
                        {(!user.infinitive) /*&& data.objectives["minimumTradeDaysObjective"]?.passed*/ && data.objectives["maxDailyLoss"]?.passed && data.objectives["maxLoss"]?.passed && new Date(user.endTradeDay).getTime() < new Date().getTime() && +data.objectives["profitTarget"]?.firstBalance <= +data.objectives["profitTarget"]?.balance &&  <div>
                          <Button onClick={()=>sendRequest("extend")} loading={buttons.extend} classes={classes.extend} style={{  backgroundColor: "#24303C", color:"#fff", borderRadius:"12px"}}>extend 10 days</Button>
                        </div>}
                        {(!user.infinitive) &&
                        /*data.objectives["minimumTradeDaysObjective"]?.passed &&*/  data.objectives["maxDailyLoss"]?.passed &&  
                        data.objectives["profitTarget"]?.passed && data.objectives["maxLoss"]?.passed &&  <div>
                          <Button onClick={()=>sendRequest("nextPhase")} loading={buttons.nextPhase} classes={classes.nextPhase} style={{  backgroundColor: "#24303C", color:"#fff", borderRadius:"12px"}}>next phase</Button>
                        </div>}
                        {(!user.infinitive) && /*data.objectives["minimumTradeDaysObjective"]?.passed &&*/ data.objectives["maxDailyLoss"]?.passed && data.objectives["maxLoss"]?.passed && new Date(user.endTradeDay).getTime() < new Date().getTime() && +data.objectives["profitTarget"]?.firstBalance <= +data.objectives["profitTarget"]?.balance && 
                          <div>
                          <Button onClick={()=>sendRequest("reset")} loading={buttons.reset} classes={classes.reset} style={{  backgroundColor: "#24303C", color:"#fff", borderRadius:"12px"}}>reset account</Button>
                        </div>}
                      </div>
                      <p style={{margin:0}}>Your statistics</p>
                      
                  </h2>
                
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
                          Minimum Equity
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
                        {/* <p className={classes.status}>
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
                        </p> */}
                        ...updating
                      </div>
                      <div>
                        {/* <p className={classes.status}>
                          <span>...updating</span>
                        </p> */}
                        {/* <p>{data.objectives["minimumTradeDaysObjective"]?.count}</p> */}
                        ...updating
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
              <h2 style={{ marginTop: "100px" }}>Leaderboard</h2>
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
