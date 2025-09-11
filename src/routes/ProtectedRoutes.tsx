import { useAuth } from "@/contexts/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import NotFound from "@/pages/404";
import { Spin } from "antd";

export const ProtectedRoute = ({
  children,
}: {
  children: React.ReactElement;
}) => {
  const auth = useAuth();
  const location = useLocation();
  if (auth.loading)
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" tip="Loading..." />
      </div>
    );
  if (!auth.session)
    return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

export const AdminRoute = ({ children }: { children: React.ReactElement }) => {
  const auth = useAuth();
  const location = useLocation();
  if (auth.loading)
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Spin size="large" tip="Loading..." />
      </div>
    );
  if (!auth.session)
    return <Navigate to="/login" state={{ from: location }} replace />;
  if (auth.user?.role !== "admin") return <NotFound />;
  return children;
};
