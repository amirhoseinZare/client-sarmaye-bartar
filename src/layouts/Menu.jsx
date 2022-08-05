import { Menu, Button, ConfigProvider } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons';
import { useState } from 'react';
import styled from "styled-components"

const StyledRoot = styled.div`
  width:256px;
  position:fixed;
  top:0;
  left:0;
  height:100vh;
  width:175px;
  .ant-menu-dark {
    padding-top:56px;
    background:#24303C;
    height:100vh;
    &.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
      background-color: #FFB629;
    }
  }
`

const { SubMenu } = Menu;

const AdminLayout = ()=> {
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
                <Menu.Item key="1" icon={<PieChartOutlined />}>
                  Users
                </Menu.Item>
                <SubMenu key="sub1" icon={<MailOutlined />} title="Requests">
                  <Menu.Item key="5">Next phase</Menu.Item>
                  <Menu.Item key="6">Extend</Menu.Item>
                  <Menu.Item key="7">Reset</Menu.Item>
                  <Menu.Item key="8">Profit withdrawal</Menu.Item>
                </SubMenu>
              </Menu>
            </ConfigProvider>
          </StyledRoot>
    );
}

export default AdminLayout