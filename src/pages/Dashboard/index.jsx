// packages
import React, { useState, useEffect, useMemo } from 'react';
import {
  Row,
  Col,
  message,
  Skeleton,
  Divider,
  Statistic,
  Button,
  Tooltip as AntdTooltip,
  Radio 
} from 'antd';

// css
import classes from './Dashboard.module.scss';

// comps
import Ranking from '../../comps/Ranking/Ranking';

// api
import { UsersApi } from '../../api/Users.api';
import { RequestApi } from '../../api/Request.api';

// redux
import { useSelector } from 'react-redux';

// icon
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';
import { IoMdCloseCircle } from 'react-icons/io';

// variables
import { USER_ID_KEY, STAT_KEY } from '../../core/variables.core';
import DataBox from './comps/DataBox.component';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import { AiOutlineExclamationCircle } from 'react-icons/ai';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const { Countdown } = Statistic;
const todayBrokerEndTime = new Date();
todayBrokerEndTime.setUTCHours(21);
todayBrokerEndTime.setUTCMinutes(0);
todayBrokerEndTime.setUTCSeconds(0);
todayBrokerEndTime.setUTCMilliseconds(0);
const tomorrowBrokerTime = todayBrokerEndTime.getTime() + 86400 * 1000;

const deadline =
  new Date().getTime() < todayBrokerEndTime
    ? todayBrokerEndTime
    : tomorrowBrokerTime;

