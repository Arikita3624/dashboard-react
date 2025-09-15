import LayoutAdmin from "@/layouts/LayoutAdmin";
import Categories from "@/pages/categories/Categories";
import Dashboard from "@/pages/Dashboard";
import Login from "@/pages/Login";
import ProductAdd from "@/pages/products/ProductAdd";
import ProductEdit from "@/pages/products/ProductEdit";
import Products from "@/pages/products/Products";
import { useAuth } from "@/contexts/AuthContext";
import { Route, Routes, Navigate } from "react-router-dom";
import Home from "@/pages/Home";
import NotFound from "@/pages/404";
import { AdminRoute, ProtectedRoute } from "@/routes/ProtectedRoutes"; // Import thêm ProtectedRoute
import Users from "@/pages/users/Users";
import UserEdit from "@/pages/users/UserEdit";

const AppRouter = () => {
  const { session } = useAuth();
  return (
    <Routes>
      {/* Trang login: nếu đã đăng nhập thì redirect về home (sẽ bị block nếu banned qua ProtectedRoute) */}
      <Route
        path="/login"
        element={session ? <Navigate to="/" replace /> : <Login />}
      />

      {/* Trang home: wrap ProtectedRoute để block nếu banned hoặc chưa login */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Các route admin chỉ cho admin (và không banned) */}
      <Route
        path="admin"
        element={
          <AdminRoute>
            <LayoutAdmin />
          </AdminRoute>
        }
      >
        {/*Dashboard */}
        <Route path="dashboard" element={<Dashboard />} />
        {/*Products */}
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<ProductAdd />} />
        <Route path="products/:id/edit" element={<ProductEdit />} />
        {/*Categories */}
        <Route path="categories" element={<Categories />} />
        {/* Users */}
        <Route path="users" element={<Users />} />
        <Route path="users/:id/edit" element={<UserEdit />} />
      </Route>

      {/* fallback: wrap ProtectedRoute để block nếu banned */}
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRouter;
