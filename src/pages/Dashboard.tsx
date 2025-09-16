import { useEffect } from "react";
import { Card, Row, Col, Statistic, Button } from "antd";
import {
  ArrowUpOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const Dashboard = () => {
  useEffect(() => {
    document.title = "Dashboard - MyApp";
  }, []);

  return (
    <div className="p-6">
      {/* Header */}
      <h1 className="text-3xl font-bold mb-6 text-gray-100">
        Dashboard Overview
      </h1>

      {/* Stats Section */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={8}>
          <Card
            bordered={false}
            className="bg-gray-800 text-white hover:shadow-lg transition-shadow"
          >
            <Statistic
              title="Total Users"
              value={1234}
              prefix={<UserOutlined />}
              valueStyle={{ color: "#3abff8" }}
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            bordered={false}
            className="bg-gray-800 text-white hover:shadow-lg transition-shadow"
          >
            <Statistic
              title="Sales Today"
              value={5678}
              prefix={<ShoppingCartOutlined />}
              valueStyle={{ color: "#00e096" }}
              suffix="$"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card
            bordered={false}
            className="bg-gray-800 text-white hover:shadow-lg transition-shadow"
          >
            <Statistic
              title="Growth"
              value={11.28}
              prefix={<ArrowUpOutlined />}
              valueStyle={{ color: "#ffaa00" }}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Row gutter={[16, 16]}>
        <Col span={16}>
          <Card
            title="Recent Activities"
            bordered={false}
            className="bg-gray-800 text-white h-full hover:shadow-lg transition-shadow"
          >
            <p className="text-gray-400">Activity 1 - 10:00 AM</p>
            <p className="text-gray-400">Activity 2 - 02:30 PM</p>
            <p className="text-gray-400">Activity 3 - 05:15 PM</p>
            <Button type="primary" className="mt-4 bg-blue-600">
              View All
            </Button>
          </Card>
        </Col>
        <Col span={8}>
          <Card
            title="Quick Actions"
            bordered={false}
            className="bg-gray-800 text-white h-full hover:shadow-lg transition-shadow"
          >
            <Button type="primary" block className="mb-2 bg-green-600">
              Add Product
            </Button>
            <Button type="primary" block className="bg-purple-600">
              Manage Users
            </Button>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
