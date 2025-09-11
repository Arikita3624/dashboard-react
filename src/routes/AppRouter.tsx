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
import { AdminRoute } from "@/routes/ProtectedRoutes";

const AppRouter = () => {
  const { session } = useAuth();
  return (
    <Routes>
      {/* Trang login: nếu đã đăng nhập thì redirect về home */}
      <Route
        path="/login"
        element={session ? <Navigate to="/" replace /> : <Login />}
      />

      {/* Trang home: ai cũng truy cập được */}
      <Route path="/" element={<Home />} />

      {/* Các route admin chỉ cho admin */}
      <Route
        path="admin"
        element={
          <AdminRoute>
            <LayoutAdmin />
          </AdminRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<ProductAdd />} />
        <Route path="products/:id/edit" element={<ProductEdit />} />
        <Route path="categories" element={<Categories />} />
      </Route>

      {/* fallback: nếu không khớp route nào thì hiện trang 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRouter;
