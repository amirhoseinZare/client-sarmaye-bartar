
// import pics and css
import "./css/style.css";
import logo from "./pics/logo.svg";
import pic404 from "./pics/404.png";
import rocket from "./pics/rocket.svg";
import earth from "./pics/earth.svg";
import moon from "./pics/moon.svg";
import astronaut from "./pics/astronaut.svg";

// import link from react router
import { Link } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div className="bg-purple">
      <div className="stars">
        <div className="custom-navbar">
          <div className="brand-logo">
            <img alt="loading img" src={logo} width="80px" />
          </div>
          <div className="navbar-links">
            <ul className="ul404">
              <li className="li404">
                <Link to="/login">ورود</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="central-body">
          <img alt="loading img" className="image-404" src={pic404} width="300px" />
          <Link className="btn-go-home" to="/">
            بازگشت
          </Link>
        </div>
        <div className="objects">
          <img alt="loading img" className="object_rocket" src={rocket} width="40px" />
          <div className="earth-moon">
            <img alt="loading img" className="object_earth" src={earth} width="100px" />
            <img alt="loading img" className="object_moon" src={moon} width="80px" />
          </div>
          <div className="box_astronaut">
            <img alt="loading img" className="object_astronaut" src={astronaut} width="140px" />
          </div>
        </div>
        <div className="glowing_stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
      </div>
    </div>
  );
};
