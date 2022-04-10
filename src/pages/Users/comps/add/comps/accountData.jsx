import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Form, Input, Col, Select, DatePicker } from "antd";
import { accountType } from "../../../../../core/enums";
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

const numberRegex = new RegExp(/^[0-9]/);

function AccountData({ userState, setData }) {
  const [state, setState] = useState({
    loading: false,
    fetching: false,
  });

  let inputNum = ["firstBalance", "maxTradeDays", "percentDays"];

  const [fields, setFields] = useState([
    {
      name: ["accountType"],
      value: "",
    },
    {
      name: ["platform"],
      value: "",
    },
    {
      name: ["firstBalance"],
      value: "",
    },
    {
      name: ["maxTradeDays"],
      value: "",
    },
    {
      name: ["percentDays"],
      value: "",
    },
    {
      name: ["infinitive"],
      value: "",
    },
    {
      name: ["startTradeDay"],
      value: "",
    },
  ]);

  const accountTypes = useMemo(
    () => [
      {
        text: accountType["Alpari-mt5-demo"],
        value: accountType["Alpari-mt5-demo"],
      },
      {
        text: accountType["Alpari-pro-ECN-Demo"],
        value: accountType["Alpari-pro-ECN-Demo"],
      },
      {
        text: accountType["Amarkets-Demo"],
        value: accountType["Amarkets-Demo"],
      },
      {
        text: accountType["ICMarketsSC-Demo"],
        value: accountType["ICMarketsSC-Demo"],
      },
      {
        text: accountType["ICMarketsSC-Demo01"],
        value: accountType["ICMarketsSC-Demo01"],
      },
      {
        text: accountType["ICMarketsSC-Demo02"],
        value: accountType["ICMarketsSC-Demo02"],
      },
      {
        text: accountType["ICMarketsSC-Demo03"],
        value: accountType["ICMarketsSC-Demo03"],
      },
      {
        text: accountType["ICMarketsSC-Demo04"],
        value: accountType["ICMarketsSC-Demo04"],
      },
      {
        text: accountType["RoboForex-ECN"],
        value: accountType["RoboForex-ECN"],
      },
      {
        text: accountType["Roboforex-Demo"],
        value: accountType["Roboforex-Demo"],
      },
      {
        text: accountType["TCBridge-Demo"],
        value: accountType["TCBridge-Demo"],
      },
    ],
    []
  );

  const platforms = useMemo(
    () => [
      {
        text: "MT4",
        value: "MT4",
      },
      {
        text: "MT5",
        value: "MT5",
      },
    ],
    []
  );

  const infinitives = useMemo(
    () => [
      {
        text: "بله",
        value: true,
      },
      {
        text: "خیر",
        value: false,
      },
    ],
    []
  );

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

        let tempState = { ...userState };
        
        console.log(tempState)
        console.log(allFields)

        fields.map((field) => {
          if (userState[field.name[0]] !== field.value) {
            let fieldName = field.name[0];
            if (inputNum.includes(fieldName)) {
              
              if (Number(field.value)) {
                tempState[field.name[0]] = Number(field.value);
              } else {
                tempState[field.name[0]] = "";
              }

              console.log(tempState["infinitive"] == "true");
              if (tempState["infinitive"] == "true") {
                tempState["maxTradeDays"] = 0;
                tempState["percentDays"] = 0;
              } else {
                delete tempState["maxTradeDays"];
                delete tempState["percentDays"];
              }
            } else {
              tempState[field.name[0]] = field.value;
            }
            console.log(tempState);
            setData(tempState);
          }
        });
      }}
    >
      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="بالانس اولیه"
          name="firstBalance"
          rules={[
            {
              required: true,
              message: "بالانس اولیه را وارد نمایید.",
            },
            {
              pattern: numberRegex,
              message: "لطفا یک عدد انگلیسی وارد نمایید!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="تعداد روز های مجاز ترید"
          name="maxTradeDays"
          rules={[
            {
              required: true,
              message: "تعداد روز های مجاز ترید را وارد نمایید.",
            },
            {
              pattern: numberRegex,
              message: "لطفا یک عدد انگلیسی وارد نمایید!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="Profit Target Percent"
          name="percentDays"
          rules={[
            {
              required: true,
              message: "لطفا Profit Target Percent را وارد نمایید.",
            },
            {
              pattern: numberRegex,
              message: "لطفا یک عدد انگلیسی وارد نمایید!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="نوع اکانت"
          name="accountType"
          rules={[
            { required: true, message: "یکی از دسترسی ها را انتخاب نمایید." },
          ]}
        >
          <Select className="">
            {accountTypes.map((item) => (
              <Option key={item.value}>{item.text}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="پلتفرم"
          name="platform"
          rules={[
            { required: true, message: "یکی از دسترسی ها را انتخاب نمایید." },
          ]}
        >
          <Select className="">
            {platforms.map((item) => (
              <Option key={item.value}>{item.text}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="نامحدود"
          name="infinitive"
          rules={[
            { required: true, message: "یکی از دسترسی ها را انتخاب نمایید." },
          ]}
        >
          <Select className="">
            {infinitives.map((item) => (
              <Option key={item.value}>{item.text}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item label="تاریخ شروع" name="startTradeDay">
          <DatePicker />
        </Form.Item>
      </Col>
    </FormStyled>
  );
}

export default AccountData;