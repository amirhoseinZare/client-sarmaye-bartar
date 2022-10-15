import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/index";
import Users from "./pages/Users/index";
import Requests from "./pages/Requests/index"
import Home from "./pages/Home/index"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Spinner } from "./comps/index";
import { useDispatch, useSelector } from "react-redux";
import { NotFoundPage } from "./pages/NotFoundPage/NotFound.page";
import PrivateRoute from "./comps/PrivateRoute";
import { useEffect, useState, useMemo } from "react";
import { AuthApi } from "./api";
import { setAuth } from "./redux/actions/auth";
import { setAnalyze } from "./redux/actions/analyze"
import Accounts from "./pages/Accounts"
import UserMenu from "./layouts/UserMenu"
import BottomNavigation from 'reactjs-bottom-navigation'
import './assets/css/general.scss'
import {
  UserOutlined,
  BarChartOutlined,
  ProfileOutlined,
  PieChartOutlined
} from '@ant-design/icons';
import Profile from "./pages/Profile"
import Charts from "./pages/Charts"
import { Cup as CupIcon, Category, User as UserIcon, Key as KeyIcon, StatusUp as ChartIcon } from "iconsax-react"

function App() {
 const bottomNavItems = useMemo(()=>[
    {
      title: 'dashboard',
      icon: <Category style={{ fontSize: '18px' }} />,
      activeIcon: <Category style={{ fontSize: '18px', color: '#fff' }} />,
      link: '/dashboard'
    },
    {
      title: 'profile',
      icon: <UserIcon style={{ fontSize: '18px' }} />,
      activeIcon: <UserIcon style={{ fontSize: '18px', color: '#fff' }} />,
      link: '/profile'
    },
    {
      title: 'accounts',
      icon: <KeyIcon style={{ fontSize: '18px' }} />,
      activeIcon: <KeyIcon style={{ fontSize: '18px', color: '#fff' }} />,
      link: '/accounts'
    },
    {
      title: 'charts',
      icon: <ChartIcon style={{ fontSize: '18px' }} />,
      activeIcon: <ChartIcon style={{ fontSize: '18px', color: '#fff' }} />,
      link: '/charts'
    },
    {
      title: 'Top',
      icon: <CupIcon style={{ fontSize: '18px' }} />,
      activeIcon: <CupIcon style={{ fontSize: '18px', color: '#fff' }} />,
      link: '/'
    }
  ], [])
  const navigate = useNavigate()
  const { pathname } = useLocation();
  const loading = useSelector((store) => store.loading.status);

  const user = useSelector((store) => store.user);
  const userState = useSelector((state)=> state.user)
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);
  console.log(user, userData)
  useEffect(() => {
    if ((!["/404", "/login", "/"].includes(pathname))) {
      AuthApi.validateToken().then((response) => {
        const result = response.result
        const { accounts=[], ...userData} = response.result
        result.accounts = accounts
        console.log(result.accounts.find(item=>item._id.toString() === userData._id.toString()))
        if(!result.accounts.find(item=>item._id.toString() === userData._id.toString()))
          result.accounts.unshift(userData)
        dispatch(setAnalyze(result.accounts && Array.isArray(result.accounts) && result.accounts.length>0 ? result.accounts[result.accounts.length-1]:userData ));
        dispatch(setAuth(response.result));
        setUserData(response.result);
      });
    }
  }, []);

  return (
    <div className="App">
      {
        pathname==="/404" || (!user.isAuth) ? null :
        <BottomNavigation
          items={bottomNavItems}
          defaultSelected={0}
          onItemClick={(item) => navigate(item.link)}
        />
      }
      <Routes>

        <Route
          path="/"
          element={
            <Home/>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute roles={["user"]}>
              <UserMenu>
                <Profile />
              </UserMenu>
            </PrivateRoute>
          }
        />

      <Route
          path="/charts"
          element={
            <PrivateRoute roles={["user"]}>
              <UserMenu>
                <Charts />
              </UserMenu>
            </PrivateRoute>
          }
        />

        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={["admin", "user"]}>
              <UserMenu>
                <Dashboard />
              </UserMenu>
            </PrivateRoute>
          }
        />

        <Route
          path="/users"
          element={
            <PrivateRoute roles={["admin"]}>
              <Users/>
            </PrivateRoute>
          }
        />

        <Route 
          path="/requests" 
          element={
            <PrivateRoute roles={["admin"]}>
              <Requests />
            </PrivateRoute>
          } 
        />

        <Route
          path="/accounts"
          element={
            <PrivateRoute roles={["user"]}>
              <UserMenu>
                <Accounts />
              </UserMenu>
            </PrivateRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
        
      </Routes>
      {loading && <Spinner />}
    </div>
  );
}

export default App;
