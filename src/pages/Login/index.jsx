import classes from "./style.module.scss";
import bitcoin from "../../assets/bitcoin2.png";

const Login = () => {
    return ( 
        <div className={classes.root}>
            <div className={classes["content-box"]}>
                <div className={classes["login-box"]}>
                </div>
                <div className={classes["icon-box"]}>
                    <img src={bitcoin}/>
                </div>
            </div>
        </div>
     );
}
 
export default Login;