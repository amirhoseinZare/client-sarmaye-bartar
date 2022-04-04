import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";
import variables from "../../config/variables";

export const PrivateRoute = (props) => {
  const user = useSelector((state) => state.user);
  const userRole = user.role;
  if (userRole !== null) {
    if (userRole) {
      if (!user) {
        if (localStorage.getItem(variables.TOKEN_LOCAL_KEY))
          return (window.location.href = variables.WEBSITE_LINK);
        return (window.location.href = variables.WEBSITE_LINK);
      }
      const { roles, path, element } = props;

      if (roles.includes(userRole))
        return <Route path={path} element={element} />;
      return <Redirect to={variables.NOT_FOUND_LINK} />;
    } else if (userRole === false) {
      return <Redirect to={variables.NOT_FOUND_LINK} />;
    }
  } else {
    return <div></div>;
  }
};

export default PrivateRoute