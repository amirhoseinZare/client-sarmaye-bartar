import { Avatar, Grid, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { TicketApi } from '../../../../api/Ticket.api';
import { User as UserIcon } from 'iconsax-react';
import classes from './Ticket.module.scss';
import NewTicket from './NewTicket';
const ContainerHeight = 400;

const TicketDetail = () => {
  const [data, setData] = useState([]);
  const { state } = useLocation();

  const appendData = () => {
    // if (!state.ticketId) return;
    TicketApi.getTicketReplies(state.ticketId).then((res) => {
      if (res.success) {
        // setList(res.result.items);
        setData([{
          ...res.result.origin,
        },...res.result.items]);
        // setInitLoading(false);
        // message.success(res.message);
      } else {
        // message.error(res.message);
        console.log(res.message);
      }
    });
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
    <>
      <List className={classes.ticketList}>
        <VirtualList
          data={data}
          height={ContainerHeight}
          itemHeight={47}
          itemKey="email"
          onScroll={onScroll}
        >
          {(item) => {
            return item.userRole === 'admin' ? (
              <List.Item className={classes.adminPm} key={item._id}>
                <List.Item.Meta
                  avatar={
                    <Avatar className={classes.avatar}>
                      <UserIcon color="#ff7c18" variant="Bold" />
                    </Avatar>
                  }
                  title="admin"
                  description={item.description}
                />
              </List.Item>
            ) : (
              <List.Item className={classes.userPm} key={item._id}>
                <List.Item.Meta
                  avatar={
                    <Avatar className={classes.avatar}>
                      <UserIcon color="#44b3fe" />
                    </Avatar>
                  }
                  title={item?.userId?.display_name}
                  description={item.description}
                />
              </List.Item>
            );
          }}
        </VirtualList>
      </List>
      <div style={{ width: '60%', margin: 'auto' }}>
        <NewTicket />
      </div>
    </>
  );
};
export default TicketDetail;

// import { SmileOutlined } from '@ant-design/icons';
// import { Timeline } from 'antd';
// import React from 'react';
// const App = () => (
//   <Timeline>
//     <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
//     <Timeline.Item color="green">Create a services site 2015-09-01</Timeline.Item>
//     <Timeline.Item color="red">
//       <p>Solve initial network problems 1</p>
//       <p>Solve initial network problems 2</p>
//       <p>Solve initial network problems 3 2015-09-01</p>
//     </Timeline.Item>
//     <Timeline.Item>
//       <p>Technical testing 1</p>
//       <p>Technical testing 2</p>
//       <p>Technical testing 3 2015-09-01</p>
//     </Timeline.Item>
//     <Timeline.Item color="gray">
//       <p>Technical testing 1</p>
//       <p>Technical testing 2</p>
//       <p>Technical testing 3 2015-09-01</p>
//     </Timeline.Item>
//     <Timeline.Item color="gray">
//       <p>Technical testing 1</p>
//       <p>Technical testing 2</p>
//       <p>Technical testing 3 2015-09-01</p>
//     </Timeline.Item>
//     <Timeline.Item color="#00CCFF" dot={<SmileOutlined />}>
//       <p>Custom color testing</p>
//     </Timeline.Item>
//   </Timeline>
// );
// export default App;
