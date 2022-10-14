import React from "react";
import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Form, Input, Button, Col, Select, DatePicker } from "antd";
import { accountType, maxLossLimit } from "../../../../../core/enums";
import moment from "moment";

const { Option } = Select;

const FormStyled = styled(Form)`
  display: flex;
  flex-wrap: wrap;
  .form-account {
    padding: 8px;
    div.ant-select {
      .ant-select-selector {
        border-radius: 8px;
        height: 46px;
        height: 38px;
      }
      border-radius: 8px;
      box-shadow: 0px 2px 3px rgba(207, 207, 217, 0.32);
      font-size: 12px;
      line-height: 18px;
      ${"" /* color: #8286A2; */}
    }
  }
  .form-account-input {
    padding: 8px;
    label {
      color: rgba(0, 0, 0, 1);
      font-size: 12px;
      height: 16px;
    }
    input,.ant-picker {
      height: 38px;
      border-radius: 8px;
      box-shadow: 0px 2px 3px rgba(207, 207, 217, 0.32);
      font-size: 12px;
      line-height: 18px;
      ${"" /* color: #8286A2; */}
    }
  }
  .form-input {
    padding: 8px;
    .ant-picker {
      width: 100%;
    }
    ${"" /* height: 105px; */}
    input,.ant-picker {
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

const numberRegex = new RegExp(/^[۱۲۳۴۵۶۷۸۹۰0-9]*$/);
const p2e = (s) =>
  s?.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

function AccountData({ userState, setData, data }) {
  const [state, setState] = useState({
    loading: false,
    fetching: false,
  });
  const [ isCustomeAccount , setIscustomAccount ] = useState(false)

  let inputNum = ["firstBalance", "maxTradeDays", "percentDays"];

  const [fields, setFields] = useState([
    {
      name: ["systemAccountType"],
      value: "",
    },
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
    // {
    //   name: ["maxTradeDays"],
    //   value: "",
    // },
    // {
    //   name: ["percentDays"],
    //   value: "",
    // },
    // {
    //   name: ["infinitive"],
    //   value: "",
    // },
    {
      name:["level"],
      value:""
    },
    {
      name: ["startTradeDay"],
      value: "",
    },
    {
      name: ["maxLossLimit"],
      value: "",
    },
  ]);

  const accountTypes = useMemo(
    () => Object.values(accountType).map(({text, value})=>({text:text, value:value})),
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
      {
        text: "هیچکدام",
        value: "-",
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

  const maxLossLimitOpts = useMemo(()=>Object.keys(maxLossLimit).map(item=>({value:+item, key:item})), [])

  useEffect(() => {
    let tempState = { ...userState };
    fields.map((field) => {
      if (userState[field.name[0]] !== field.value) {
        if (field.name[0] === "infinitive") {
          let infinitive = field.value === "true";
          tempState[field.name[0]] = infinitive;
        }
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

  const setDate = (e) => {
    let tempFields = fields.map((item) => {
      if (item.name[0] === "startTradeDay") {
        return {
          name: [item.name[0]],
          value: e,
        };
      } else {
        return item;
      }
    });

    setFields(tempFields);
  };

  return (
    <FormStyled
      span={24}
      name="login"
      layout="vertical"
      autoComplete="off"
      size="large"
      fields={fields}
      onFieldsChange={(_, allFields) => {
        let tempFields = allFields;

        tempFields.map((field, index) => {
          let fieldName = field.name[0];

          if (inputNum.includes(fieldName)) {
            if (Number(p2e(field.value)) >= 0) {
              tempFields[index].value = Number(p2e(field.value));
            } else {
              tempFields[index].value = fields[index].value;
            }
          } else {
            tempFields[index].value = field.value;
          }

          if (fieldName === "infinitive" && field.value == "true") {
            // tempFields["maxTradeDays"] = 0; =>
            tempFields[1].value = 0;

            // tempFields["percentDays"] = 0; =>
            tempFields[2].value = 0;
          }
        });

        setFields(tempFields);
      }}
    >
      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="بالانس اولیه"
          name="firstBalance"
          rules={[
            {
              pattern: numberRegex,
              message: "لطفا یک عدد انگلیسی وارد نمایید!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>

      {/* <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="تعداد روز های مجاز ترید"
          name="maxTradeDays"
          rules={[
            {
              pattern: numberRegex,
              message: "لطفا یک عدد انگلیسی وارد نمایید!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col> */}

      {/* <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="Profit Target Percent"
          name="percentDays"
          rules={[
            {
              pattern: numberRegex,
              message: "لطفا یک عدد انگلیسی وارد نمایید!",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col> */}

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
              <Option key={item.value} value={item.value}>{item.text}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      {/* <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="نامحدود"
          name="infinitive"
          rules={[
            { required: true, message: "یکی از دسترسی ها را انتخاب نمایید." },
          ]}
        >
          <Select className="">
            {infinitives.map((item) => (
              <Option key={item.value} value={item.value}>{item.text}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col> */}


      {/* <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="max loss limit"
          name="maxLossLimit"
          rules={[
            { required: true, message: "این فیلد اجباری است" },
          ]}
        >
          <Select className="">
            {maxLossLimitOpts.map((item) => (
              <Option key={item.value} value={item.value}>{item.text}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col> */}


      <Col className="form-input" span={24} sm={24} md={24}>
        تاریخ شروع:
        <DatePicker
          defaultValue={moment(userState?.startTradeDay)}
          onChange={setDate}
        />
      </Col>

      <Col className="form-account" span={24} sm={24} md={24}>
        <Form.Item
          label="مرحله"
          name="level"
          rules={[
            { required: true, message: "یکی از سرور ها را انتخاب نمایید." },
          ]}
        >
          <Select className="">
              <Option value={1}>اول</Option>
              <Option value={2}>دوم</Option>
              <Option value={3}>real</Option>
          </Select>
        </Form.Item>
      </Col>
      
      <Col className="form-account" span={24} sm={24} md={24}>
        <Form.Item
          label="نوع اکانت انتخابی"
          name="accountType"
          rules={[
            { required: true, message: "یکی از سرور ها را انتخاب نمایید." },
          ]}
        >
          <Select className="">
            {accountTypes.map((item) => (
              <Option key={item.value} value={item.value}>{item.text}</Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      {isCustomeAccount && <Col className="form-account-input" span={24} sm={24} md={24}>
        <Form.Item
          
          name="systemAccountType"
          rules={[
            { required: true, message: "لطفا نام یک سرور را تایپ کنید یا از فیلد بالا انتخاب کنید" },
          ]}
        >
          <Input placeholder="لطفا اگر اکانت موردنظر شما در فیلد بالا نیست, اکانت موردنظر خود را تایپ کنید"/>
        </Form.Item>
      </Col>}

    </FormStyled>
  );
}

export default AccountData;
