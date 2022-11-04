import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { TicketApi } from './Ticket.api';
const ContainerHeight = 400;

const TicketDetail = () => {
  const [data, setData] = useState([]);
  const { state } = useLocation();

  const appendData = () => {
    if (!state.ticketId) return;
    // TicketApi.getTicket(state.ticketId).then((res) => {
    //   console.log(res);
    //   if (res.success) {
    //     // setList(res.result.items);
    //     setData(res.result.items);
    //     // setInitLoading(false);
    //     // message.success(res.message);
    //   } else {
    //     // message.error(res.message);
    //     console.log(res.message);
    //   }
    // });
  };
  useEffect(() => {
    appendData();
  }, []);
  const onScroll = (e) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerHeight
    ) {
      appendData();
    }
  };
  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item) => (
          <List.Item key={item.email}>
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={<a href="https://ant.design">{item.name.last}</a>}
              description={item.email}
            />
            <div>Content</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};
export default TicketDetail;
