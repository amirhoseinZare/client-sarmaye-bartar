import { useState, useEffect, useMemo } from "react";
import styled from "styled-components";
import { Form, Input, Button, Col, Select, Modal } from "antd";
const { Option } = Select

const FormStyled = styled(Form)`
    display:flex;
    flex-wrap:wrap;
    .form-input {
        padding:8px;
        ${'' /* height: 105px; */}
        input {
            max-width: 305px;
            height:46px;
            border-radius:8px;
            box-shadow: 0px 2px 3px rgba(207, 207, 217, 0.32);
            font-size: 12px;
            line-height: 18px;
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
        .edit-button {
            width: 100%;
            ${'' /* height:46px; */}
            border-radius:8px;
            font-size:12px;
            background: #0069FE;
        }
        .button-col {
            padding:8px;
        }
    }
`

function Descriptions({data}){
    const [state, setState] = useState({
        loading: false,
        fetching: false,
    });
    
    const [fields, setFields] = useState([
        {
            name: ['description'],
            value: '',
        },
        {
            name: ['descriptionEn'],
            value: '',
        },
    ]);

    const isActiveOptions = useMemo(()=>[
        {
            text:"انتخاب کنید",
            value:""
        },
        {
            text:"بله",
            value:true
        },
        {
            text:"خیر",
            value:false
        },
    ], [])

    useEffect(()=>{
        const newFields = fields.map((field)=>{
            const fieldName = field.name[0]
            return {
                name:[fieldName],
                value:data[fieldName]
            }
        })
        // console.log(newFields, data)
        setFields(newFields)
    }, [data])

    const onFinish = ()=>{

    }

    const onFinishFailed = ()=>{

    }

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

        //     <Col className="form-input address" md={24} xl={24} xs={24} sm={24} lg={24}>
        //         <Form.Item
        //             label={t("category.description")}
        //             name="description"
        //             rules={[{ required: true, message: t("validation.required") }]}
        //             style={{width:'100%'}}
        //         >
        //             <Input.TextArea  autoSize={{ minRows: 4, maxRows: 10 }}/>
        //         </Form.Item>
        //     </Col>

        //     <Col className="form-input address" md={24} xl={24} xs={24} sm={24} lg={24}>
        //         <Form.Item
        //             label={t("category.descriptionEn")}
        //             name="descriptionEn"
        //             rules={[{ required: true, message: t("validation.required") }]}
        //             style={{width:'100%'}}
        //         >
        //             <Input.TextArea  autoSize={{ minRows: 4, maxRows: 10 }}/>
        //         </Form.Item>
        //     </Col>

        //     <Col className="button-container" span={24}>
        //         <Col spane={8}  span={24} sm={12} md={8} className="button-col">
        //             <Button className="edit-button" block type="primary" htmlType="submit" loading={state.loading}>
        //                 {t("button.editInfo")}
        //             </Button>
        //         </Col>
        //     </Col>
        // </FormStyled>
    )
}

export default Descriptions