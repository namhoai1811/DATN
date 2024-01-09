import { Navigate, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getInfoUser } from "../store/slice/authSlice";

export const MainLayout = () => {
  // namnh
  // const isAuthentication = !!storage.getItem("token");
  const isAuthentication = true;
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthentication) {
      dispatch(getInfoUser());
    }
  }, []);

  if (isAuthentication) {
    return <Outlet />;
  }
  return <Navigate to="/auth/login"></Navigate>;
};
