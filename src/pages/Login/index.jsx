import { useState } from "react";
import classes from "./style.module.scss";
import logo from "../../assets/logo.svg";
import { Form, Input, Button } from "antd";
import "./customAntd.scss";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null)

  const onFinish = (values) => {
    if(validateEmail(values?.email)){
      
    }else{

    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validateEmail = (email) => {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

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
