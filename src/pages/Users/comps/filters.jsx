import { Collapse, Row, Col, Form, Input, Button, Select } from 'antd';
import styled from "styled-components"
import { useState, useEffect, useMemo, useReducer } from "react"
import { accountLevels, accountType as accountTypeEnum } from "../../../core/enums"

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

const Filter = ({setFilter, filter, search, setPageSearchParams})=>{
    const accountTypes = useMemo(
        () => Object.values(accountTypeEnum).map(({text, value})=>({text:text, value:value})),
        []
    );
    const onFinish = (model)=>{
        let pageNumber = filter.pageNumber
        const {
            display_name,
            user_email,
            user_login,
            platform,
            level,
            accountType,
            metaUsername,
            standardType,
            hasFailedMaxLoss,
            hasFailedDailyLoss
        } = model
        model.accountType = (!model.accountType) ? '' : accountTypeEnum[accountType].value
        if(display_name || user_email || user_login || platform || level || accountType || metaUsername || standardType || typeof hasFailedMaxLoss === 'boolean' || typeof hasFailedDailyLoss === 'boolean')
            pageNumber = 1
        const sanitizedFilters = Object.fromEntries(Object.entries(filter).map(item=>{
            if(typeof item[1] === "string")
                return [item[0], item[1].trim()]
            return item
        }))
        const sanitizedModel = Object.fromEntries(Object.entries(model).map(item=>{
            if(typeof item[1] === "string")
                return [item[0], item[1].trim()]
            return item
        }))
        setFilter({...sanitizedFilters, ...sanitizedModel, pageNumber})
        // setPageSearchParams({...sanitizedFilters, ...sanitizedModel, pageNumber})
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

                        <Col className="form-input" span={24} sm={12} md={4}>
                            <Form.Item
                                label={'نام'}
                                name="display_name"
                                rules={[]}
                                // value={input.name}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col className="form-input" span={24} sm={12} md={4}>
                            <Form.Item
                                label={'ایمیل'}
                                name="user_email"
                                rules={[]}
                                // value={input.name}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col className="form-input" span={24} sm={12} md={4}>
                            <Form.Item
                                label={'نام کاربری'}
                                name="user_login"
                                rules={[]}
                                // value={input.name}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col className="form-input" span={24} sm={12} md={4}>
                            <Form.Item
                                label={'پلتفرم'}
                                name="platform"
                                rules={[]}
                                // value={input.name}
                            >
                                <Input />
                            </Form.Item>
                        </Col>

                        <Col className="form-input" span={24} sm={12} md={4}>
                            <Form.Item
                                label={'مرحله'}
                                name="level"
                                rules={[]}
                                // value={input.name}
                            >
                                <Select>
                                    <Option value={1}>اول</Option>
                                    <Option value={2}>دوم</Option>
                                    <Option value={3}>real</Option>
                                    <Option value={''}>هیچکدام</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col className="form-input" span={24} sm={12} md={4}>
                            <Form.Item
                                label={'سرور'}
                                name="accountType"
                                rules={[]}
                                // value={input.name}
                            >
                                <Select>
                                    {accountTypes.map((item) => {
                                        if(item.value!=='none' && item.value!=='doesNotExist')
                                            return <Option key={item.value} value={item.value}>{item.text}</Option>
                                        if(item.value==='none')
                                            return <Option key={item.value} value={''}>هیچکدام</Option>
                                    })}
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col className="form-input" span={24} sm={12} md={4}>
                            <Form.Item
                                label={'نام کاربری متا'}
                                name="metaUsername"
                                rules={[]}
                                // value={input.name}
                            >
                               <Input />
                            </Form.Item>
                        </Col>

                        <Col className="form-input" span={24} sm={12} md={4}>
                            <Form.Item
                                label={'نوع اکانت'}
                                name="standardType"
                                rules={[]}
                            >
                                <Select>
                                    <Option value={'standard'}>{'standard'}</Option>
                                    <Option value={'ecn'}>{'ecn'}</Option>
                                    <Option value={''}>{'هیچکدام'}</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col className="form-input" span={24} sm={12} md={4}>
                            <Form.Item
                                label={'max loss'}
                                name="hasFailedMaxLoss"
                                rules={[]}
                                // value={input.name}
                            >
                                <Select>
                                    <Option value={true}>failed</Option>
                                    <Option value={false}>passed</Option>
                                    <Option value={''}>هیچکدام</Option>
                                </Select>
                            </Form.Item>
                        </Col>

                        <Col className="form-input" span={24} sm={12} md={4}>
                            <Form.Item
                                label={'max daily loss'}
                                name="hasFailedDailyLoss"
                                rules={[]}
                                // value={input.name}
                            >
                                <Select>
                                    <Option value={true}>failed</Option>
                                    <Option value={false}>passed</Option>
                                    <Option value={''}>هیچکدام</Option>
                                </Select>
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
