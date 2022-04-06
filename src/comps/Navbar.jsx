import React from "react";
import classes from "./Navbar.module.scss";
import traderImg from "../assets/trader.jpg";
import logo from "../assets/logo.svg";
import { FaPowerOff } from "react-icons/fa";
const Navbar = () => {
  return (
    <div className={classes.nav}>
      <div className={classes.trader}>
        <img src={traderImg} alt="" />
        <h3>علی بلوری</h3>
      </div>
      <div className={classes.logo}>
        <img src={logo} alt="" />
      </div>
      {/* <button className={classes.button}>خروج</button> */}
      <FaPowerOff className={classes.icon} />
    </div>
  );
};

export default Navbar;
