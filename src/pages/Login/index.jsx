import { useEffect, useState } from "react";

// logo
import logo from "../../assets/logo.svg";

// antd
import { Form, Input, Button, message } from "antd";

// api
import { AuthApi } from "../../api/index";

// variables
import { TOKEN_LOCAL_KEY } from "../../core/variables.core";

// scss
import classes from "./style.module.scss";
import "./customAntd.scss";

// redux
import { setAuth } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

const Login = () => {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState(null);
  const [ loading, setLoading ] = useState(false)
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
    try {
      const res = await AuthApi.login({
        user_email: p2e(values?.email),
        user_pass: p2e(values?.password),
      });

      const token = res.headers["x-auth-token"];

      dispatch(setAuth(res.data?.result));
      localStorage.setItem(TOKEN_LOCAL_KEY, res.data?.token);
      if (res.data.result?.role === "admin") {
        success("ورود با موفقیت انجام شد.");
        navigate("/users");
      } else {
        success("ورود با موفقیت انجام شد.");
        navigate("/dashboard");
      }
    } catch (error) {
      success(error.response?.data?.message);
      // setErrorMessage(error.response?.data?.message);
    }
  };

  const emailRegex = new RegExp(/^\S+@\S+\.\S+$/);

  return (
    <div className="antdLoginCustom">
      <div className={classes.root}>
        <div className={classes["content-box"]}>
          <div className={classes["login-box"]}>
            <h2 className={classes.title}>ورود به داشبورد</h2>
            <Form
              name="login"
              initialValues={{ remember: false }}
              onFinish={onFinish}
              autoComplete="off"
            >
              <div className="inputsLogin">
                <Form.Item
                  fieldKey="email"
                  label="ایمیل"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "لطفا ایمیل خود را وارد کنید!",
                    },
                    {
                      pattern: emailRegex,
                      message: "لطفا یک ایمیل صحیح وارد کنید!",
                    },
                  ]}
                >
                  <div className={classes.inputs}>
                    <Input />
                  </div>
                </Form.Item>

                <Form.Item
                  fieldKey="password"
                  label="رمز عبور"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "لطفا رمز عبور خود را وارد کنید!",
                    },
                    { min: 8, message: "رمز عبور حداقل باید ۸ کاراکتر باشد!" },
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
                    ورود
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
          <div className={classes["icon-box"]}>
            <img src={logo} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
