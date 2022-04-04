import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "antd/dist/antd.css";
import { ConfigProvider } from 'antd';
import App from './App';
import Home from './pages/Home';
import Toast from './comps/Toast';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Toast/>
      <ConfigProvider direction="rtl" >
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </ConfigProvider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
