import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/index";
import Users from "./pages/Users/index"
import { Route, Routes } from "react-router-dom";
import { Spinner } from "./comps/index";
import { useSelector } from "react-redux";
import { NotFoundPage } from "./pages/NotFoundPage/NotFound.page";
import PrivateRoute from "./comps/PrivateRoute";

function App() {
  const loading = useSelector((store) => store.loading.status);
  return (
    <div className="App">
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute rols={["admin", "user"]}>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route 
          path="/users" 
          element={
            <PrivateRoute rols={["admin"]}>
              <Users/>
            </PrivateRoute>
          }
        />

        <Route 
          path="*" 
          element={
            <NotFoundPage />
          } 
        />

      </Routes>
      {loading && <Spinner />}
    </div>
  );
}

export default App;
