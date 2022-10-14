import { useSelector, useDispatch } from "react-redux"
import { setAuth } from '../../redux/actions/auth'

const Charts = ()=>{
    const user = useSelector(store=>store.user)
    const dispatch = useDispatch()

    const changeCurrentAuth = (newUser)=>{
        dispatch(setAuth({...newUser, accounts:user.accounts }))
    }
    return <p 
        style={{
            textAlign: 'center',
            direction: 'rtl',
        }}
    >...Coming soon</p>
}

export default Charts