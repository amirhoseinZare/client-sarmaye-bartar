import Button from "../../comps/Button"
import { AiOutlinePlus } from "react-icons/ai"

export default function ButtonExample(){
    return (<>
        <Button color="primary" onClick={()=>console.log('hello')}>
            primary
        </Button>
        <Button color="warning">
            warning
        </Button>
        <Button color="success">
            success
        </Button>
        <Button color="danger">
            danger
        </Button>
        <Button color="dark">
            dark
        </Button>
        <Button color="light">
            light
        </Button>
        <br/>
        <Button color="primary" loading={true}>
            primary
        </Button>
        <Button color="warning" loading={true}>
            warning
        </Button>
        <Button color="success" loading={true}>
            success
        </Button>
        <Button color="danger" loading={true}>
            success
        </Button>
        <br/>
        <Button color="primary" icon={"add"}>
            primary
        </Button>
        <Button color="warning" icon={"edit"}>
            warning
        </Button>
        <Button color="success" icon={"delete"}>
            success
        </Button>
        <Button color="primary" icon={"filter"}>
            success
        </Button>
        <Button color="danger"  icon={<AiOutlinePlus/>}>
            success
        </Button>
        {/* with both loading and icon */}
        <Button color="danger"  icon={<AiOutlinePlus/>} loading={true}> 
            success
        </Button>
        <Button color="warning" icon={null}>
            warning
        </Button>
    </>)
}