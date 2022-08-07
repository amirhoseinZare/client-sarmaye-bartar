import { Menu, Button, ConfigProvider } from 'antd';
import {
  AppstoreOutlined,
  UserSwitchOutlined,
  ArrowUpOutlined,
  PlusOutlined,
  ReloadOutlined,
  EuroCircleOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import styled from "styled-components"
import { Link } from "react-router-dom"

const StyledRoot = styled.div`
  position:fixed;
  top:0;
  left:0;
  height:100vh;
  width:180px;
  .ant-menu-item-selected {
    span {
      color:#24303C !important;
    }
    color:#24303C !important;
  }
  .ant-menu-dark {
    padding-top:56px;
    background:#24303C;
    height:100vh;
    &.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
      background-color: #FFB629;
    }
    .ant-menu-submenu-title {
      padding-left:24px !important;  
    }
    .ant-menu-item {
      .ant-menu-item-icon {
        font-size:21px;
      }
      padding-left:24px !important;  
    }
  }
`

const { SubMenu } = Menu;

const UserLayout = ()=> {
    const [state, setState] = useState({
      collapsed: false,
    })

    const toggleCollapsed = () => {
      setState({
        collapsed: !state.collapsed,
      });
    };

    return (
      <StyledRoot>
        {/* <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          {state.collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
        </Button> */}
        <ConfigProvider direction='ltr'>
          <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={state.collapsed}
          >
            <Menu.Item key="1" icon={<UserSwitchOutlined />}>
              <Link to={"/dashboard"}>dashboard</Link>
            </Menu.Item>
            <SubMenu key="accounts" icon={<AppstoreOutlined />} title="Accounts">
              <Menu.Item key="5" icon={<ArrowUpOutlined />}><Link to={"/accounts?page=next-phase"}>Next phase</Link></Menu.Item>
              <Menu.Item key="6" icon={<PlusOutlined />}><Link to={"/accounts?page=extend"}>Extend</Link></Menu.Item>
            </SubMenu>
          </Menu>
          {children}
        </ConfigProvider>
      </StyledRoot>
    );
}

export default UserLayout