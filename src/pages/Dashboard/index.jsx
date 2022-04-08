import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Line } from "@ant-design/plots";
import { Divider } from "antd";
import classes from "./Dashboard.module.scss";
import Navbar from "../../comps/Navbar";

// api
import { DashboardApi } from "../../api";

// redux
import { useSelector } from "react-redux";

import { BsFillCheckCircleFill } from "react-icons/bs";

const Dashboard = () => {
  const user = useSelector((store) => store.user);

  const [data, setData] = useState([]);
  const [objectives, setObjectives] = useState([]);

  useEffect(() => {
    if (user._id) {
      asyncFetch(user._id);
    }
  }, [user]);

  const asyncFetch = (userId) => {
    DashboardApi.chart(userId).then((response) => {
      setData(response.data?.result);
    });

    DashboardApi.objectives(userId).then((response) => {
      setObjectives(response.data?.result);
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

  console.log(objectives);

  return (
    <>
      <div className={classes.root}>
        <Navbar />
        <Row className={classes.row}>
          <Col className={classes.col} xs={23} sm={23} md={12} lg={15}>
            <div className={classes.container}>
              <h2>نتیجه فعلی</h2>
              <Divider
                style={{
                  borderColor: "rgb(177 177 177 / 40%)",
                  width: "50%",
                  marginBottom: 30,
                  marginTop: 20,
                }}
              />
              <Line {...config} />
            </div>
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
              <div className={classes.body}>
                <div className={classes.results}>
                  <p className={classes.status}>
                    passed
                    <span>
                      <BsFillCheckCircleFill className={classes.icon} />
                    </span>
                  </p>
                </div>
                <div>
                  <p>10</p>
                </div>
                <div className={classes.text}>
                  <p>Minimum 5 Tradings day</p>
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
                    passed
                    <span>
                      <BsFillCheckCircleFill className={classes.icon} />
                    </span>
                  </p>
                </div>
                <div>
                  <p>10</p>
                </div>
                <div className={classes.text}>
                  <p>Max Daily loss -$5,000</p>
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
                    passed
                    <span>
                      <BsFillCheckCircleFill className={classes.icon} />
                    </span>
                  </p>
                </div>
                <div>
                  <p>10</p>
                </div>
                <div className={classes.text}>
                  <p>Max Loss -$10,000</p>
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
                    passed
                    <span>
                      <BsFillCheckCircleFill className={classes.icon} />
                    </span>
                  </p>
                </div>
                <div>
                  <p>10</p>
                </div>
                <div className={classes.text}>
                  <p>Profit Target $10,000</p>
                </div>
              </div>
            </div>
          </Col>
          <Col className={classes.col} xs={20} sm={20} md={8} lg={5}>
            <div className={classes.container2}>
              <h2>چالش 20900121239</h2>
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
                    <div>شروع</div>
                    <div>1400/12/12</div>
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
                    <div>شروع</div>
                    <div>1400/12/12</div>
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
                    <div>شروع</div>
                    <div>1400/12/12</div>
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
                    <div>شروع</div>
                    <div>1400/12/12</div>
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
                    <div>شروع</div>
                    <div>1400/12/12</div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Dashboard;
