import { Col, Alert, ConfigProvider } from "antd"
import { chooseIcon } from "../../core/utils.js"
import { useSelector, useDispatch } from "react-redux";
import { setToast } from "../../redux/actions/toast.action.js";
import styled from "styled-components";

const StyledCol = styled(Col)`
    margin:0 auto;
    .ant-alert-message, 
    .ant-alert-description {
        text-align: right;
    }
`

const Toast = (props)=>{
    const dispatch = useDispatch()
    const toastState = useSelector(state => state.toast)

    const { type="success", timeout=3000, open=false, message="",  description="", closeCallback, icon=null } = toastState;
    const magicNumber = new Date().getTime()
    let timeOutId = 0

    const closeToast = ()=>{
        const closeButton = document.querySelector(`.alert-container-${magicNumber} button`)
        if(closeButton)
            closeButton.click()
    }
    const handleClose = ()=>{
        if(closeCallback)
            closeCallback()
        dispatch(setToast({
            ...toastState,
            open:false
        }))
        return
    }
    const handleAfterClose = ()=>{
        dispatch(setToast({
            ...toastState,
            open:false
        }))
        clearTimeout(timeOutId)
    }

    if(!open)
        closeToast()
    if(open){
        timeOutId = setTimeout(()=>{
            closeToast()
        }, timeout)
    }

    console.log("===========open",open, toastState)
    
    return (
        <ConfigProvider direction="ltr">
            {
                open?<StyledCol className={`alert-container-${magicNumber}`} xs={6} xl={6} lg={6} md={6} sm={6}>
                <Alert 
                    icon={chooseIcon(type) || icon}
                    showIcon={true} 
                    type={type}
                    message={message}
                    closable
                    description={description}
                    closeCallback={handleClose}
                    afterClose={handleAfterClose}
                >alert</Alert>
                </StyledCol>:null
            }
        </ConfigProvider>
        )
}

export default Toast