import { message, Tabs, Radio } from 'antd';
import React, { useState, useEffect, useMemo } from 'react';
import { RankingApi } from '../../api/index';
import CustomTable from '../CustomeTable';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import classes from '../../pages/Users/style.module.scss';
import { USER_ID_KEY } from '../../core/variables.core';

import { AiOutlineEye } from 'react-icons/ai';
import first from '../../assets/1.png';
import firts2 from '../../assets/medal 1.svg';
import twice from '../../assets/2.png';
import third from '../../assets/3.png';
import { ReactComponent as FirstGradeSvg } from '../../assets/svg/first-grade.svg';
import { ReactComponent as SecondGradeSvg } from '../../assets/svg/second-grade.svg';
import { ReactComponent as ThirdGradeSvg } from '../../assets/svg/third-grade.svg';

const { TabPane } = Tabs;

const Ranking = () => {
  let user = useSelector((state) => state.user);
  let navigate = useNavigate();

  const [state, setState] = useState({
    rows: [],
    totalCount: 10,
    loading: false,
  });

  const [filter, setFilter] = useState({
    pageNumber: 1,
    pageSize: 10,
  });
  const [activeBtn, setActiveBtn] = useState();
  const tabEnum = {
    0: 'All',
    1: '$5,000',
    2: '$10,000',
    3: '$25,000',
    4: '$50,000',
    5: '$100,000',
    6: '$200,000',
  };

  const [tab, setTab] = useState('6');

  const setUserId = (id) => {
    localStorage.setItem(USER_ID_KEY, id);
  };

  const handleTableChange = ({ current, pageSize }, filters, sorter) => {
    setFilter((s) => ({
      ...s,
      pageNumber: current,
      pageSize,
    }));
  };

  const columnsAdmin = useMemo(
    () => [
      {
        title: 'See user analyze',
        key: 'loginToUserPanel',
        render: (userAdd) => (
          <AiOutlineEye
            style={{ color: '#44B3FE' }}
            className={classes['icons']}
            onClick={() => {
              setUserId(userAdd._id);
              navigate('/dashboard');
            }}
          />
        ),
      },

      // {
      //   title: "ایمیل",
      //   key: "user_email",
      //   dataIndex: "user_email",
      //   render: (email) => email || "-",
      // },
      {
        title: 'Equity',
        key: 'equity',
        dataIndex: 'equity',
        render: (equity) => equity || '-',
      },
      // {
      //   title: "First Balance",
      //   key: "firstBalance",
      //   dataIndex: "firstBalance",
      //   render: (firstBalance) => firstBalance || "-",
      // },
      {
        title: 'Balance',
        key: 'balance',
        dataIndex: 'balance',
        render: (balance) => balance || '-',
      },
      // {
      //   title: "Profit percent",
      //   key: "profit",
      //   dataIndex: "",
      //   render: ({firstBalance, balance}) => `%${(Math.round(((balance - firstBalance) / (firstBalance) * 100) * 100) / 100).toFixed(2)}`
      // },
      {
        title: 'Name',
        key: 'display_name',
        dataIndex: 'display_name',
        render: (name) => name || '-',
      },
      {
        title: 'Rank',
        key: 'rank',
        dataIndex: 'rank',
        render: (rank) => {
          if (rank <= 3) {
            switch (rank) {
              case 1:
                return <img className={classes.imageTable} src={first} />;
                break;
              case 2:
                return <img className={classes.imageTable} src={twice} />;
                break;
              case 3:
                return <img className={classes.imageTable} src={third} />;
                break;
            }
          } else {
            return rank || '-';
          }
        },
      },
    ],
    [state.rows]
  );

  const columnsUser = useMemo(
    () => [
      // {
      //   title: "ایمیل",
      //   key: "user_email",
      //   dataIndex: "user_email",
      //   render: (email) => email || "-",
      // },

      // {
      //   title: 'First Balance',
      //   key: 'firstBalance',
      //   dataIndex: 'firstBalance',
      //   render: (firstBalance) => firstBalance || '-',
      // },
      {
        title: 'See user analyze',
        key: 'loginToUserPanel',
        render: (userAdd) => (
          <AiOutlineEye
            style={{ color: '#44B3FE' }}
            className={classes['icons']}
            onClick={() => {
              setUserId(userAdd._id);
              navigate('/dashboard');
            }}
          />
        ),
      },
      {
        title: 'Balance',
        key: 'balance',
        dataIndex: 'balance',
        render: (balance) => balance || '-',
      },
      {
        title: 'Equity',
        key: 'equity',
        dataIndex: 'equity',
        render: (equity) => equity || '-',
      },
      // {
      //   title: 'Profit percent',
      //   key: 'profit',
      //   dataIndex: '',
      //   render: ({ firstBalance, balance }) =>
      //     `${(
      //       Math.round(((balance - firstBalance) / firstBalance) * 100 * 100) /
      //       100
      //     ).toFixed(2)} %`,
      // },
      {
        title: 'Name',
        key: 'display_name',
        dataIndex: 'display_name',
        render: (name) => name || '-',
      },
      {
        title: 'Rank',
        key: 'rank',
        dataIndex: 'rank',
        render: (rank) => {
          if (rank <= 3) {
            switch (rank) {
              case 1:
                return <img className={classes.imageTable} src={first} />;
                break;
              case 2:
                return <img className={classes.imageTable} src={twice} />;
                break;
              case 3:
                return <img className={classes.imageTable} src={third} />;
                break;
            }
          } else {
            return rank || '-';
          }
        },
      },
    ],
    [state.rows]
  );

  const getUsersData = async () => {
    setState((s) => ({ ...s, loading: true }));
    const firstBalance = tabEnum[tab].replace(',', '').replace('$', '');
    let response = await RankingApi.Rank(
      filter.pageSize,
      filter.pageNumber,
      firstBalance === 'All' ? undefined : +firstBalance
    );

    setState((s) => ({ ...s, loading: false }));

    if (!response.success) {
      message.error(response.message);
      return;
    } else {
      let tempItems = response.items.map((item, index) => {
        return {
          ...item,
          rank: index + 1,
        };
      });

      setState((s) => ({
        ...s,
        totalCount: response.totalCount,
        rows: tempItems,
      }));
    }
  };

  useEffect(() => {
    getUsersData();
  }, [filter, tab]);

  const onChange = (key) => {
    setTab(key.target.value);
    setActiveBtn(key.target.value);
  };

  return (
    <>
      {/* <Tabs onChange={onChange} type="card" defaultActiveKey={tab} size="small">
        {Object.keys(tabEnum).map((tebItem) => {
          // console.log(tabEnum[tebItem]);
          return <TabPane tab={tabEnum[tebItem]} key={tebItem} />;
        })}
      </Tabs> */}
      <Radio.Group
        size="large"
        value={tab}
        onChange={onChange}
        style={{ marginBottom: 16 }}
      >
        {Object.keys(tabEnum).map((tebItem) => {
          return (
            <Radio.Button
              key={tebItem}
              value={tebItem}
              style={{
                border: 'none',
                borderRadius: 0,
                paddingTop: 3,
                fontSize: '14px',
                backgroundColor:
                  activeBtn === tebItem
                    ? 'rgba(68, 179, 254, 0.06)'
                    : '#10141B',
                color: activeBtn === tebItem ? '#44B3FE' : '#F5F5F5',
          
              }}
            >
              {tabEnum[tebItem]}
            </Radio.Button>
          );
        })}
      </Radio.Group>
      <CustomTable
        columns={user?.role === 'admin' ? columnsAdmin : columnsUser}
        rows={state.rows}
        pagination={{
          current: filter.pageNumber,
          pageSize: filter.pageSize,
          total: state.totalCount,
          position: ['bottomRight'],
        }}
        disablePagination={true}
        onChange={handleTableChange}
        loading={state.loading}
        xScroll={'hidden'}
      />
    </>
  );
};

export default Ranking;
