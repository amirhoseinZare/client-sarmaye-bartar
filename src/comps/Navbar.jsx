import React from "react";
import classes from "./Navbar.module.scss";
import traderImg from "../assets/trader.jpg";
import logo from "../assets/logo.svg";
import { FaPowerOff } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { TOKEN_LOCAL_KEY } from "../core/variables.core";
import { IoMdNotifications } from "react-icons/io";
import { Badge } from "antd";

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const logout = () => {
    localStorage.removeItem(TOKEN_LOCAL_KEY);
    navigate("/login");
  };
  return (
    <div className={classes.nav}>
      <div className={classes.trader}>
        <img src={traderImg} alt="" />
        <h3>{user.display_name}</h3>
      </div>
      <div className={classes.logo}>
        <img src={logo} alt="" />
      </div>
      <div className={classes.iconBox}>
        <Badge count={5}>
          <IoMdNotifications className={classes.icon} offset={[10, 10]} />
        </Badge>
        <FaPowerOff onClick={logout} className={classes.icon} />
      </div>
    </div>
  );
};

export default Navbar;
