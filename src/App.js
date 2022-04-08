import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard/index";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" />
      </Routes>
    </div>
  );
}

export default App;
