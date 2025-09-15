import { supabase } from "@/services/supabase";
import { Button, Form, Input, Select, Skeleton, message } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

type FieldType = {
  full_name: string;
  avatar_url: string;
  role: string;
};

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const [userData, setUserData] = useState<FieldType | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("profiles")
        .select("full_name, avatar_url, role")
        .eq("id", id)
        .single();
      setUserData(data);
      form.setFieldsValue(data);
      setLoading(false);
    };
    if (id) fetchUser();
  }, [id, form]);

  const isCurrentUser = currentUser?.id === id;

  const onFinish = async (values: FieldType) => {
    if (isCurrentUser) return;
    const { error } = await supabase
      .from("profiles")
      .update({ role: values.role })
      .eq("id", id);
    if (error) {
      messageApi.error("Failed to update role");
    } else {
      messageApi.success("Role updated successfully");
      setTimeout(() => navigate("/admin/users"), 1200);
    }
  };

  return (
    <div style={{ maxWidth: 480, margin: "0 auto" }}>
      {contextHolder}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">
          Edit:{" "}
          {form.getFieldValue("full_name") ? (
            form.getFieldValue("full_name")
          ) : (
            <span className="text-gray-400">&nbsp;</span>
          )}
        </h1>
        <Link to="/admin/users">
          <Button type="primary">Back</Button>
        </Link>
      </div>
      {loading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={userData || {}}
        >
          <Form.Item label="Full Name" name="full_name">
            <Input disabled />
          </Form.Item>
          <Form.Item label="Avatar URL" name="avatar_url">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: "Role is required" }]}
          >
            <Select
              disabled={isCurrentUser}
              options={[
                { value: "admin", label: "Admin" },
                { value: "user", label: "User" },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" disabled={isCurrentUser}>
              Save
            </Button>
            {isCurrentUser && (
              <span style={{ color: "#f5222d", marginLeft: 12 }}>
                You cannot change your own role.
              </span>
            )}
          </Form.Item>
        </Form>
      )}
    </div>
  );
};

export default UserEdit;
