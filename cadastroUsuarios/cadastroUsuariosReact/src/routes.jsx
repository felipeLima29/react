import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Insert from "./pages/Insert";
import UpdateUser from './pages/Update'
import Select from "./pages/Select";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import UserHome from "./pages/UserHome";
import ForgetPassword from "./pages/ForgetPassword";
import ResetPassword from "./pages/resetPassword";
import ConfirmCod from "./pages/ConfirmCod";

// Arquivo de rotas de pages.

export default function AppRoutes() {
       return (
              <div>
                     <ToastContainer />
                     <Routes>

                            <Route path="/"
                                   element={<Login />} 
                            />
                            <Route path="/home"
                                   element={<Home />} 
                            />
                            <Route path="/userHome"
                                   element={<UserHome />} 
                            />
                            <Route path="/insert"
                                   element={<Insert />} 
                            />
                            <Route path="/update"
                                   element={<UpdateUser />} 
                            />
                            <Route path="/select"
                                   element={<Select />}
                            />
                            <Route path="/forgetPassword"
                                   element={<ForgetPassword />}
                            />
                            <Route path="/confirmCod"
                                   element={<ConfirmCod />}
                            />
                            <Route path="/resetPassword"
                                   element={<ResetPassword />}
                            />

                     </Routes>
              </div>
       );
}