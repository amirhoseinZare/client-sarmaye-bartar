import axios from "axios";
import store from "../redux/store";
import { startLoading, endLoading } from "../redux/actions/loading.action";
import { TOKEN_LOCAL_KEY } from "../core/variables.core";

class Service {
  constructor(entity) {
    this.instance = axios.create();
    this.entity = entity;
    this.baseApisUrl = `/api${this.entity}`;
    this.instance.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem(TOKEN_LOCAL_KEY);
        if (token) {
          config.headers["x-auth-token"] = token;
          config.headers['User-Agent'] = 'PostmanRuntime/7.29.0'
          config.headers['Connection'] = 'keep-alive'
          config.headers['Accept-Encoding'] = 'gzip, deflate, br'
          config.headers['Connection'] = 'keep-alive'

        }
        return config;
      },
      function (error) {
        return Promise.reject(error);
      }
    );

    this.instance.interceptors.response.use(
      (res) => {
        const { status } = res;
        if (status >= 400) {
          window.location.pathname = "/404";
        }
        return res.data;
      },
      (error) => {
        if(window.location.pathname!=="/404" && window.location.pathname!=="/login"){
          const status = error.response.status
          switch(status){
            case 401:
              window.location.pathname = "/login";      
            case 404:
            case 403:
              window.location.pathname = "/404";
          }  
        }
        return error?.response?.data
      }
    );

    // this.instance.defaults.timeout = 60000;
    // this.instance.defaults.baseURL = process.env.REACT_APP_SUB_API;
    this.instance.defaults.baseURL = "http://localhost:8000";
    // this.instance.defaults.baseURL = "https://panel.sarmayegozarebartar.com"
  }

  gets = (config) => {
    return this.instance.get(this.baseApisUrl, config);
  };

  get = (id, config) => {
    return this.instance.get(`${this.baseApisUrl}/${id}`, config);
  };

  post = (body, formdata = false) => {
    if (formdata) {
      body = this.formdata(body);
    }
    return this.instance.post(`${this.baseApisUrl}`, body);
  };

  patch = (id, body, formdata = false) => {
    if (formdata) {
      body = this.formdata(body);
    }
    return this.instance.patch(`${this.baseApisUrl}/${id}`, body);
  };

  delete = (id) => {
    return this.instance.delete(`${this.baseApisUrl}/${id}`);
  };

  formdata = (body) => {
    const fd = new FormData();
    Object.keys(body).forEach((k) => {
      if (body[k] instanceof FileList) {
        [...body[k]].forEach((v) => {
          let value = v;
          if (!(value instanceof File) && typeof value === "object")
            value = JSON.stringify(value);
          fd.append(k, value);
        });
      }
      if (body[k] instanceof File) {
        fd.append(k, body[k]);
      } else {
        let value = body[k];
        if (!(value instanceof File) && typeof value === "object") {
          value = JSON.stringify(value);
        }
        fd.append(k, value);
      }
    });
    return fd;
  };
}

export default Service;
