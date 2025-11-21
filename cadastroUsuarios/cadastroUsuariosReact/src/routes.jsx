import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Insert from "./pages/Insert";
import UpdateUser from './pages/Update'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/insert" element={<Insert />} />
      <Route path="/update" element={<UpdateUser />} />
    </Routes>
  );
}
