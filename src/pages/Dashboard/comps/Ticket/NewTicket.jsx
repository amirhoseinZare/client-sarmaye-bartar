import React from 'react';
import { Select, Input, Typography } from 'antd';
import classes from './Ticket.module.scss';

const NewTicket = () => {
  const { TextArea } = Input;
  const { Title } = Typography;
  const onChange = (value) => {
    console.log(`selected ${value}`);
  };

  const onSearch = (value) => {
    console.log('search:', value);
  };
  return (
    <div className={classes.container}>
      <Title level={2} style={{ color: '#44b3fe', direction: 'ltr' }}>
        Add Ticket
      </Title>
      <Select
        className={classes.ticketSelect}
        showSearch
        placeholder="Select a account"
        optionFilterProp="children"
        onChange={onChange}
        onSearch={onSearch}
        filterOption={(input, option) =>
          (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
        }
        options={[
          {
            value: 'jack',
            label: 'Jack',
          },
          {
            value: 'lucy',
            label: 'Lucy',
          },
          {
            value: 'tom',
            label: 'Tom',
          },
        ]}
      />
      <Input placeholder="Title" />
      <TextArea rows={6} placeholder="Description" />
    </div>
  );
};

export default NewTicket;
