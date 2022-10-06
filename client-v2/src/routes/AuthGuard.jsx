import { Navigate, Outlet } from "react-router-dom";
import useLogin from "../hooks/useLogin";

const AuthGuard = () => {
  const jwt = window.sessionStorage.getItem("@AnZr1SmZp2CvPa3-ToKnN_@CDRF");
  return !jwt ? <Navigate replace to="/" /> : <Outlet />;
};

export default AuthGuard;
