import { Route, Routes } from "react-router-dom";
import Login from "../components/Login/Login";
import Register from "../components/Register/Register";
import User from "../components/ManageUser/User";
import PrivateRoutes from "./PrivateRoutes";

function AppRoutes(props) {
    return (
        <>
            <Routes>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/register' element={<Register />}></Route>
            </Routes>
            <PrivateRoutes path='/users' component={User} />
            <PrivateRoutes path='/project' element={User}></PrivateRoutes>
        </>
    );
}

export default AppRoutes;