import styled from 'styled-components'
import { Row, Card, Col } from "antd"
import { useSelector, useDispatch } from 'react-redux'
import { BsFillCircleFill } from "react-icons/bs"
import { LineChartOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { setAuth } from '../../redux/actions/auth'
import { BsFillCheckCircleFill } from "react-icons/bs";
import { IoMdCloseCircle } from "react-icons/io";

const StyledRoot = styled.div`
    b {
        font-weghit:bolder;    
    }
    p, li, b {
        font-size:14px;
    }
    height:100%;
    max-width:1400px;
    margin:auto;
    .ant-col {
        margin-top:20px;
    }
    .ant-card-head-title,
    .ant-card-body {
        text-align:left;
    }
    ul, li {
        direction:ltr;
    }
    .ant-card {
        border-radius:20px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        .user-status {
            span {
                display:inline-flex;
                align-items: center;
                b {
                    padding-left:4px;
                    height:17px;
                    ::first-letter {
                        text-transform:capitalize;
                    }
                }    
            }
        }
        .active-status {
            color:green;
        }
        .deactive-status {
            color:red;
        }
        .dashobard-link {
            display:flex;

            a {
                background: #24303C;
                padding: 4px 8px;
                color: #fff;
                border-radius: 8px;    
            }
        }
    }
`

const Accounts = ()=>{
    const user = useSelector(store=>store.user)
    const dispatch = useDispatch()

    const changeCurrentAuth = (newUser)=>{
        dispatch(setAuth({...newUser, accounts:user.accounts }))
    }

    return (
        <StyledRoot>
             {user.isAuth && <Row gutter={16}>
                {/* <Col lg={12} md={24} sm={24}>
                    <Card title={user.user_login} bordered={false}>
                        <p><b>First Balance:</b> {user.firstBalance}</p>
                        <p><b>Account Type:</b> {user.accountType}</p>
                        <p><b>Platform: </b>{user.platform}</p>
                        <p><b>Level:</b> {user.infinitive ? "Real": user.level}</p>
                            {!user.infinitive && <ul>
                                <li><b>Max trade days:</b> {user.infinitive ? "-": user.maxTradeDays}</li>
                                <li><b>Profit target percent:</b> {user.infinitive ? "-": user.percentDays}</li>
                            </ul>}
                        <p><b>Start:</b> {user.startTradeDay}</p>
                        <p><b>End:</b> {user.endTradeDay}</p>
                        <p className={`user-status ${user.status ? 'active-status': 'deactive-status'}`}>
                            <span><b>{user.status}</b> <BsFillCircleFill/></span>
                        </p>
                        <div className='dashobard-link'><Link to="/dashboard" onClick={()=>changeCurrentAuth(user)}>See Analyze <LineChartOutlined /></Link></div>
                    </Card>
                </Col> */}
                {
                    user.accounts.map(account=>{
                        return (
                            <Col lg={12}md={24} sm={24}>
                                <Card title={account.user_login} bordered={false}>
                                    <p><b>First Balance:</b> {account.firstBalance}</p>
                                    <p><b>Account Type:</b> {account.accountType}</p>
                                    <p><b>Platform: </b>{account.platform}</p>
                                    <p><b>Level:</b> {account.infinitive ? "Real": account.level}</p>
                                    {!account.infinitive &&<ul>
                                        <li><b>Max trade days:</b> {account.infinitive ? "-": account.maxTradeDays}</li>
                                        <li><b>Profit target percent:</b> {account.infinitive ? "-": account.percentDays}</li>
                                    </ul>}
                                    <p><b>Start:</b> {account.startTradeDay}</p>
                                    <p><b>End:</b> {account.endTradeDay}</p>
                                    <p className={`user-status ${account.status ? 'active-status': 'deactive-status'}`}>
                                        <span><b>{account.status}</b> <BsFillCircleFill/></span>
                                    </p>
                                    <div className='dashobard-link'><Link to="/dashboard" onClick={()=>changeCurrentAuth(account)}>See Analyze <LineChartOutlined /></Link></div>
                                </Card>
                            </Col>
                        )
                    })
                }
                </Row>}
        </StyledRoot>
    )
}

export default Accounts

{/* <IoMdCloseCircle className={classes.iconRed} /> */}