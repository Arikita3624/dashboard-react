import { useNavigate } from "react-router-dom";
import { supabase } from "@/services/supabase";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  Avatar,
  Button,
  Typography,
  Space,
  message,
  Skeleton,
} from "antd";
import {
  UserOutlined,
  CrownFilled,
  LogoutOutlined,
  DashboardOutlined,
} from "@ant-design/icons";

const Home = () => {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const fullName = user?.full_name;
  const avatarUrl = user?.avatar_url;

  const handleLogout = async () => {
    await supabase.auth.signOut();
    message.success("Logout successfully");
    navigate("/login");
  };

  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #e0e7ff 0%, #f0e1ff 100%)",
        }}
      >
        <Card
          style={{
            width: 380,
            textAlign: "center",
            boxShadow: "0 4px 24px #0001",
          }}
        >
          <Skeleton.Avatar
            active
            size={80}
            style={{ margin: "0 auto", display: "block" }}
          />
          <Skeleton active paragraph={{ rows: 2 }} title={{ width: "60%" }} />
        </Card>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e0e7ff 0%, #f0e1ff 100%)",
      }}
    >
      <Card
        style={{
          width: 380,
          textAlign: "center",
          boxShadow: "0 4px 24px #0001",
        }}
      >
        <Space direction="vertical" size="large" style={{ width: "100%" }}>
          {user ? (
            <>
              <Avatar
                size={80}
                src={avatarUrl}
                icon={!avatarUrl ? <UserOutlined /> : undefined}
                style={{
                  background: user?.role === "admin" ? "#1890ff" : "#b37feb",
                }}
              />
              <Typography.Title level={2} style={{ marginBottom: 0 }}>
                {fullName ? fullName : "Welcome"}{" "}
                {user?.role === "admin" ? (
                  <span>
                    <CrownFilled style={{ color: "#faad14" }} />
                  </span>
                ) : null}
              </Typography.Title>
              <Typography.Text type="secondary">
                {user?.email && <span>{user.email}</span>}
              </Typography.Text>
              <Typography.Paragraph style={{ margin: 0 }}>
                {user?.role === "admin"
                  ? "You are logged in as an admin. You can manage the site."
                  : "You have successfully logged in. If you need admin rights, please contact the administrator."}
              </Typography.Paragraph>
              {user?.role === "admin" && (
                <Button
                  type="primary"
                  icon={<DashboardOutlined />}
                  size="large"
                  style={{ width: "100%" }}
                  onClick={() => navigate("/admin/dashboard")}
                >
                  Go to Admin Dashboard
                </Button>
              )}
              <Button
                danger
                icon={<LogoutOutlined />}
                size="large"
                style={{ width: "100%" }}
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Avatar
                size={80}
                icon={<UserOutlined />}
                style={{ background: "#b37feb" }}
              />
              <Typography.Title level={2} style={{ marginBottom: 0 }}>
                Welcome
              </Typography.Title>
              <Typography.Paragraph style={{ margin: 0 }}>
                Please login to use the system. If you need admin rights,
                contact the administrator. Enter with this account if you want
                to go to the admin dashboard:
                <br />
                <div className="flex flex-col items-center mt-2">
                  <strong className="text-primary">
                    Email: gomen3624@gmail.com
                  </strong>
                  <strong className="text-primary">
                    Password: hungnguyen1
                  </strong>
                </div>
              </Typography.Paragraph>
              <Button
                type="primary"
                size="large"
                style={{ width: "100%" }}
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            </>
          )}
        </Space>
      </Card>
    </div>
  );
};

export default Home;
