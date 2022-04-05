import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import Login from "./pages/Login";
import "./assets/fonts/font.scss";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ConfigProvider direction="rtl">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" />
          <Route path="/users" />
        </Routes>
      </ConfigProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

/*
/login //trader admin
/dashoboard //trader
/users //admin
*/
