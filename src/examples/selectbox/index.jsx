import styled from "styled-components"
import { Col } from "antd"
import Selectbox from "../../comps/Selectbox"

const StyledCol = styled(Col)`
    margin-top:40px;
`

const Example = ()=>{
    const options = [
        {
            text:"لطفا انتخاب کنید",
            value:""
        },
        {
            text:"تهران",
            value:1
        },
        {
            text:"کرج",
            value:2
        },
    ]
    /* 
    {
        name:
        familyNAmee city
    }
    */
    const handleChange = (name ,value)=> {
        console.log(`${name}:${value}`);
    }
    return (<StyledCol xs={6} md={6} xl={6} lg={6}>
        <Selectbox onChange={handleChange} options={options} label="شهر" name="city" id="city" value={""}/>
        <Selectbox onChange={handleChange} options={options} error={true} helperText={"این فیلد اجباری است."}/>
    </StyledCol>)
}

export default Example