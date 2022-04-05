import classes from "./style.module.scss";
import bitcoin from "../../assets/bitcoin2.png";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Form, Input, Button, Checkbox } from "antd";
import "./customAntd.scss";

const Login = () => {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
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
                  label="ایمیل"
                  name="username"
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
            <img src={bitcoin} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
