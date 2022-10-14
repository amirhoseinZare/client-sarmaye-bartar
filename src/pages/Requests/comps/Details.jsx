import { Spin, message } from "antd"
import { useEffect, useState } from "react"
import { UsersApi } from "../../../api/index"
import styled from "styled-components"

const StyledRoot = styled.div`
    display:flex;
    flex-direction:column;
    direction:ltr;
    min-height:324px;
`

const Details = (props)=>{

    const [state, setState] = useState({
        loading:false,
        data:null
    })

    const getUserDetail = async ()=>{
        setState(s=>({...s, loading:true}))
        const call = await UsersApi.getOne(props.data.userId)
        if(!call.success){
            message.error(call.message)
            return 
        }
        setState({data:call.result, loading:false})
    }

    useEffect(()=>{
        getUserDetail()
    }, [props.data])


    return (
        <StyledRoot>
            {
                state.loading || (!state?.data) ? 
                    <Spin /> : (
                        <>
                            <p>Level: <b>{state?.data?.level || "unkown"}</b></p>
                            <p>Meta Username: <b>{state?.data?.metaUsername}</b></p>
                            <p>First Balance: <b>{state?.data?.firstBalance}</b></p>
                            <p>Day Balance: <b>{state?.data?.dayBalance || "updating"}</b></p>
                            <p>Max Trade Days: <b>{state?.data?.maxTradeDays}</b></p>
                            <p>status: <b>{state?.data?.status}</b></p>
                            <p>platform: <b>{state?.data?.platform}</b></p>
                            <p>status: <b>{state?.data?.status}</b></p>
                            <p>accountType: <b>{state?.data?.accountType}</b></p>
                        </>
                    )
            }
        </StyledRoot>
    )
}

export default Details