const Dashboard = () => {
  const userData = useSelector((store) => store.user);
  const analyzeUser = useSelector((store) => store.analyze);
  const [user, setUser] = useState({});
  useEffect(() => {
    if (userData.role === 'admin') {
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
    chart: [],
    objectives: [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user._id) {
      if (userData.role === 'admin') {
        asyncFetch({ userId: user._id, mtAccountId: user.mtAccountId });
        return;
      }
      const currentAccount = user.accounts[user.accounts.length - 1];
      asyncFetch({
        userId: analyzeUser._id,
        mtAccountId: analyzeUser.mtAccountId,
      });
    }
  }, [user]);

  const asyncFetch = ({ userId, mtAccountId }) => {
    UsersApi.getChart(mtAccountId).then((response) => {
      setLoading(true);
      if (!response.success) {
        message.error(response.message);
        return;
      }
      const { chart, objective } = response.result;
      setData({
        chart,
        objectives: objective,
      });
      setLoading(false);
      localStorage.setItem(
        STAT_KEY,
        btoa(
          JSON.stringify({
            chart,
            objective,
          })
        )
      );
    });
  };

  const filterChart = (data, time) =>{
    if (data.chart) {
      let { chart } = {...data}
      const today = new Date().getDate();
      if(time==='today'){
        chart = chart.filter((item) =>{
          const [date, time ] = item.startBrokerTime.split(" ")
          const [year, month, day] = date.split("-")
          return (+day) === (+today)
        })
      }
      else if(time==='last-24'){
        chart = chart.slice(chart.length-24,chart.length)
      }
      else if(time==='last-48'){
        chart = chart.slice(chart.length-48,chart.length)
      }
      else if(time==='last-week'){
        chart = chart.slice(chart.length-168,chart.length)
      }
      return chart
    }
    return []
  }

  const setLabels = (data, timeFilter) => {
    if (data.chart) {
      let { chart } = {...data}
      const today = new Date().getDate();
      if(timeFilter==='today'){
        
        chart = chart.filter((item) =>{
          const [date, time ] = item.startBrokerTime.split(" ")
          const [year, month, day] = date.split("-")
          return (+day) === (+today)
        })
      }
      else if(timeFilter==='last-24'){
        chart = chart.slice(chart.length-24,chart.length)
      }
      else if(timeFilter==='last-48'){
        chart = chart.slice(chart.length-48,chart.length)
      }
      else if(timeFilter==='last-week'){
        chart = chart.slice(chart.length-168,chart.length)
      }
      return chart.map(item=>{
        const [date, time ] = item.startBrokerTime.split(" ")
        const [hour, minutes, seconds] = time.split(":")
        const [year, month, day] = date.split("-")
        const pointTime = `${hour}:${minutes}`
        return (+hour) === 0 || ((timeFilter==='last-week' || timeFilter==='all'))? `${month}/${day} ${pointTime}` : `${pointTime}`
      })
    }
    return [];
  };

  const [value, setValue] = useState('today');

  const onChange = ({ target: { value } }) => {
    setValue(value);
  };
  const optionsWithDisabled = useMemo(()=>[
    { label: 'Today', value: 'today' },
    { label: 'Last 24 hours', value: 'last-24' },
    { label: 'Last 48 hours', value: 'last-48' },
    { label: 'Last week', value: 'last-week' },
    { label: 'All', value: 'all' },
  ], [])

  const highOptions = useMemo(() => ({
    chart: {
      type: 'areaspline',
      backgroundColor:
        Highcharts.defaultOptions.legend.backgroundColor || 'rgb(11, 14, 19)',
      width: 1300,
    },
    title: {
      text: '',
    },
    subtitle: {
      // text: '* Jane\'s banana consumption is unknown',
      align: 'right',
      verticalAlign: 'bottom',
    },
    legend: {
      layout: 'vertical',
      align: 'left',
      verticalAlign: 'top',
      height:20,
      x: 1000,
      y: -10,
      floating: true,
      borderWidth: 1,
      style: {
        color: '#fff',
      },
      backgroundColor: 'rgb(16, 20, 27)',
      borderColor: '#fff',
      itemStyle: {
        color: '#fff',
      },
      outside:true,
      // floating:true
    },
    xAxis: {
      categories: setLabels(data, value),
      labels: {
        style: {
          color: '#fff',
          fontSize: value==='last-week' || value==='all' ? '8px' : '12px'
        },
      },
    },
    yAxis: {
      title: {
        text: '',
      },
      labels: {
        style: {
          color: '#fff',
        },
      },
      gridLineColor: 'gray',
      gridLineDashStyle: 'shortdash',
      min:Math.min(...[
        ...filterChart(data, value).map((item) => {
          return item.minEquity;
        }), 
        ...filterChart(data, value).map((item) => {
          return item.minBalance;
        })
      ]),
      max:Math.max(...[
        ...filterChart(data, value).map((item) => {
          return item.minEquity;
        }), 
        ...filterChart(data, value).map((item) => {
          return item.minBalance;
        })
      ]) + 1000
    },
    plotOptions: {
      area: {
        fillOpacity: 0.5,
      },
      series: {
        marker: {
          enabled: false,
        },
      },
    },
    credits: {
      enabled: false,
    },
    series: [
     
      
      {
        visible: false,
        name: 'Minimum Balance',
        data: data.chart
          ? filterChart(data, value).map((item) => {
              // if(item.addedBySb)
              //   return null
              return item.minBalance;
            })
          : [],
        fillColor: {
         
          stops: [
            [0, Highcharts.getOptions().colors[5]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[5])
                .setOpacity(0)
                .get('rgba'),
            ],
          ],
        },
      },
      {
        visible: false,
        name: 'Last Balance',
        data: data.chart
          ? filterChart(data, value).map((item) => {
              if (item.lastBalance) return item.lastBalance;
              return null;
            })
          : [],
        fillColor: {
         
          stops: [
            [0, Highcharts.getOptions().colors[5]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[5])
                .setOpacity(0)
                .get('rgba'),
            ],
          ],
        },
      },
      {
        visible: false,
        name: 'Last Equity',
        data: data.chart
          ? filterChart(data, value).map((item) => {
              if (item.lastEquity) return item.lastEquity;
              return null;
            })
          : [],
        fillColor: {
          stops: [
            [0, Highcharts.getOptions().colors[4]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[4])
                .setOpacity(0)
                .get('rgba'),
            ],
          ],
        },
      },
      {

        name: 'Maximum Balance',
        data: data.chart
          ? filterChart(data, value).map((item) => {
              // if(item.addedBySb)
              //   return null
              return item.maxBalance;
            })
          : [],
        fillColor: {
         
          stops: [
            [0, Highcharts.getOptions().colors[3]],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[3])
                .setOpacity(0)
                .get('rgba'),
            ],
          ],
        },
      },
      {
        name: 'Minimum Equity',
        data: data.chart
          ? filterChart(data, value).map((item) => {
              return item.minEquity;
            })
          : [],
        fillColor: {
        
          stops: [
            [
              0,
              'linear-gradient(178.62deg, #44B3FE -1495.74%, rgba(68, 179, 254, 0) 102.34%)',
            ],
            [
              1,
              Highcharts.color(Highcharts.getOptions().colors[1])
                .setOpacity(0.9)
                .get('rgba'),
            ],
          ],
        },
      },
    ],
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: { enabled: false },
          },
        },
      ],
    },
    tooltip:{
      outside:true
    }
  }));

  const [buttons, setButtons] = useState({
    extend: false,
    reset: false,
    nextPhase: false,
  });

  const sendRequest = async (type) => {
    setButtons((s) => ({ ...s, [type]: true }));
    const call = await RequestApi.post({
      type,
      userId: user._id,
    });
    setButtons((s) => ({ ...s, [type]: false }));
    if (!call.success) {
      message.error(call.message);
      return;
    }
    message.success(call.message);
  };

  return (
    <>
      {user.isAuth ? (
        <div className={classes.root}>
          {/* <UserMenu /> */}
          <Row className={classes.row}>
            <Col
              style={{
                overflowX: 'auto',
                '-ms-overflow-style': 'none' /* Internet Explorer 10+ */,
                'scrollbar-width': 'none',
                '& ::-webkit-scrollbar': {
                  display: 'none',
                },
              }}
              className={classes.col}
              xs={23}
              sm={23}
              md={22}
              lg={22}
            >
              {loading ? (
                <Skeleton title={false} active paragraph={{ rows: 15 }} />
              ) : (
                <Col className={classes.radioContainer}>
                  <Radio.Group
                      options={optionsWithDisabled}
                      onChange={onChange}
                      value={value}
                      optionType="button"
                      buttonStyle="solid"
                      className={classes.antRadio}
                  />
                  <HighchartsReact
                    style={{overflow: 'scroll'}}
                    highcharts={Highcharts}
                    options={highOptions}
                  />
                </Col>
              )}
            </Col>
            <Col className={classes.col} xs={23} sm={23} md={8} lg={8}>
              <DataBox classes={classes} user={analyzeUser} />
            </Col>
            <Col className={classes.col} xs={23} sm={23} md={14} lg={14}>
              <div className={classes.container3}>
                <h2
                  className={classes.title}
                  style={{
                    textAlign: 'left',
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <div>
                    {!user.infinitive &&
                      data.objectives['minimumTradeDaysObjective']?.passed &&
                      data.objectives['maxDailyLoss']?.passed &&
                      data.objectives['maxLoss']?.passed &&
                      new Date(user.endTradeDay).getTime() <
                        new Date().getTime() &&
                      +data.objectives['profitTarget']?.firstBalance <=
                        +data.objectives['profitTarget']?.balance && (
                        <div>
                          <Button
                            onClick={() => sendRequest('extend')}
                            loading={buttons.extend}
                            classes={classes.extend}
                            style={{
                              backgroundColor: '#24303C',
                              color: '#fff',
                              borderRadius: '12px',
                            }}
                          >
                            extend 10 days
                          </Button>
                        </div>
                      )}
                    {!user.infinitive &&
                      data.objectives['minimumTradeDaysObjective']?.passed &&
                      data.objectives['maxDailyLoss']?.passed &&
                      data.objectives['profitTarget']?.passed &&
                      data.objectives['maxLoss']?.passed && (
                        <div>
                          <Button
                            onClick={() => sendRequest('nextPhase')}
                            loading={buttons.nextPhase}
                            classes={classes.nextPhase}
                            style={{
                              backgroundColor: '#24303C',
                              color: '#fff',
                              borderRadius: '12px',
                            }}
                          >
                            next phase
                          </Button>
                        </div>
                      )}
                    {!user.infinitive &&
                      data.objectives['minimumTradeDaysObjective']?.passed &&
                      data.objectives['maxDailyLoss']?.passed &&
                      data.objectives['maxLoss']?.passed &&
                      new Date(user.endTradeDay).getTime() <
                        new Date().getTime() &&
                      +data.objectives['profitTarget']?.firstBalance <=
                        +data.objectives['profitTarget']?.balance && (
                        <div>
                          <Button
                            onClick={() => sendRequest('reset')}
                            loading={buttons.reset}
                            classes={classes.reset}
                            style={{
                              backgroundColor: '#24303C',
                              color: '#fff',
                              borderRadius: '12px',
                            }}
                          >
                            reset account
                          </Button>
                        </div>
                      )}
                  </div>
                  <p style={{ margin: 0 }}>Your statistics</p>
                </h2>

                <Divider
                  style={{
                    borderColor: 'rgb(177 177 177 / 40%)',
                    width: '50%',
                    marginBottom: 30,
                    marginTop: 0,
                  }}
                />
                {loading ? (
                  <Skeleton title={false} active paragraph={{ rows: 8 }} />
                ) : (
                  <>
                    <div className={classes.body}>
                      <div className={classes.results}></div>
                      <div>
                        {/* <p>{data.objectives["maxDailyLoss"]?.equity}</p> */}
                        <p>
                          $ {+data.objectives['profitTarget']?.firstBalance}
                        </p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          First balance
                          {/* ( {+data.objectives["maxDailyLoss"]?.limit}$) */}
                        </p>
                      </div>
                    </div>
                    <div style={{ width: '97%', margin: '0 auto' }}>
                      <Divider
                        style={{
                          borderColor: 'rgb(177 177 177 / 40%)',
                          width: '50%',
                          marginBottom: 0,
                          marginTop: 0,
                        }}
                      />
                    </div>
                    <div className={classes.body}>
                      <div className={classes.results}></div>
                      <div>
                        {/* <p>{data.objectives["maxDailyLoss"]?.equity}</p> */}
                        <p>$ {+data.objectives['profitTarget']?.balance}</p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          <AntdTooltip
                            placement="bottomLeft"
                            title={'Maximum Balance per hour'}
                          >
                            <span style={{ cursor: 'pointer' }}>
                              Balance
                              <AiOutlineExclamationCircle fontSize={14} />
                            </span>
                          </AntdTooltip>
                          {/* ( {+data.objectives["maxDailyLoss"]?.limit}$) */}
                        </p>
                      </div>
                    </div>
                    <div style={{ width: '97%', margin: '0 auto' }}>
                      <Divider
                        style={{
                          borderColor: 'rgb(177 177 177 / 40%)',
                          width: '50%',
                          marginBottom: 0,
                          marginTop: 0,
                        }}
                      />
                    </div>

                    <div
                      className={classes.body}
                      style={{ width: '100%', fontWeight: 'bolder' }}
                    >
                      <div
                        className={classes.results}
                        style={{ fontWeight: 'bolder' }}
                      ></div>
                      <div>
                        <p style={{ fontWeight: 'bolder' }}>
                          $ {data.objectives['maxLoss']?.equity}
                        </p>
                      </div>
                      <div className={classes.text}>
                        <p style={{ fontWeight: 'bolder' }}>
                          <AntdTooltip
                            placement="bottomLeft"
                            title={'Minimum Equity per hour'}
                          >
                            <span style={{ cursor: 'pointer' }}>
                              Minimum Equity
                              <AiOutlineExclamationCircle fontSize={14} />
                            </span>
                          </AntdTooltip>
                        </p>
                      </div>
                    </div>

                    <div style={{ width: '97%', margin: '0 auto' }}>
                      <Divider
                        style={{
                          borderColor: 'rgb(177 177 177 / 40%)',
                          width: '50%',
                          marginBottom: 0,
                          marginTop: 0,
                        }}
                      />
                    </div>

                    <div className={classes.body}>
                      <div className={classes.results}></div>
                      <div>
                        {/* <p>{data.objectives["maxDailyLoss"]?.equity}</p> */}
                        <p>
                          ${' '}
                          {+data.objectives['maxDailyLoss']?.dayBalance === null
                            ? 'updating...'
                            : +data.objectives['maxDailyLoss']?.dayBalance}
                        </p>
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

            <Col className={classes.col} xs={23} sm={23} md={23} lg={23}>
              <div className={classes.container3}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    flexDirection: 'row-reverse',
                  }}
                  className={classes.myStatis}
                >
                  <h2 className={classes.title} style={{ textAlign: 'left' }}>
                    Objectives{' '}
                  </h2>{' '}
                  <Countdown
                    valueStyle={{ color: 'rgba(245, 245, 245, 1)' }}
                    value={deadline}
                  />
                </div>
                <Divider
                  style={{
                    borderColor: 'rgb(177 177 177 / 40%)',
                    width: '50%',
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
                          {data.objectives['minimumTradeDaysObjective']?.passed
                            ? 'passed'
                            : 'failed'}
                          <span>
                            {data.objectives['minimumTradeDaysObjective']
                              ?.passed ? (
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
                        <p>
                          {data.objectives['minimumTradeDaysObjective']?.count}
                        </p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Minimum {user.infinitive ? '-' : '5 Trading days'}
                        </p>
                      </div>
                    </div>
                    <div style={{ width: '97%', margin: '0 auto' }}>
                      <Divider
                        style={{
                          borderColor: 'rgb(177 177 177 / 40%)',
                          width: '50%',
                          marginBottom: 0,
                          marginTop: 0,
                        }}
                      />
                    </div>
                    <div className={classes.body}>
                      <div className={classes.results}>
                        <p className={classes.status}>
                          {data.objectives['maxDailyLoss']?.passed === null
                            ? '...updating'
                            : data.objectives['maxDailyLoss']?.passed
                            ? 'passed'
                            : 'failed'}
                          <span>
                            {data.objectives['maxDailyLoss']?.passed ===
                            null ? (
                              ''
                            ) : data.objectives['maxDailyLoss']?.passed ? (
                              <BsFillCheckCircleFill className={classes.icon} />
                            ) : (
                              <AiFillCloseCircle className={classes.iconRed} />
                            )}
                          </span>
                        </p>
                      </div>
                      <div>
                        {/* <p>{data.objectives["maxDailyLoss"]?.equity}</p> */}
                        <p>
                          {data.objectives['maxDailyLoss']?.passed === null
                            ? '...updating'
                            : `$ ${+data.objectives['maxDailyLoss']?.limit}`}
                        </p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Max Daily loss 5%
                          {/* ( {+data.objectives["maxDailyLoss"]?.limit}$) */}
                        </p>
                      </div>
                    </div>
                    <div style={{ width: '97%', margin: '0 auto' }}>
                      <Divider
                        style={{
                          borderColor: 'rgb(177 177 177 / 40%)',
                          width: '50%',
                          marginBottom: 0,
                          marginTop: 0,
                        }}
                      />
                    </div>
                    <div className={classes.body}>
                      <div className={classes.results}>
                        <p className={classes.status}>
                          {data.objectives['maxLoss']?.passed
                            ? 'passed'
                            : 'failed'}
                          <span>
                            {data.objectives['maxLoss']?.passed ? (
                              <BsFillCheckCircleFill className={classes.icon} />
                            ) : (
                              <AiFillCloseCircle className={classes.iconRed} />
                            )}
                          </span>
                        </p>
                      </div>
                      <div>
                        {/* <p>{data.objectives["maxLoss"]?.equity}</p> */}
                        <p>$ {+data.objectives['maxLoss']?.limit}</p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Max Loss{' '}
                          {+data.objectives['maxLoss']?.allowableMaxLossLimit}%
                          {/* ( {+data.objectives["maxLoss"]?.limit} $) */}
                        </p>
                      </div>
                    </div>
                    <div style={{ width: '97%', margin: '0 auto' }}>
                      <Divider
                        style={{
                          borderColor: 'rgb(177 177 177 / 40%)',
                          width: '50%',
                          marginBottom: 0,
                          marginTop: 0,
                        }}
                      />
                    </div>
                    <div className={classes.body}>
                      <div className={classes.results}>
                        <p className={classes.status}>
                          {user.infinitive ? (
                            '-'
                          ) : (
                            <>
                              {' '}
                              {data.objectives['profitTarget']?.passed
                                ? 'passed'
                                : 'failed'}
                              <span>
                                {data.objectives['profitTarget']?.passed ? (
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
                            '-'
                          ) : (
                            <>$ {data.objectives['profitTarget']?.balance}</>
                          )}
                        </p>
                      </div>
                      <div className={classes.text}>
                        <p>
                          Profit Target{' '}
                          {data.objectives['profitTarget']?.percentDays}
                          {data.objectives['profitTarget']?.percentDays && '%'}
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
