import styled from 'styled-components'
import { Row, Card, Col } from "antd"
import { useSelector, useDispatch } from 'react-redux'
import { BsFillCircleFill } from "react-icons/bs"
import { LineChartOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { setAuth } from '../../redux/actions/auth'

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
    .ant-row {
        justify-content:center;
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
                {
                    user.accounts.map(account=>{
                        return (
                            <Col lg={22} md={22} sm={22} xs={22}>
                                <Card title={account.metaUsername || account.user_login} bordered={false}>
                                    <p><b>First Balance:</b> {account.firstBalance}</p>
                                    <p><b>Account Type:</b> {account.accountType}</p>
                                    <p><b>Platform: </b>{account.platform}</p>
                                    <p><b>:Level</b> {account.infinitive ? "Real": account.level}</p>
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

