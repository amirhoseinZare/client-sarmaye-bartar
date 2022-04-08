import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children, roles=[] }) => {
    const user = useSelector(state => state.user)
    console.log(!user.isAuth, !roles.includes(user.role), roles, user)
    if(!user.isAuth)
        return <Navigate replace to={`/login`} />
    if(!roles.includes(user.role))
        return <Navigate replace to={`/404`} />
    return children
};
export default PrivateRoute;
