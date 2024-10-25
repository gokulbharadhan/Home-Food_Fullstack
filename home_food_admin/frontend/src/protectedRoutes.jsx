import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import ApplicationStore from "./utils/localStorageUtil";


const ProtectedRoutes = () => {
    const userToken = ApplicationStore().getStorage('token');
    const userRole = ApplicationStore().getStorage('userRole');
    return userToken ? <Outlet /> : <Navigate replace to="/CustHome" />;
}

export default ProtectedRoutes;