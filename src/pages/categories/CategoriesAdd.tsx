import { supabase } from "@/services/supabase";
import { Button, Form, Input, message, Skeleton } from "antd";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { Link } from "react-router-dom";

type FieldType = {
  name: string;
};
const CategoriesAdd = () => {
  const [massageApi, contextHolder] = message.useMessage();
  const [loading, setLoading] = useState(true);
  const [form] = useForm();

  // Giả lập loading
  setTimeout(() => setLoading(false), 500);
  const onFinish = async (values: FieldType) => {
    const { error } = await supabase.from("categories").insert(values);
    if (error) {
      massageApi.error("Failed to add category");
    } else {
      massageApi.success("Category added successfully");
      form.resetFields();
    }
  };
  return (
    <div>
      {contextHolder}
      {loading ? (
        <Skeleton active paragraph={{ rows: 10 }} />
      ) : (
        <>
          <div className="flex justify-between mb-4">
            <h1 className="text-2xl font-bold">Category Add</h1>
            <Link to={"/admin/categories"}>
              <Button type="primary">Back</Button>
            </Link>
          </div>
          <Form form={form} layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                { required: true, message: "Please input category name" },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Add Category
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
};

export default CategoriesAdd;
