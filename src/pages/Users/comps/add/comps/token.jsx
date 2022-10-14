import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Form, Input, Col, Select } from "antd";
import { useSelector } from "react-redux";
const { Option } = Select;

const FormStyled = styled(Form)`
  display: flex;
  flex-wrap: wrap;
  .form-input {
    padding: 8px;
    .ant-picker-rtl {
      width: 100%;
    }
    ${"" /* height: 105px; */}
    input,.ant-picker-rtl {
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
    .edit-button {
      width: 100%;
      ${"" /* height:46px; */}
      border-radius:8px;
      font-size: 12px;
      background: #0069fe;
    }
    .button-col {
      padding: 8px;
    }
  }
`;

function Token({ userState, setData }) {
  const [state, setState] = useState({
    loading: false,
    fetching: false,
  });

  const [fields, setFields] = useState([
    {
      name: ["mtAccessToken"],
      value: "",
    },
    {
      name: ["mtAccountId"],
      value: "",
    },
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
  }, [userState]);

  const onFinish = async (model) => {};

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
        <Form.Item label="توکن" name="mtAccessToken">
          <Input />
        </Form.Item>
      </Col>

      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item label="آیدی" name="mtAccountId">
          <Input />
        </Form.Item>
      </Col>
    </FormStyled>
  );
}

export default Token;
