import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import { Line } from "@ant-design/plots";
import classes from "./Dashboard.module.scss";
import { Divider } from "antd";
const Dashboard = () => {
	const [data, setData] = useState([]);

	useEffect(() => {
		asyncFetch();
	}, []);

	const asyncFetch = () => {
		fetch(
			"https://gw.alipayobjects.com/os/bmw-prod/1d565782-dde4-4bb6-8946-ea6a38ccf184.json"
		)
			.then((response) => response.json())
			.then((json) => setData(json))
			.catch((error) => {
				console.log("fetch data failed", error);
			});
	};
	const config = {
		data,
		padding: "auto",
		xField: "Date",
		yField: "scales",
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
		annotations: [
			// 低于中位数颜色变化
			{
				type: "regionFilter",
				start: ["min", "median"],
				end: ["max", "0"],
				color: "#F4664A",
			},
			{
				type: "text",
				position: ["min", "median"],
				// content: "中位数",
				offsetY: -4,
				style: {
					textBaseline: "bottom",
				},
			},
			{
				type: "line",
				start: ["min", "median"],
				end: ["max", "median"],
				style: {
					stroke: "#F4664A",
					lineDash: [2, 2],
				},
			},
		],
		smooth: true,
	};
	return (
		<div className={classes.root}>
			<Row className={classes.row}>
				<Col className={classes.col} xs={20} sm={20} md={12} lg={15}>
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
				<Col className={classes.col} xs={20} sm={20} md={8} lg={6}>
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
	);
};

export default Dashboard;
