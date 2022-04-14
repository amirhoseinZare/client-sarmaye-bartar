import React from "react";
import classes from "./Navbar.module.scss";
import "./customAntd.scss";
import traderImg from "../../assets/trader.jpg";
import logo from "../../assets/logo.svg";
import { FaPowerOff } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { TOKEN_LOCAL_KEY } from "../../core/variables.core";
import { IoMdNotifications } from "react-icons/io";

// antd
import { Badge, Menu, Dropdown } from "antd";

const Navbar = () => {
	const navigate = useNavigate();
	const user = useSelector((store) => store.user);
	const logout = () => {
		localStorage.removeItem(TOKEN_LOCAL_KEY);
		navigate("/login");
	};

	let alert = useSelector((state) => state.alert);

	const menu = (
		<Menu>
			{alert.map((item) => {
				return (
					<Menu.Item key={item.id}>
						<h3>{item.title}</h3>
						<p>{item.message}</p>
					</Menu.Item>
				);
			})}
		</Menu>
	);

	return (
		<div className={classes.nav}>
			<div className={classes.trader}>
				<img src={traderImg} alt='' />
				<h3>{user.display_name}</h3>
			</div>
			<div className={classes.logo}>
				<img src={logo} alt='' />
			</div>
			<div className={classes.iconBox}>
				{alert.length === 0 ? (
					<Badge
						count={alert.length}
						offset={[38, 25]}
						size='small'
						showZero={false}>
						<IoMdNotifications className={classes.icon} />
					</Badge>
				) : (
					<Dropdown overlay={menu} placement='bottomRight' trigger={["click"]}>
						<Badge
							count={alert.length}
							offset={[38, 25]}
							size='small'
							showZero={false}>
							<IoMdNotifications className={classes.icon} />
						</Badge>
					</Dropdown>
				)}

				<FaPowerOff onClick={logout} className={classes.icon} />
			</div>
		</div>
	);
};

export default Navbar;
