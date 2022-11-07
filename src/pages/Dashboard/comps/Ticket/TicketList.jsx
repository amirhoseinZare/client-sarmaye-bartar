import { Avatar, Button, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { User as UserIcon } from 'iconsax-react';
import classes from './Ticket.module.scss';
import { TicketApi } from '../../../../api';
import { Link } from 'react-router-dom';
import NewTicket from './NewTicket'

const count = 3;

const TiketList = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    TicketApi.getTickets().then((res) => {
      if (res.success) {
        setList(res.result.items);
        setData(res.result.items);
        setInitLoading(false);
        // message.success(res.message);
      } else {
        // message.error(res.message);
        console.log(res.message);
      }
    });
  }, []);
  const onLoadMore = () => {
    setLoading(true);
    setList(
      data.concat(
        [...new Array(count)].map(() => ({
          loading: true,
          name: {},
          picture: {},
        }))
      )
    );
    TicketApi.getTickets().then((res) => {
      if (res.success) {
        setList(res.result.items);
        setData(res.result.items);
        setLoading(false);
        // message.success(res.message);
      } else {
        // message.error(res.message);
        console.log(res.message);
      }
    });
  };
  const loadMore =
    !initLoading && !loading ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button
          style={{
            background: '#10141b',
            border: 'rgba(68, 179, 254, 0.6) 1.5px solid',
            color: 'aliceblue',
          }}
          onClick={onLoadMore}
        >
          load more
        </Button>
      </div>
    ) : null;

  const refreshTicket = ()=>{
    TicketApi.getTickets().then((res) => {
      if (res.success) {
        setList(res.result.items);
        setData(res.result.items);
        setInitLoading(false);
        // message.success(res.message);
      } else {
        // message.error(res.message);
        console.log(res.message);
      }
    })
  }

  return (
    <>
      <List
        className={classes.list}
        loading={initLoading}
        itemLayout="horizontal"
        loadMore={loadMore}
        dataSource={list}
        renderItem={(item) => (
        <Link to="/notification/ticket-detail" state={{ ticketId: item._id }}>
          <List.Item>
            <Skeleton avatar title={false} loading={loading} active>
              <List.Item.Meta
                avatar={
                  <Avatar size="large" className={classes.avatar}>
                    <UserIcon color="#44b3fe" />
                  </Avatar>
                }
                //update state
                title={item.title}
                description={item.description}
              />
            </Skeleton>
          </List.Item>
        </Link>
      )}
    />
    <NewTicket refreshTicket={refreshTicket} />
    </>
    
  );
};
export default TiketList;
