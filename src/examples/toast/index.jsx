import Toast from "../../comps/Toast"
import { useDispatch } from "react-redux"
import { setToast } from "../../redux/actions/toast.action.js"

const Example = ()=>{
    const dispatch = useDispatch()
    return <div>
        <button onClick={()=>dispatch(setToast({
                open:true, 
                message:'سلام', 
                description:'خوش اومدی', 
                closeCallback:()=>{
                    console.log('end')
                }
            }))
        }>show toast</button>
    </div>
}

export default Example