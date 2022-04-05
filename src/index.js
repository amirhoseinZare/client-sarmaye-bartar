import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "antd/dist/antd.css";
import { ConfigProvider } from 'antd';
import App from './App';
// import Home from './pages/Home';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <ConfigProvider direction="rtl" >
        <Routes>
          <Route path="/login" />
          <Route path="/dashboard" />
          <Route path="/users" />
        </Routes>
      </ConfigProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);

/*
/login //trader admin
/dashoboard //trader
/users //admin
*/