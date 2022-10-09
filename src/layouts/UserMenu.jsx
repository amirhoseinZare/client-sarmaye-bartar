import { Menu, Button, ConfigProvider, Layout } from 'antd';
import {
  UserOutlined,
  BarChartOutlined,
  ProfileOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import styled from "styled-components"
import { Link, useLocation } from "react-router-dom"
import Navbar from "../comps/Navbar/Navbar";

const StyledContainer = styled.div`
  .main-page {
    width:calc(100% - 180px);
    margin-top: 30px;
    height: 100%;
    background-color: #f0f1f4;
    padding-bottom: 20px;
    @media only screen and (max-width: 1250px) {
      width:calc(100% );
    }
  }
`

const StyledMenuRoot = styled.div`
  position:fixed;
  top:0;
  left:0;
  height:100vh;
  width:180px;
  .ant-menu-item-selected {
    span.ant-menu-title-content {
      a {
        color:#0F4C75 !important;

      }
    }
    span {
      color:#0F4C75 !important;
    }
    color:#0F4C75 !important;
  }
  .ant-menu-dark {
    padding-top:56px;
    background:#24303C;
    height:100vh;
    &.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
      background-color: #BBE1FA;
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
  @media only screen and (max-width: 1250px) {
    display:none;
  }
`

const { SubMenu } = Menu;
const {Sider} = Layout

const UserLayout = (props)=> {
    const location = useLocation()
    const routes= {
      "/dashboard":{
        route:"/dashboard",
        key:"1"
      },
      "/accounts":{
        route:"/accounts",
        key:"2"
      },
      "/profile":{
        route:"/profile",
        key:"3"
      },
      "/charts":{
        route:"/charts",
        key:"4"
      },
    }
    useEffect(()=>{
      if(state.currentRoute !== routes[location.pathname].key)
        setState(s=>({...s, currentRoute:routes[location.pathname].key}))
    }, [location])
    const [state, setState] = useState({
      collapsed: false,
      currentRoute: "1"
    })
    
    const toggleCollapsed = () => {
      setState({
        collapsed: !state.collapsed,
      });
    };

    return (
      <div>
        <Navbar />
        <ConfigProvider direction='ltr'>
            <StyledMenuRoot>
              <Menu
                defaultSelectedKeys={['1']}
                selectedKeys={[state.currentRoute]}
                defaultOpenKeys={['sub1']}
                mode="inline"
                theme="dark"
                inlineCollapsed={state.collapsed}
              >
                <Menu.Item key="1" icon={<BarChartOutlined />}>
                  <Link to={"/dashboard"}>dashboard</Link>
                </Menu.Item>
                <Menu.Item key="2" icon={<UserOutlined />}>
                  <Link to={"/accounts"}>accounts</Link>
                </Menu.Item>
                <Menu.Item key="3" icon={<ProfileOutlined />}>
                  <Link to={"/profile"}>profile</Link>
                </Menu.Item>
                <Menu.Item key="4" icon={<PieChartOutlined />}>
                  <Link to={"/charts"}>charts</Link>
                </Menu.Item>
              </Menu>
            </StyledMenuRoot>
            <Sider
              breakpoint="lg"
              collapsedWidth="0"
              onBreakpoint={broken => {
                console.log(broken);
              }}
              onCollapse={(collapsed, type) => {
                console.log(collapsed, type);
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
          </Sider>
          <StyledContainer>
            <div className='main-page'>
              {props.children}
            </div>
          </StyledContainer>
        </ConfigProvider>
      </div>
    );
}

export default UserLayout