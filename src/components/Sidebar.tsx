import {
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
} from "@ant-design/icons";
import { NavLink, useLocation } from "react-router-dom";
import { Menu, Layout } from "antd";

const { Sider } = Layout;

type SidebarProps = {
  collapsed: boolean;
};

const Sidebar = ({ collapsed }: SidebarProps) => {
  const location = useLocation();
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="demo-logo-vertical" />
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={[location.pathname]}
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
        ]}
      />
    </Sider>
  );
};

export default Sidebar;
