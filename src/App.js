import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/index";
import { Route, Routes } from "react-router-dom";
import { Spinner } from "./comps/index";
import { useSelector } from "react-redux";
import { NotFoundPage } from "./pages/NotFoundPage/NotFound.page";

function App() {
  const loading = useSelector((store) => store.loading.status);
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {loading && <Spinner />}
    </div>
  );
}

export default App;
