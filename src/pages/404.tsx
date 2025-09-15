import { Button, Result } from "antd";
import { FrownOutlined } from "@ant-design/icons";

const NotFound = () => (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f5f5f5",
    }}
  >
    <Result
      icon={<FrownOutlined style={{ color: "#ff4d4f", fontSize: 64 }} />}
      status="404"
      title={
        <span style={{ color: "#ff4d4f" }}>404 - Can't find that page</span>
      }
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary" href="/">
          Back Home
        </Button>
      }
    />
  </div>
);

export default NotFound;
