import React, { useEffect, useState } from 'react';
import { Select, Input, Typography, Button, Form, message } from 'antd';
import classes from './Ticket.module.scss';
import { TicketApi, UsersApi } from '../../../../api';

const { Option } = Select

const NewTicket = ({refreshTicket}) => {
  const [form] = Form.useForm();
  const { TextArea } = Input;
  const { Title } = Typography;
  const [options, setOptions] = useState([]);

  const getUserProfile = () => {
    UsersApi.getProfile().then((res) => {
      setOptions(
        [
          {
            value:res.result._id,
            lable: `${res.result.user_email} ${res.result.platform} level-${res.result.level} ${res.result.firstBalance}$ - Created At ${res.result.createdAt.replace('T', ' ').replace('Z', ' ').split('.')[0]} - MetaTrader Username: ${res.result.metaUsername||'-'}`,
          },
          ...res.result.accounts.map((item) => {
            return {
              value: item._id,
              lable: `${item.accountEmail} ${item.platform} level-${item.level} ${item.firstBalance}$ - Created At ${item.createdAt.replace('T', ' ').replace('Z', ' ').split('.')[0]} - MetaTrader Username: ${item.metaUsername||'-'}`,
            };
          })
      ]);
    });
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  const onFinish = (values) => {
    TicketApi.postTicket(values).then((res) => {
      if (res.success) {
        message.success('your ticket has been added successfully');
        refreshTicket()
      } else {
        message.error('unable to send ticket try again later');
        console.log(res.message);
      }
    })
  }
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <Form 
        layout="vertical"
        form={form} 
        className={classes.container}
        labelCol={{
          span: 24,
        }}
        wrapperCol={{
          span: 24,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
    >
      <Title level={2} style={{ color: '#44b3fe', direction: 'ltr' }}>
        Send ticket to <span style={{color:'white'}}>EXTREME</span> support
      </Title>
      <Form.Item
        label="Select a account"
        name="accountId"
        rules={[
          {
            required: true,
            message: 'Please input your account!',
          },
        ]}
      >
        <Select
          className={classes.ticketSelect}
        >
          {
            options.map(item=><Option key={item.value} value={item.value}>{item.lable}</Option>)
          }
        </Select>
      </Form.Item>
      <Form.Item
        label="title"
        name="title"
        rules={[
          {
            required: true,
            message: 'title is requried',
          },
        ]}
      >
        <Input
          id="title"
          type="text"
        />
      </Form.Item>
      <Form.Item
        label="description"
        name="description"
        rules={[
          {
            required: true,
            message: 'description is requried',
          },
        ]}
      >
        <TextArea
          id="description"
          rows={6}
        />
      </Form.Item>
      <Form.Item style={{
          textAlign:'left'
      }}>
        <Button type="primary" htmlType="submit" className='sendBtn'>
          Send
        </Button>
      </Form.Item>
    </Form>
  );
};

export default NewTicket;
