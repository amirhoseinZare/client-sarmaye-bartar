import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Form, Input, Col, Select } from "antd";

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

function Personal({ userState, setData }) {
  const defaultEmail = useSelector(state=>state.defaultEmail)
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
    {
      name:["type"],
      value:"primary"
    }
  ]);

  useEffect(() => {
    let newFields = [];
    for (const key in userState) {
      const fieldName = key;
      newFields.push({
        name: [fieldName],
        value: userState[fieldName],
      });
    }

    setFields(newFields);
  }, [userState, defaultEmail]);

  const onFinish = () => {};

  return (
    <FormStyled
      span={24}
      name="login"
      layout="vertical"
      onFinish={onFinish}
      autoComplete="off"
      fields={fields}
      size="large"
      onFieldsChange={(_, allFields) => {
        setFields(allFields);

        let tempState = { ...userState };
        fields.map((field) => {
          if (userState[field.name[0]] !== field.value) {
            tempState[field.name[0]] = field.value;
            setData(tempState);
          }
        });
        
      }}
    >
      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="??????"
          name="display_name"
          rules={[{ required: true, message: "?????? ???? ???????? ????????????." }]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="?????? ????????????"
          name="user_login"
          rules={[
            {
              required: true,
              message: "?????? ???????????? ???? ???????? ????????????.",
            },
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
              required: true,
              message: "?????????? ???? ???????? ????????????.",
            },
            {
              pattern: emailRegex,
              message: "???????? ???? ?????????? ???????? ???????? ????????!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="?????????? ??????"
          name="type"
          rules={[
            {
              required: true,
              message: "?????? ???????? ?????????? ??????",
            },
          ]}
        >
          <Select className="" span={24} sm={12} md={8}>
              <Option value="primary">??????</Option>
              <Option value="secondary">??????</Option>
          </Select>
        </Form.Item>
      </Col>

    </FormStyled>
  );
}

export default Personal;
