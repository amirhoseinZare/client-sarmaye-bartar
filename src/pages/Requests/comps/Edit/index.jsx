import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Form, Input, Button, Col, Select, Modal, message } from "antd";
import { RequestApi } from "../../../../api/Request.api";
import { useDispatch } from "react-redux";
import { setModal } from "../../../../redux/actions/modal"

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
  .done-button {
    border-radius: 12px;
  }
`;

function Personal({ data, getUsersData }) {
  const dispatch = useDispatch()
  const [state, setState] = useState({
    loading: false,
    fetching: false,
  });
  const [fields, setFields] = useState([
    {
      name: ["status"],
      value: "",
    }
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

  const onFinish = () => {};

  const editRequest = async ()=>{
    setState(s=>({...s, loading:true}))
    const call = await RequestApi.patch(data._id,{
      status:fields[0].value
    })
    setState(s=>({...s, loading:false}))
    if(!call.success){
      message.error(call.message)
      return
    }
    message.success(call.message)
    dispatch(setModal({ visible: false }));
    getUsersData()
  }

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
        <Form.Item label="وضعیت" name="status">
            <Select className="" span={24} sm={12} md={8}>
              <Option value="waiting">waiting</Option>
              <Option value="rejected">rejected</Option>
              <Option value="accepted">accepted</Option>
            </Select>
        </Form.Item>
      </Col>

      <Col className="form-input" span={24} sm={24} md={24}>
        <Button className="done-button" type="primary" onClick={editRequest} loading={state.loading}>
            ثبت
        </Button>
      </Col>

    </FormStyled>
  );
}

export default Personal;
