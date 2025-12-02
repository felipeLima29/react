import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Insert from "./pages/Insert";
import UpdateUser from './pages/Update'
import Select from "./pages/Select";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";

export default function AppRoutes() {
       return (
              <div>
                     <ToastContainer />
                     <Routes>

                            <Route path="/"
                                   element={<Login />} />
                            <Route path="/home"
                                   element={<Home />} />
                            <Route path="/userHome"
                                   element={<UserHome />}/>
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
