import { Navigate } from "react-router-dom";

interface IProtectedRoute {
  children: JSX.Element;
}

export default function ProtectedRoute({ children }: IProtectedRoute) {
  const expired = localStorage.getItem("exp");
  const currDate = new Date().getTime();
  if (Number(expired) * 1000 - currDate < 0) {
    localStorage.clear();
  }
  const authorization = localStorage.getItem("token");

  if (authorization) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login" />;
  }
}
