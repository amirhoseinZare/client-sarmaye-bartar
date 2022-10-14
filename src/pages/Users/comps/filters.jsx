import { Collapse, Row, Col, Form, Input, Button, Select } from 'antd';
import styled from "styled-components"
import { useState, useEffect, useMemo, useReducer } from "react"

const { Panel } = Collapse;
const { Option } = Select

const StyledCol = styled(Col)`
    margin:8px 0 16px;
    .ant-collapse {
        ${'' /* border:none; */}
        ${'' /* border-radius:8px !important; */}
        .ant-collapse-item {
            ${'' /* border:none; */}
            background-color:#F7F8FF;
        }
        .ant-collapse-content {
            background-color:#F7F8FF;
        }
    }
`

const FormStyled = styled(Form)`
    .ant-form-item-label {
        text-align:right;
    }
    display:flex;
    flex-wrap:wrap;
    .form-input {
        padding:8px;
        height: 105px;
        input {
            max-width: 305px;
            height:46px;
            border-radius:8px;
            box-shadow: 0px 2px 3px rgba(207, 207, 217, 0.32);
            font-size: 12px;
            line-height: 18px;
            direction: ltr;
            ${'' /* color: #8286A2; */}
        }
        div.ant-select {
            .ant-select-selector {
                border-radius: 8px;
                height:46px;
            }
            max-width: 305px;
            height:46px;
            border-radius:8px;
            box-shadow: 0px 2px 3px rgba(207, 207, 217, 0.32);
            font-size: 12px;
            line-height: 18px;
            ${'' /* color: #8286A2; */}
        }
        textarea {
            box-shadow: 0px 2px 3px rgba(207, 207, 217, 0.32);
            font-size: 12px;
            line-height: 18px;
            border-radius:8px;
            ${'' /* color: #8286A2; */}
        }
        label {
            color:rgba(0, 0, 0, 1);
            font-size: 10px;
            height:15px;
        }
    }
    .button-container {
        align-items: center;
        display: flex;
        padding-top: 20px;
        justify-content:flex-end;
        .button-col {
            padding:8px;
        }
        .edit-button {
            width: 100%;
            ${'' /* height:46px; */}
            border-radius:8px;
            font-size:12px;
            background: #0069FE;
        }
    }
`

const Filter = ({setFilter, filter, search})=>{
    const fields = useMemo(()=>({
        user_email:''
    }), [])
    // console.log(input)
    const onFinish = (model)=>{
        console.log(model, fields)
        let pageNumber = filter.pageNumber
        if(model.user_email)
            pageNumber = 1
        setFilter({...filter, ...model, pageNumber})
    }
    const onFinishFailed = ()=>{

    }
    
    return (
        <StyledCol xs={24} sm={24} md={24} lg={24} xl={24}>
            <Collapse defaultActiveKey={['1']}>
                <Panel header={'فیلتر'} key="2">
                    <FormStyled 
                        span={24}
                        name="login"
                        layout="vertical"
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                        size="large"
                    >
                        <Col className="form-input" span={24} sm={12} md={8}>
                            <Form.Item
                                label={'ایمیل'}
                                name="user_email"
                                rules={[]}
                                // value={input.name}
                            >
                                <Input />
                            </Form.Item>
                        </Col>
                
                        <Col className="button-container" span={24}>
                            <Col span={24} sm={12} md={8} className="button-col">
                                <Button className="edit-button" block type="primary" htmlType="submit" loading={false}>
                                    {"جستجو"}
                                </Button>
                            </Col>
                        </Col>
                    </FormStyled>
                </Panel>
            </Collapse>
        </StyledCol>
    )
}

export default Filter