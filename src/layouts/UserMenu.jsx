import { Menu, Button, ConfigProvider, Layout } from 'antd';
import {
  AppstoreOutlined,
  UserSwitchOutlined,
  ArrowUpOutlined,
  PlusOutlined,
  ReloadOutlined,
  EuroCircleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  BarChartOutlined,
  
} from '@ant-design/icons';
import { useEffect, useState } from 'react';
import styled from "styled-components"
import { Link, useLocation } from "react-router-dom"
import Navbar from "../comps/Navbar/Navbar";
import { Category, User as UserIcon, Key as KeyIcon } from "iconsax-react"

const StyledContainer = styled.div`
  .main-page {
    background: rgb(11, 14, 19);
    width:calc(100% - 180px);
    height: 100%;
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
  width:204px;

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
      color:#0F4C75 !important;
    }
    color:#0F4C75 !important;
  }
  .ant-menu-dark {
    padding-top:56px;
    background: rgba(16, 20, 27, 1);
    
    height:100vh;
    &.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
      background: rgba(68, 179, 254, 0.1);

      .right-fixed-rectangle {

        background: rgba(68, 179, 254, 1);

      }

    }
    .ant-menu-submenu-title {
      padding-left:24px !important;  
    }
    .ant-menu-item {
      position:relative;
      a {
        color: rgba(245, 245, 245, 1);
      }
      color: rgba(245, 245, 245, 1);
      .ant-menu-item-icon {
        font-size:21px;

      }
      padding-left:24px !important;  
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
        {/* <Navbar /> */}
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
                <Menu.Item key="1" icon={<Category />}>
                  <Link to={"/dashboard"}>dashboard</Link>
                  <div className='right-fixed-rectangle'></div>
                </Menu.Item>
                <Menu.Item key="2" icon={<KeyIcon />}>
                  <Link to={"/accounts"}>accounts</Link>
                  <div className='right-fixed-rectangle'></div>
                </Menu.Item>
              </Menu>
            </StyledMenuRoot>
            {/* <Sider
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
          </Sider> */}
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