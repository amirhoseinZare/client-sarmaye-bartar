import { Menu, Button, ConfigProvider, Layout } from 'antd';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import {
  Cup as CupIcon,
  Category,
  User as UserIcon,
  Key as KeyIcon,
  StatusUp as ChartIcon,
  Notification as NotifictaionIcon
  Notification as NotifictaionIcon,
} from 'iconsax-react';

const StyledContainer = styled.div`
  .main-page {
    background: rgb(11, 14, 19);
    width: calc(100% - 180px);
    height: 100%;
    padding-bottom: 20px;
    @media only screen and (max-width: 1250px) {
      width: calc(100%);
    }
  }
`;

const StyledMenuRoot = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 204px;

  .ant-menu-item-selected {
    svg {
      color: rgba(68, 179, 254, 1) !important;
    }
    span.ant-menu-title-content {
      a {
        color: rgba(68, 179, 254, 1) !important;
      }
    }
    span {
      color: #0f4c75 !important;
    }
    color: #0f4c75 !important;
  }
  .ant-menu-dark {
    padding-top: 56px;
    background: rgba(16, 20, 27, 1);

    height: 100vh;
    &.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
      background: rgba(68, 179, 254, 0.1);

      .right-fixed-rectangle {
        background: rgba(68, 179, 254, 1);
      }
    }
    .ant-menu-submenu-title {
      padding-left: 24px !important;
    }
    .ant-menu-item {
      position: relative;
      a {
        color: rgba(245, 245, 245, 1);
      }
      color: rgba(245, 245, 245, 1);
      .ant-menu-item-icon {
        font-size: 21px;
      }
      padding-left: 24px !important;
      .right-fixed-rectangle {
        height: 40px;
        width: 10px;
        position: absolute;
        right: 0;
        background: transparent;
        top: 0px;
        z-index: 100000000;
      }
    }
  }
  @media only screen and (max-width: 1250px) {
    display: none;
  }
`;

const { SubMenu } = Menu;
const { Sider } = Layout;

const UserLayout = (props) => {
  const location = useLocation();
  const routes = {
    '/dashboard': {
      route: '/dashboard',
      key: '1',
    },
    '/profile': {
      route: '/profile',
      key: '2',
    },
    '/accounts': {
      route: '/accounts',
      key: '3',
    },
    '/charts': {
      route: '/charts',
      key: '4',
    },

    '/': {
      route: '/',
      key: '5',
    },
    '/notification': {
      route: '/notification',
      key: '6',
    },
    '/notification/ticket-detail': {
      route: '/notification/ticket-detail',
      key: '7',
    },
  };
  useEffect(() => {
    if (state.currentRoute !== routes[location.pathname].key)
      setState((s) => ({ ...s, currentRoute: routes[location.pathname].key }));
  }, [location]);
  const [state, setState] = useState({
    collapsed: false,
    currentRoute: '1',
  });

  const toggleCollapsed = () => {
    setState({
      collapsed: !state.collapsed,
    });
  };

  return (
    <div>
      {/* <Navbar /> */}
      <ConfigProvider direction="ltr">
        <StyledMenuRoot>
          <Menu
            defaultSelectedKeys={['1']}
            selectedKeys={[state.currentRoute]}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={state.collapsed}
          >
            <Menu.Item key="1" icon={<Category />}>
              <Link to={'/dashboard'}>Dashboard</Link>
              <div className="right-fixed-rectangle"></div>
            </Menu.Item>
            <Menu.Item key="2" icon={<UserIcon />}>
              <Link to={'/profile'}>Profile</Link>
              <div className="right-fixed-rectangle"></div>
            </Menu.Item>
            <Menu.Item key="3" icon={<KeyIcon />}>
              <Link to={'/accounts'}>Accounts</Link>
              <div className="right-fixed-rectangle"></div>
            </Menu.Item>
            <Menu.Item key="4" icon={<ChartIcon />}>
              <Link to={'/charts'}>Charts</Link>
              <div className="right-fixed-rectangle"></div>
            </Menu.Item>
            <Menu.Item key="5" icon={<CupIcon />}>
              <Link to={'/'}>Top</Link>
              <div className="right-fixed-rectangle"></div>
            </Menu.Item>
          </Menu>
        </StyledMenuRoot>
        {/* <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={broken => {
              }}
              onCollapse={(collapsed, type) => {
              }}
            >
              <div className="logo" />
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={['4']}
              >
                <Menu.Item>تست</Menu.Item>
              </Menu>
          </Sider> */}
        <StyledContainer>
          <div className="main-page">{props.children}</div>
        </StyledContainer>
      </ConfigProvider>
    </div>
  );
};

export default UserLayout;
