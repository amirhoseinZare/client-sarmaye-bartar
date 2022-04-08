import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Line } from "@ant-design/plots";
import { Divider } from "antd";
import classes from "./Dashboard.module.scss";
import Navbar from "../../comps/Navbar";

// api
import { AuthApi, DashboardApi } from "../../api";

// redux
import { useDispatch, useSelector } from "react-redux";
import { setAuth } from "../../redux/actions/auth";

const Dashboard = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const [userData, setUserData] = useState(null);

  const [data, setData] = useState([
    {
      _id: "624f6ebf2ee1642860c8eeb2",
      trades: 220,
      equity: 4374.78,
    },
    {
      _id: "624f6ebf2ee1642860c8eeb2",
      trades: 221,
      equity: 4574.78,
    },
    {
      _id: "624f6ebf2ee1642860c8eeb2",
      trades: 222,
      equity: 4774.78,
    },
    {
      _id: "624f6ebf2ee1642860c8eeb2",
      trades: 223,
      equity: 4200.78,
    },
    {
      _id: "624f6ebf2ee1642860c8eeb2",
      trades: 224,
      equity: 4554.78,
    },
    {
      _id: "624f6ebf2ee1642860c8eeb2",
      trades: 225,
      equity: 4100.78,
    },
    {
      _id: "624f6ebf2ee1642860c8eeb2",
      trades: 226,
      equity: 3600.78,
    },
    {
      _id: "624f6ebf2ee1642860c8eeb2",
      trades: 227,
      equity: 3400.78,
    },
    {
      _id: "624f6ebf2ee1642860c8eeb2",
      trades: 228,
      equity: 4074.78,
    },
    {
      _id: "624f6ebf2ee1642860c8eeb2",
      trades: 229,
      equity: 3100.78,
    },
    {
      _id: "624f6ebf2ee1642860c8eeb2",
      trades: 230,
      equity: 3600.78,
    },
  ]);

  useEffect(() => {
    console.log(user._id);
    if (!user._id && userData !== user) {
      AuthApi.validateToken().then((response) => {
        dispatch(setAuth(response.data?.result));
        setUserData(response.data?.result);
      });
    }

    if (user._id) {
      asyncFetch(user._id);
    }
  }, [user]);

  const asyncFetch = (userId) => {
    DashboardApi.chart(userId).then((response) => {
      setData(response.data?.result)
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
      title: {
        text: "Balance",
        style: {
          fontSize: 16,
        },
      },
    },
    // annotations: [
    //   {
    //     type: "regionFilter",
    //     start: ["min", "median"],
    //     end: ["max", "0"],
    //     color: "#F4664A",
    //   },
    //   {
    //     type: "text",
    //     position: ["min", "median"],
    //     offsetY: -4,
    //     style: {
    //       textBaseline: "bottom",
    //     },
    //   },
    //   {
    //     type: "line",
    //     start: ["min", "median"],
    //     end: ["max", "median"],
    //     style: {
    //       stroke: "#F4664A",
    //       lineDash: [2, 2],
    //     },
    //   },
    // ],
    smooth: true,
  };
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
