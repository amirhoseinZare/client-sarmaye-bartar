import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "antd/dist/antd.css";
import { ConfigProvider } from 'antd';
import { Provider } from 'react-redux';
import store from "./redux/store"
import App from './App';
import Home from './pages/Home';
import Toast from './comps/Toast';

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
    <Provider store={store}>
      <Toast/>
      <ConfigProvider direction="rtl" >
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/*" element={<Home />} />
        </Routes>
      </ConfigProvider>
    </Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
