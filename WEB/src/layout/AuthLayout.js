import { Outlet, Navigate } from "react-router-dom";
import { storage } from "../service/storage";

export const AuthLayout = () => {
    // namnh
    // const isAuthentication = !!storage.getItem("token");
    const isAuthentication = true;
    // if (!isAuthentication) {
    //     return <Outlet />;
    // }
    return <Navigate to="/home"></Navigate>;
};
