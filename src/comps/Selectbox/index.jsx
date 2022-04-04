import styled from "styled-components"
import theme from "../../config/theme"
import { Select } from 'antd';
const { Option } = Select;

const StyledDiv = styled.div`
    min-width:140px;
    position:relative;
    .selectbox-helpertext {
        direction:rtl;
        display: ${props=> props.error?"block":"none"};
        color: ${props=>theme.colors.danger};
        width: 140px;
    }
    .selectbox-label {
        width: 140px;
        position:absolute;
        z-index: 9999;
        text-align: right;
        top:-15px;
        font-size:13px;
        span {
            background-color:#fff;
            padding: 6px 3px;
        }
    }
`

const StyledSelect = styled(Select)`
    min-width:140px;
    border: 1px solid #eee;
    border-color:${props=>props.error?theme.colors.danger:"#eee"} !important;
`

const Selectbox = (props)=>{
    const { options, onChange, value="", error, label, name, id, helperText, ...otherProps } = props
    const handleChange = (value)=>{
        onChange(name, value)
    }
    return (<StyledDiv error={error}>
        {label&&<label htmlFor={id} className="selectbox-label"><span>{label}</span></label>}
        <StyledSelect defaultValue={value} onChange={handleChange} error={error} id={id} {...otherProps}>
            {options.map((option, index)=>(
                    <Option 
                        key={option.value} 
                        value={option.value} 
                        disabled={option.disabled || false}
                    >{option.text}</Option>
                )
            )}
        </StyledSelect>
        <p className="selectbox-helpertext">{helperText}</p>
    </StyledDiv>)
}

export default Selectbox;

/*


*/