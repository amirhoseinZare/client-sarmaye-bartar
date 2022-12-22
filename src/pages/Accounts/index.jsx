import styled from 'styled-components'
import { Row, Card, Col, Spin } from "antd"
import { useSelector, useDispatch } from 'react-redux'
import { LineChartOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"
import { setAuth } from '../../redux/actions/auth'
import { setAnalyze } from '../../redux/actions/analyze'
import { useEffect, useState } from 'react'
import { AuthApi } from "../../api";
import { USER_ID_KEY } from '../../core/variables.core';

const StyledRoot = styled.div`
    h2 {
        color: rgba(245, 245, 245, 1);    
    }
    p {
        direction:ltr;
    }
    background: rgb(11, 14, 19);

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
    .account-deactive {
        .ant-card-head {
            background-color: rgba(254, 68, 68, 1) !important;
        }
    }
    .ant-card-body {
    }
    .ant-card {
        .ant-card-head {
            display:flex;
            direction: ltr;
            background: rgba(68, 179, 254, 1);
            height: 104px;
            .ant-card-head-title {
                font-size: 22px;
            }
        }
        .ant-card-body {
            background: rgba(16, 20, 27, 1);
            color: rgba(245, 245, 245, 1);  
            height:337.5px;  
        }
        
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
            }
        }
    }
    .ant-row {
        justify-content:center;
        padding-top:40px;
    }
    @media (max-width:1250px) {
        .ant-row {
            row-gap: 0px;
            margin-left: 0 !important;
            margin-right: 0 !important;
        }
    }
`

const Accounts = ()=>{
    const [loading, setLoading] = useState(false)
    const user = useSelector(store=>store.user)
    const dispatch = useDispatch()

    const changeCurrentAuth = (newUser)=>{
        dispatch(setAnalyze({...newUser}))
    }

    const getOddAccountColCell = (length, index) => length % 2 === 0 && (index==0 || index===length-1)  ? {lg:11, md:11, sm:22, xs:22} : {lg:22, md:22, sm:22, xs:22}

    useEffect(()=>{
        console.log({user})
        if(user.role === "user"){
            setLoading(true)
            AuthApi.validateToken()
                .then((response) => {
                    const result = response.result
                    const { accounts=[], ...userData} = response.result
                    result.accounts = accounts
                    // console.log(result.accounts.find(item=>item._id.toString() === userData._id.toString()))
                    if(!result.accounts.find(item=>item._id.toString() === userData._id.toString()))
                    result.accounts.unshift(userData)
                    console.log("result.accounts :", result.accounts)
                    dispatch(setAnalyze(result.accounts && Array.isArray(result.accounts) && result.accounts.length>0 ? result.accounts[result.accounts.length-1]:userData ));
                    dispatch(setAuth(response.result));
                })
                .finally(()=>{
                    setLoading(false)
                })
        }
        else {
            AuthApi.getTraderProfile(localStorage.getItem(USER_ID_KEY))
                .then((response) => {
                    const result = response.result
                    const { accounts=[], ...userData} = response.result
                    result.accounts = accounts
                    // console.log(result.accounts.find(item=>item._id.toString() === userData._id.toString()))
                    if(!result.accounts.find(item=>item._id.toString() === userData._id.toString()))
                    result.accounts.unshift(userData)
                    console.log("result.accounts :", result.accounts)
                    dispatch(setAnalyze(result.accounts && Array.isArray(result.accounts) && result.accounts.length>0 ? result.accounts[result.accounts.length-1]:userData ));
                    dispatch(setAuth({...response.result, role:'admin'}));
                })
                .finally(()=>{
                    setLoading(false)
                })
        }
       
    }, [])

    return (
        <StyledRoot >
             {user.isAuth && <Row gutter={16}>
                {
                    user.accounts.map((account, index)=>{

                        return (
                            <>
                                {loading ? <Spin/> : (
                                     <Col {...{lg:22, md:22, sm:22, xs:22}}>
                                        <Card title={`First Balance: $${account.firstBalance.toLocaleString()}`} bordered={false} className={`account-${account.status}`}>
                                            <h2>{account.display_name}</h2>
                                            <p><b>Meta username:</b> {account.metaUsername || "-"}</p>
                                            <p><b>Account Type:</b> {account.accountType}</p>
                                            <p><b>Platform: </b>{account.platform}</p>
                                            <p><b>Level:</b> {account.infinitive ? "Real": account.level}</p>
                                            {/* {!account.infinitive &&<ul>
                                                <li><b>Max trade days:</b> {account.infinitive ? "-": account.maxTradeDays}</li>
                                                <li><b>Profit target percent:</b> {account.infinitive ? "-": account.percentDays}</li>
                                            </ul>} */}
                                            <p><b>Start:</b> {account.startTradeDay}</p>
                                            <p><b>End:</b> {account.endTradeDay}</p>
                                            {/* <p className={`user-status ${account.status ? 'active-status': 'deactive-status'}`}>
                                                <span><b>{account.status}</b> <BsFillCircleFill/></span>
                                            </p> */}
                                            {/* {account.status=="active" ? 
                                                ( */}
                                            <div className='dashobard-link'>
                                                <Link to="/dashboard" onClick={()=>changeCurrentAuth(account)}>See Analyze <LineChartOutlined /></Link>
                                            </div>
                                                {/* ) 
                                                : null
                                            } */}
                                        </Card>
                                    </Col>
                                )}
                               
                            </>
                            
                        )
                    })
                }
                </Row>}
        </StyledRoot>
    )
}

export default Accounts

