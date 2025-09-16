/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/services/supabase";
import { Button, Form, Input, Select, message, Skeleton } from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type FieldType = {
  title: string;
  thumbnail: string;
  price: number;
  stock: number;
  status: string;
  category_id: number;
};

const ProductAdd = () => {
  const [massageApi, contextHolder] = message.useMessage();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [form] = useForm();

  useEffect(() => {
    document.title = "Add Product";
    const fetchCategories = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("categories").select("*");
      if (error) {
        message.error("Failed to fetch categories");
      } else {
        setCategories(data);
      }
      setLoading(false);
    };
    fetchCategories();
  }, []);

  const onFinish = async (values: FieldType) => {
    const { error } = await supabase.from("products").insert(values);
    if (error) {
      massageApi.error("Failed to add product");
    } else {
      massageApi.success("Product added successfully");
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
            <h1 className="text-2xl font-bold">Product Add</h1>
            <Link to={"/admin/products"}>
              <Button type="primary">Back</Button>
            </Link>
          </div>
          <Form
            form={form}
            name="product-add"
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 700 }}
            autoComplete="off"
            onFinish={onFinish}
          >
            <Form.Item<FieldType>
              name="title"
              label="Title"
              rules={[{ required: true, message: "Title is required" }]}
            >
              <Input placeholder="Title" />
            </Form.Item>
            <Form.Item<FieldType>
              name="thumbnail"
              label="Thumbnail"
              rules={[{ required: true, message: "Thumbnail is required" }]}
            >
              <Input placeholder="Thumbnail URL" />
            </Form.Item>
            <Form.Item<FieldType>
              name="price"
              label="Price"
              rules={[{ required: true, message: "Price is required" }]}
            >
              <Input type="number" placeholder="Price" />
            </Form.Item>
            <Form.Item<FieldType>
              name="stock"
              label="Stock"
              rules={[{ required: true, message: "Stock is required" }]}
            >
              <Input type="number" placeholder="Stock" />
            </Form.Item>
            <Form.Item<FieldType>
              name="status"
              label="Status"
              rules={[{ required: true, message: "Status is required" }]}
            >
              <Select
                options={[
                  { value: "on going", label: "On Going" },
                  { value: "disabled", label: "Disabled" },
                ]}
                placeholder="Select status"
              />
            </Form.Item>
            <Form.Item<FieldType>
              name="category_id"
              label="Category"
              rules={[{ required: true, message: "Category is required" }]}
            >
              <Select
                placeholder="Select category"
                options={categories.map((cat) => ({
                  label: cat.name,
                  value: cat.id,
                }))}
              />
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </>
      )}
    </div>
  );
};

export default ProductAdd;
