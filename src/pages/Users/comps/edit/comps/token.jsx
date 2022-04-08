import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Form, Button, Col, Select } from "antd";
import { useSelector } from "react-redux";
const { Option } = Select;

const FormStyled = styled(Form)`
  display: flex;
  flex-wrap: wrap;
  .form-input {
    padding: 8px;
    height: 105px;
    .ant-select-selection-item {
      height: 32px;
      line-height: 32px;
      border-radius: 8px;
      background-color: #f7f8ff;
    }
    div.ant-select {
      .ant-select-selector {
        border-radius: 8px;
        height: 46px;
      }
      height: 46px;
      border-radius: 8px;
      box-shadow: 0px 2px 3px rgba(207, 207, 217, 0.32);
      font-size: 12px;
      line-height: 18px;
    }
    label {
      color: rgba(0, 0, 0, 1);
      font-size: 10px;
      height: 15px;
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
      border-radius: 8px;
      font-size: 12px;
      background: #0069fe;
    }
  }
`;

function Token({ data, closeModal }) {
  const [state, setState] = useState({
    loading: false,
    fetching: false,
  });
  const [fields, setFields] = useState([
    {
      name: ["relatedCategories"],
      value: "",
    },
  ]);

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

  const onFinish = async (model) => {
    
  };

  const onFinishFailed = () => {};

  const onFilterOptions = (inputValue, option) => {
    if (inputValue.trim().length === 0) return true;
    return option.children.includes(inputValue);
  };

  return (
    <div></div>
    // <FormStyled
    //     span={24}
    //     name="login"
    //     layout="vertical"
    //     onFinish={onFinish}
    //     onFinishFailed={onFinishFailed}
    //     autoComplete="off"
    //     size="large"
    //     fields={fields}
    //     onFieldsChange={(_, allFields) => {
    //         setFields(allFields);
    //     }}
    // >

    //     <Col className="form-input" span={24} sm={24} md={24} >
    //         <Form.Item
    //             label={t("category.relatedCategories")}
    //             name="relatedCategories"
    //             rules={[({ getFieldValue }) => ({
    //                 validator(_, value) {
    //                     console.log(_ , value)
    //                     if (value.length<=4) {
    //                         return Promise.resolve();
    //                     }
    //                     return Promise.reject(new Error(t("category.maxcount")));
    //                     },
    //             }),]}
    //         >
    //             <Select className="" mode="multiple" filterOption={onFilterOptions}>
    //                 {catsOptions.map(item=><Option key={item.value} value={item.value}>{item.text}</Option>)}
    //             </Select>
    //         </Form.Item>
    //     </Col>

    //     <Col className="button-container" span={24}>
    //         <Col span={24} sm={12} md={8} className="button-col">
    //             <Button className="edit-button" block type="primary" htmlType="submit" loading={state.loading}>
    //                 {t("category.editCategories")}
    //             </Button>
    //         </Col>
    //     </Col>
    // </FormStyled>
  );
}

export default Token;
