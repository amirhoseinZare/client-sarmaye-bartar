import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Form, Input, Button, Col, Select, Modal } from "antd";

const { Option } = Select;

const FormStyled = styled(Form)`
  display: flex;
  flex-wrap: wrap;
  .form-input {
    padding: 8px;
    height: 105px;
    input {
      max-width: 305px;
      height: 38px;
      border-radius: 8px;
      box-shadow: 0px 2px 3px rgba(207, 207, 217, 0.32);
      font-size: 12px;
      line-height: 18px;
      ${"" /* color: #8286A2; */}
    }
    div.ant-select {
      .ant-select-selector {
        border-radius: 8px;
        height: 46px;
        height: 38px;
      }
      max-width: 305px;
      border-radius: 8px;
      box-shadow: 0px 2px 3px rgba(207, 207, 217, 0.32);
      font-size: 12px;
      line-height: 18px;
      ${"" /* color: #8286A2; */}
    }
    textarea {
      box-shadow: 0px 2px 3px rgba(207, 207, 217, 0.32);
      font-size: 12px;
      line-height: 18px;
      border-radius: 8px;
      ${"" /* color: #8286A2; */}
    }
    label {
      color: rgba(0, 0, 0, 1);
      font-size: 12px;
      height: 16px;
    }
  }
  .button-container {
    align-items: center;
    display: flex;
    padding-top: 20px;
    justify-content: flex-end;
    .button-col {
      padding: 8px;
    }
    .edit-button {
      width: 100%;
      ${"" /* height:46px; */}
      border-radius:8px;
      font-size: 12px;
      background: #0069fe;
    }
  }
`;

const emailRegex = new RegExp(/^\S+@\S+\.\S+$/);
const englishRegex = new RegExp(/^[a-z0-9_.]+$/i);

function Personal({ userState, setData, data }) {
  const [state, setState] = useState({
    loading: false,
    fetching: false,
  });

  const [fields, setFields] = useState([
    {
      name: ["display_name"],
      value: "",
    },
    {
      name: ["user_login"],
      value: "",
    },
    {
      name: ["user_email"],
      value: "",
    },
    {
      name: ["role"],
      value: "",
    },
  ]);

  const isActiveOptions = useMemo(
    () => [
      {
        text: "??????????",
        value: "admin",
      },
      {
        text: "??????????",
        value: "user",
      },
    ],
    []
  );

  useEffect(() => {
    let tempState = { ...userState };
    fields.map((field) => {
      if (userState[field.name[0]] !== field.value) {
        tempState[field.name[0]] = field.value;
        setData(tempState);
      }
    });
  }, [fields]);

  useEffect(() => {
    const newFields = fields.map((field) => {
      const fieldName = field.name[0];
      return {
        name: [fieldName],
        value: data[fieldName],
      };
    });
    setFields(newFields);
  }, [data]);

  const onFinish = () => {};

  return (
    <FormStyled
      span={24}
      name="login"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      size="large"
      fields={fields}
      onFieldsChange={(_, allFields) => {
        setFields(allFields);
      }}
    >
      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item label="??????" name="display_name">
          <Input />
        </Form.Item>
      </Col>

      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="?????? ????????????"
          name="user_login"
          rules={[
            {
              pattern: englishRegex,
              message: "???????? ???? ?????? ???????????? ?????????? ???????? ????????!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="??????????"
          name="user_email"
          rules={[
            {
              pattern: emailRegex,
              message: "???????? ???? ?????????? ???????? ???????? ????????!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>

      {/* <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="?????? ????????????"
          name="role"
          rules={[
            { required: true, message: "?????? ???? ???????????? ???? ???? ???????????? ????????????." },
          ]}
        >
          <Select className="">
            {isActiveOptions.map((item) => (
              <Option key={item.value} value={item.value}>{item.text}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col> */}
    </FormStyled>
  );
}

export default Personal;
