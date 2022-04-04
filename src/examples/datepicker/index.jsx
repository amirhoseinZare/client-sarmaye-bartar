import styled from "styled-components"
import Datepicker from "../../comps/DatePicker"
import { Col } from "antd"

const StyledCol = styled(Col)`
    margin-top:400px;
    margin-bottom:400px;
`

const Example = ()=>{
    const onChange = (value)=>{
        console.log(value)
    }
    return (
        <>
            <StyledCol xs={8} sm={8} lg={8} xl={8}>
                <Datepicker 
                    id="date"
                    onChange={onChange}
                    showTodayButton={true}
                    label="تاریخ تولد"
                    placeholder="لطفا انتخاب کنید"
                    // value={value}
                />
            </StyledCol>
            <StyledCol xs={8} sm={8} lg={8} xl={8}>
                <Datepicker 
                    id="date"
                    onChange={onChange}
                    showTodayButton={true}
                    label="تاریخ تولد"
                    placeholder="لطفا انتخاب کنید"
                    // value={value}
                    error={true}
                    helperText={"پر شود"}
                />
            </StyledCol>

        </>
    )
}

export default Example