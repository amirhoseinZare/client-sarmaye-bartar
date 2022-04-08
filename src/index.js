import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css";
import { ConfigProvider } from "antd";
import "./assets/fonts/font.scss";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <ConfigProvider direction="rtl">
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
