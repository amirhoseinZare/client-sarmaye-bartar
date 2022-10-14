import "./assets/fonts/font.scss";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import 'reactjs-bottom-navigation/dist/index.css'

import { ConfigProvider } from "antd";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";
import Modal from "./comps/Modal/index";
// import dotenv from 'dotenv'

// dotenv.config();
// console.log = ()=>{}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <ConfigProvider direction="ltr">
          <Modal />
          <App />
        </ConfigProvider>
      </React.StrictMode>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

/*
/login //trader admin
/dashoboard //trader
/users //admin
*/
