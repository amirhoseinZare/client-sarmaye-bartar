import React from "react";
import { Line } from "@ant-design/plots";
import { Skeleton, Divider } from "antd";

const CurrentResults = ({ config, loading, classes }) => {
  return (
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
  );
};

export default CurrentResults;
