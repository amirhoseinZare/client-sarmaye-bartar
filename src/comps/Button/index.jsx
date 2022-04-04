import { Button } from "antd"
import styled from "styled-components";
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete, AiOutlineFilter } from "react-icons/ai"
import { ConfigProvider } from 'antd';
import { chooseIcon } from "../../core/utils.js"

/* I picked color from here 
    https://materialui.co/colors/
    primary
    warning
    success
    danger
*/

const setBackgroundColor = (color)=>{
    switch(color) {
        case "primary":
            return "#03A9F4";
        case "warning":
            return "#FFEB3B";
        case "success":
            return "#4CAF50";
        case "danger":
            return "#F44336";
        case "dark":
            return "#607D8B";
        case "light":
            return "#EEEEEE";
        default :
            return "#03A9F4";
    }
}

const setBackgroundHoverFocusColor = (color)=>{
    switch(color) {
        case "primary":
            return "#1E88E5";
        case "warning":
            return "#FDD835";
        case "success":
            return "#388E3C";
        case "danger":
            return "#D32F2F";
        case "dark":
            return "#9E9E9E";
        case "light":
            return "#BDBDBD";
        default :
            return "#03A9F4";
    }
}

const setColor = (color)=>{
    switch(color) {
        case "primary":
            return "#FFF";
        case "warning":
            return "#000";
        case "success":
            return "#FFF";
        case "danger":
            return "#FFF"
        case "dark":
            return "#FFF";
        case "light":
            return "#000";
        default :
            return "#FFF";
    }
}

const setHoverFocusColor = (color)=>{
    switch(color) {
        case "primary":
            return "#FFF";
        case "warning":
            return "#000";
        case "success":
            return "#FFF";
        case "danger":
            return "#FFF";
        case "dark":
            return "#FFF";
        case "light":
            return "#FFF";
        default :
            return "#FFF";
    }
}

const setBorderColor = (color)=>{
    switch(color) {
        case "primary":
            return "#1E88E5";
        case "warning":
            return "#FDD835";
        case "success":
            return "#43A047";
        case "danger":
            return "#E53935";
        case "dark":
            return "#546E7A";
        case "light":
            return "#BDBDBD";
        default :
            return "#1E88E5";
    }
}

const chooseButtonIcon = chooseIcon

const CustomStyledButton = styled(Button)`
    background-color: ${props=>setBackgroundColor(props.color)};
    color:${props=>setColor(props.color)};
    border-color: ${props=>setBorderColor(props.color)};

    &:focus {
        background-color: ${props=>setBackgroundHoverFocusColor(props.color)};
        color:${props=>setHoverFocusColor(props.color)};
        border-color: ${props=>setBorderColor(props.color)};
    }

    &:hover {
        background-color: ${props=>setBackgroundHoverFocusColor(props.color)};
        color:${props=>setHoverFocusColor(props.color)};
        border-color: ${props=>setBorderColor(props.color)};
    }

    svg {
        vertical-align: middle;
        margin-right: 10px;
    }
`

const CustomButton = (props)=>{
    const { icon=null, color, loading=false, type="primary", shape, size, disabled=false, children=null, ...otherProps } = props
    return (<ConfigProvider direction="ltr">
        <CustomStyledButton 
            type={type} 
            shape={shape} 
            size={size} 
            icon={chooseButtonIcon(icon)} 
            color={color}
            loading={loading}  
            disabled={disabled}
            {...otherProps} 
        >
            {children}
        </CustomStyledButton>
    </ConfigProvider>)
}

export default CustomButton