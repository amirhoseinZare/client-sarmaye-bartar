import { useEffect, useState } from "react";

// logo
import logo from "../../assets/logo.svg";

// antd
import { Form, Input, Button } from "antd";

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
    if (validateEmail(values?.email)) {
      try {
        const res = await AuthApi.login({
          user_email: values?.email,
          user_pass: values?.password,
        });

        const token = res.headers["x-auth-token"];

        dispatch(setAuth(res.data?.result));
        localStorage.setItem(TOKEN_LOCAL_KEY, res.data?.token);
        if (res.data.result?.role === "admin") {
          navigate("/users");
        } else {
          navigate("/dashboard");
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.message);
      }
    } else {
      setErrorMessage("فرمت ایمیل وارد شده صحیح نمیباشد.");
    }
  };

  const onFinishFailed = (errorInfo) => {
    setErrorMessage("اطلاعات وارد شده صحیح نمیباشد.");
  };

  // email validation function
  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const emailRegex = new RegExp(/^\S+@\S+\.\S+$/)

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
              onFinishFailed={onFinishFailed}
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
                      pattern:emailRegex,
                      message:"لطفا یک ایمیل صحیح وارد کنید!",
                    }
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
                  <Button type="custom" htmlType="submit">
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
