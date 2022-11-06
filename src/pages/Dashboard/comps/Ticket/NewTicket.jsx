import React, { useEffect, useState } from 'react';
import { Select, Input, Typography, Button } from 'antd';
import classes from './Ticket.module.scss';
import { useFormik } from 'formik';
import { TicketApi, UsersApi } from '../../../../api';

const NewTicket = () => {
  const { TextArea } = Input;
  const { Title } = Typography;
  const [accounts, setAccounts] = useState();
  const [options, setOptions] = useState([]);
  const onSearch = (value) => {
    console.log('search:', value);
  };

  const getUserProfile = () => {
    UsersApi.getProfile().then((res) => {
      setOptions(
        res.result.accounts.map((item) => {
          return {
            value: item.accountEmail,
            lable: item.accountEmail,
          };
        })
      );
    });
    //  console.log('data', data);
  };
  useEffect(() => {
    getUserProfile();
  }, []);

  const formik = useFormik({
    initialValues: {
      accountId: '',
      description: '',
      title: '',
    },
    onSubmit: (values) => {
      TicketApi.postTicket(values).then((res) => {
        if (res.success) {
          // message.success(res.message);
        } else {
          // message.error(res.message);
          console.log(res.message);
        }
      });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit} className={classes.container}>
      <Title level={2} style={{ color: '#44b3fe', direction: 'ltr' }}>
        Add Ticket
      </Title>
      <Select
        id="accountId"
        name="accountId"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.accountId}
        className={classes.ticketSelect}
        showSearch
        placeholder="Select a account"
        optionFilterProp="children"
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={options}
      />
      <Input
        id="title"
        name="title"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.title}
        placeholder="Title"
      />
      <TextArea
        id="description"
        name="description"
        type="text"
        onChange={formik.handleChange}
        value={formik.values.description}
        rows={6}
        placeholder="Description"
      />
      <Button type="submit" className={classes.sendBtn}>
        Send
      </Button>
    </form>
  );
};

export default NewTicket;
