import React from "react";
import { Skeleton, Divider } from "antd";

const DataBox = ({ classes, user }) => {
  return (
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
              {user.startTradeDay ? user.startTradeDay.slice(0, 10) : "-"}
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
            <div>{user.endTradeDay ? user.endTradeDay.slice(0, 10) : "-"}</div>
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
            <div>Sarmayegozare Bartar</div>
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
  );
};

export default DataBox;
