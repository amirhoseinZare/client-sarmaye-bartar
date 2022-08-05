import React from "react";
import { Skeleton, Divider } from "antd";
import { ReactComponent as LogoSvg  } from "../../../assets/logo.svg"

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

          {user.metaUsername ? <>
            <div className={classes.item}>
              <div>
                {user.metaUsername}
              </div>
              <div>MetaTrader Username</div>
            </div>
            <Divider
              style={{
                borderColor: "rgb(177 177 177 / 40%)",
                width: "50%",
                marginBottom: 15,
                marginTop: 15,
              }}
            />
          </> : null}

          <div className={classes.item}>
            <div>
              {user.startTradeDay ? user.startTradeDay.split(" ")[0] : "-"}
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
            <div>{user.endTradeDay ? user.endTradeDay.split(" ")[0] : "-"}</div>
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
      <div style={{width:"100%", display:"flex", justifyContent:"center"}}>
        <LogoSvg style={{width:"80%", fill:"#24303C"}}/>
      </div>
    </div>
  );
};

export default DataBox;
