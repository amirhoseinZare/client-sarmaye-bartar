import { useEffect, useState } from "react";
import logo from "../../assets/logo.svg";
import { Form, Input, Button, message } from "antd";
import { AuthApi } from "../../api/index";
import { TOKEN_LOCAL_KEY } from "../../core/variables.core";
import classes from "./style.module.scss";
import "./customAntd.scss";
import { setAuth } from "../../redux/actions/auth";
import { setAnalyze } from "../../redux/actions/analyze";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";


const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const p2e = (s) => s?.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

  const success = (text) => {
    message.success(text);
  };

  const error = (text) => {
    message.error(text);
  };

  const warning = (text) => {
    message.warning(text);
  };

  // set error and delete after 3 second
  useEffect(() => {
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    }
  }, [errorMessage]);

  const dispatch = useDispatch();

  // login Function
  const onFinish = async (values) => {
    // try {
    setLoading(true);

    const res = await AuthApi.login({
      user_email: p2e(values?.email),
      user_pass: p2e(values?.password),
    });

    setLoading(false);

    if (res.success) {
      dispatch(setAuth(res.result));
      const { result } = res;
      const { accounts=[], ...userData } = result
      dispatch(setAnalyze(result.accounts && Array.isArray(result.accounts) && result.accounts.length>0 ? result.accounts[result.accounts.length-1]:userData ));

      localStorage.setItem(TOKEN_LOCAL_KEY, res.token);
      success("ورود با موفقیت انجام شد.");

      if (res.result?.role === "admin") {
        navigate("/users");
      } else {
        navigate("/dashboard");
      }
    } else {
      error(res.message);
    }
  };

  const emailRegex = new RegExp(/^\S+@\S+\.\S+$/);

  return (
    <div className="antdLoginCustom">
      <div className={classes.root}>
        <div className={classes["content-box"]}>
          <div className={classes["login-box"]}>
            <div className={classes.titlesContainer}>
              <p className={classes.start}>Start analyze</p>
              <h2 className={classes.title}>Login dashboard</h2>
            </div>
            <Form
              name="login"
              initialValues={{ remember: false }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <div className="inputsLogin">
                <Form.Item
                  fieldKey="email"
                  placeholder="email"
                  label="email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "This field is required!",
                    },
                    {
                      pattern: emailRegex,
                      message: "Please enter a valid email address!",
                    },
                  ]}
                >
                  <div className={classes.inputs}>
                    <Input />
                  </div>
                </Form.Item>

                <Form.Item
                  fieldKey="password"
                  placeholder="password"
                  label="password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "This field is required!",
                    },
                    { min: 8, message: "Password must be at least 8 characters." },
                  ]}
                >
                  <div className={classes.inputs}>
                    <Input.Password />
                  </div>
                </Form.Item>
              </div>

              <div className="actionsLogin">
                <Form.Item>
                  <Button type="custom" htmlType="submit" loading={loading}>
                    Login
                  </Button>
                </Form.Item>
              </div>
            </Form>
            <div className={classes.error}>
              {errorMessage ? (
                <div>
                  <span>{errorMessage}</span>
                </div>
              ) : null}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
