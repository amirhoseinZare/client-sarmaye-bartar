import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/index";
import Users from "./pages/Users/index";
import { Route, Routes, useLocation } from "react-router-dom";
import { Spinner } from "./comps/index";
import { useDispatch, useSelector } from "react-redux";
import { NotFoundPage } from "./pages/NotFoundPage/NotFound.page";
import PrivateRoute from "./comps/PrivateRoute";
import { useEffect, useState } from "react";
import { AuthApi } from "./api";
import { setAuth } from "./redux/actions/auth";
import openSocket from 'socket.io-client';
import { setAlert } from "./redux/actions/alert"

// const socket = openSocket('http://localhost:3000');
const socket = openSocket("https://cron-dashboard.iran.liara.run/" )

function App() {
  const { pathname } = useLocation();
  const loading = useSelector((store) => store.loading.status);

  const user = useSelector((store) => store.nuser);
  const userState = useSelector((state)=> state.user)
  const dispatch = useDispatch();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userData !== user && (!["/404", "/login"].includes(pathname))) {
      AuthApi.validateToken().then((response) => {
        console.log(response)
        dispatch(setAuth(response.result));
        setUserData(response.result);
      });
    }
  }, []);

  console.log(userState, user)
  socket.on("alert", (data)=>{
    const pushData = JSON.parse(atob(data))
    if(userState){
      if(userState._id.toString() === pushData.userId.toString() || userState.role==="admin"){
        dispatch(setAlert(pushData))
        console.log('added', pushData.userId, userState._id)
      }
    }
  })

  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute roles={["admin", "user"]}>
              <Dashboard />
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

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {loading && <Spinner />}
    </div>
  );
}

export default App;
