import DatePicker from "react-datepicker2";
import styled from "styled-components";
import theme from "../../config/theme"

const StyledDiv = styled.div`
    position:relative;
    .datepicker-label {
        position:absolute;
        top:-15px;
        text-align:right;
        ${'' /* right:18px; */}
        direction:rtl;
        width:175px;
        font-size:13px;
        span {
            background-color: #fff;
            padding: 6px 3px;
        }
    }

    .datepicker-helpertext {
        direction:rtl;
        display: ${props=> props.error?"block":"none"};
        color: ${props=>theme.colors.danger};
        width: 140px;
    }
`

const StyledDatepicker  = styled(DatePicker)`
    border: 1px solid #ccc;
    direction: rtl;
    padding:4px 8px;
    &:focus {
        border-color: ${props=>theme.colors.primary};
    }
    .ignore--click--outside {
        border: 1px solid #ccc;
        outline: none;
    }
`

const Datepicker = (props)=>{
    const { onChange, showTodayButton=true, error, helperText, label, id, placeholder, name, value=null, ...otherProps } = props;
    const handleChange = (value)=>{
        onChange(name, value)
    }
    return <StyledDiv error={error}>
        {label&&<label className="datepicker-label" htmlFor={id}><span>{label}</span></label>}
        <StyledDatepicker
            id={id}
            onChange={handleChange}
            showTodayButton={showTodayButton}
            isGregorian={false}
            timePicker={false}
            placeholder={placeholder}
            value={value}
            {...otherProps}
        />
        <p className="datepicker-helpertext">{helperText}</p>
    </StyledDiv >
}

export default Datepicker;