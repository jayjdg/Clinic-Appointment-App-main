import { Navigate, Outlet } from "react-router-dom";
import AuthService from "../Services/AuthService";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
    const isAuthenticated = AuthService.isAuthenticated();
    const userRole = AuthService.getRole();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(userRole || "")) {
        return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
