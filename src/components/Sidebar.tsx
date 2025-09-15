import {
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, Layout } from "antd";

const { Sider } = Layout;

type SidebarProps = {
  collapsed: boolean;
};

const Sidebar = ({ collapsed }: SidebarProps) => {
  const getMenuKey = (pathname: string) => {
    if (pathname.startsWith("/admin/products")) return "/admin/products";
    if (pathname.startsWith("/admin/categories")) return "/admin/categories";
    if (pathname.startsWith("/admin/users")) return "/admin/users";
    return "/admin/dashboard";
  };
  const location = useLocation();
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div
        style={{
          height: 40,
          margin: 10,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "flex-start",
          gap: 8,
          padding: collapsed ? 0 : "0 8px",
          borderRadius: 12,
          background: "rgba(255,255,255,0.12)",
          color: "#fff",
          fontWeight: 700,
          fontSize: collapsed ? 16 : 18,
          whiteSpace: "nowrap",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 8,
            background: "rgba(255,255,255,0.35)",
            flex: "0 0 auto",
          }}
        />
        {!collapsed && <span>Admin Panel</span>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[getMenuKey(location.pathname)]}
        items={[
          {
            key: "/admin/dashboard",
            icon: <DashboardOutlined />,
            label: <NavLink to="/admin/dashboard">Dashboard</NavLink>,
          },
          {
            key: "/admin/products",
            icon: <ShoppingCartOutlined />,
            label: <NavLink to="/admin/products">Products</NavLink>,
          },
          {
            key: "/admin/categories",
            icon: <AppstoreOutlined />,
            label: <NavLink to="/admin/categories">Categories</NavLink>,
          },
          {
            key: "/admin/users",
            icon: <UserOutlined />,
            label: <NavLink to="/admin/users">Users</NavLink>,
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
