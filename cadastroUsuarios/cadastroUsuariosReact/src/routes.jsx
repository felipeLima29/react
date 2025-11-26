import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Insert from "./pages/Insert";
import UpdateUser from './pages/Update'
import Select from "./pages/Select";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AppRoutes() {
       return (
              <div>
                     <ToastContainer />
                     <Routes>

                            <Route path="/"
                                   element={<Home />} />
                            <Route path="/insert"
                                   element={<Insert />} />
                            <Route path="/update"
                                   element={<UpdateUser />} />
                            <Route path="/select"
                                   element={<Select />} />

                     </Routes>
              </div>
       );
}
