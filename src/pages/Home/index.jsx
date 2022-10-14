import Ranking from "../../comps/Ranking/Ranking";
import { Row, Col } from "antd"
import newLogo from "../../assets/new-logo.jfif"
import { ReactComponent as LogoSvg  } from "../../assets/logo.svg"
import { Link } from "react-router-dom";

const Home = ()=>{
    return <Row style={{
        display:'flex',
        justifyContent: 'center',
        paddingTop: '71px',
        background:'#3B4859',
        height:'100vh',
    }}>
        <Col xs={23} sm={23} md={20} lg={20} xl={20} style={{}}>
            <Link to="/login" style={{color:"#fff", textDecoration:"underline"}}>ورود به پنل کاربری</Link>
        </Col>
        <Col xs={23} sm={23} md={20} lg={20} xl={20} style={{
                display:'flex',
                justifyContent: 'center',
                marginBottom:'32px'
            }}>
            <LogoSvg />
        </Col>
        <Col xs={23} sm={23} md={20} lg={20} xl={20}>
            <Ranking />
        </Col>
    </Row>
}

export default Home