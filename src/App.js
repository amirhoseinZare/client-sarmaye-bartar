import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/index";
import Users from "./pages/Users/index"
import { Route, Routes } from "react-router-dom";
import { Spinner } from "./comps/index";
import { useSelector } from "react-redux";

function App() {
  const loading = useSelector((store) => store.loading.status);
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users/>}/>
      </Routes>
      {loading && <Spinner />}
    </div>
  );
}

export default App;
