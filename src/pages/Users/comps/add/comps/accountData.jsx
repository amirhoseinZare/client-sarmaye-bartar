import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Form, Input, Col, Select, DatePicker } from "antd";
import { accountType, maxLossLimit } from "../../../../../core/enums";
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
    input,.ant-picker-rtl {
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

const numberRegex = new RegExp(/^[۱۲۳۴۵۶۷۸۹۰0-9]*$/);
const p2e = (s) =>
  s?.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d));

function AccountData({ userState, setData }) {
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
      level:["level"],
      value:""
    },
    {
      name: ["startTradeDay"],
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
        value: accountType["-"],
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

  useEffect(()=>{
    if(fields.length===0)return
    const accountTypeValue = fields.find(item=>item.name[0]==="accountType")?.value 
    const isCustom = accountTypeValue === accountType.doesNotExist.value
    if(accountTypeValue)
      setIscustomAccount(isCustom)
  }, [fields])

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

        fields.map((field) => {
          if (tempState[field.name[0]] !== field.value) {
            let fieldName = field.name[0];

            if (inputNum.includes(fieldName)) {
              if (Number(p2e(field.value)) >= 0) {
                tempState[field.name[0]] = Number(p2e(field.value));
              } else {
                tempState[field.name[0]] = "";
              }
            } else {
              tempState[field.name[0]] = field.value;
            }

            if (tempState["infinitive"] == "true") {
              tempState["maxTradeDays"] = 0;
              tempState["percentDays"] = 0;
            }

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

      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item label="تاریخ شروع" name="startTradeDay">
          <DatePicker />
        </Form.Item>
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

      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="MetaTrader username"
          name="metaUsername"
          rules={[
            {
              required: true,
              message: "لطفا MetaTrader username را وارد نمایید.",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col className="form-input" span={24} sm={12} md={8}>
        <Form.Item
          label="MetaTrader password"
          name="metaPassword"
          rules={[
            {
              required: true,
              message: "لطفا MetaTrader password را وارد نمایید.",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Col>

      <Col className="form-account" span={24} sm={12} md={8}>
        <Form.Item
          label="نوع اکانت"
          name="standardType"
          rules={[
            { required: true, message: "یکی از سرور ها را انتخاب نمایید." },
          ]}
        >
          <Select className="">
            <Option value={''}>{'لطفا نوع اکانت را انتخاب کنید'}</Option>
            <Option value={'standard'}>{'standard'}</Option>
            <Option value={'ecn'}>{'ecn'}</Option>
          </Select>
        </Form.Item>
      </Col>

      <Col className="form-account" span={24} sm={24} md={24}>
        <Form.Item
          label="سرور"
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
