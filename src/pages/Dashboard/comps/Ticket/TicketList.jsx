import { Avatar, Button, List, Skeleton } from 'antd';
import React, { useEffect, useState } from 'react';
import { User as UserIcon } from 'iconsax-react';
import classes from './Ticket.module.scss';

const count = 3;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender,email,nat,picture&noinfo`;

const TiketList = () => {
  const [initLoading, setInitLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [list, setList] = useState([]);
  useEffect(() => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        setInitLoading(false);
        setData(res.results);
        setList(res.results);
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
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((res) => {
        const newData = data.concat(res.results);
        setData(newData);
        setList(newData);
        setLoading(false);
        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
        // In real scene, you can using public method of react-virtualized:
        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
        window.dispatchEvent(new Event('resize'));
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
            color:'aliceblue'
          }}
          onClick={onLoadMore}
        >
          load more
        </Button>
      </div>
    ) : null;
  return (
    <List
      className={classes.list}
      loading={initLoading}
      itemLayout="horizontal"
      loadMore={loadMore}
      dataSource={list}
      renderItem={(item) => (
        <List.Item>
          <Skeleton avatar title={false} loading={item.loading} active>
            <List.Item.Meta
              avatar={
                <Avatar size="large" className={classes.avatar}>
                  <UserIcon color="#44b3fe" />
                </Avatar>
              }
              title={<a href="https://ant.design">{item.name?.last}</a>}
              description="Ant Design, a design language for background applications, is refined by Ant UED Team"
            />
          </Skeleton>
        </List.Item>
      )}
    />
  );
};
export default TiketList;
