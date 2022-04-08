import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { TOKEN_LOCAL_KEY } from "../core/variables.core"

const PrivateRoute = ({ children, roles=[] }) => {
    const user = useSelector(state => state.user)
    // if(!user.isAuth)
    //     return <Navigate replace to={`/login`} />
    // if(!roles.includes(user.role))
    //     return <Navigate replace to={`/404`} />
    if(!localStorage[TOKEN_LOCAL_KEY])
        return <Navigate replace to={`/404`} />
    return children
};
export default PrivateRoute;
