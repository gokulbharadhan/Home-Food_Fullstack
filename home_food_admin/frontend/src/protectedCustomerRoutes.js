import { Outlet, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";
import ApplicationStore from "./utils/localStorageUtil";



    const ProtectedCustomerRoutes = () => {
        const userToken = ApplicationStore().getStorage('token');
        const userRole = ApplicationStore().getStorage('userRole');
        
    
        // Allowed user types
        const allowedUserTypes = ["cheff", "user"];
    
        // Check if the user has an allowed user type
        const isAllowedUserType = allowedUserTypes.includes(userRole);
    
        return userToken && isAllowedUserType ? <Outlet /> : <Navigate replace to="/CustHome" />;
    }
export default ProtectedCustomerRoutes;