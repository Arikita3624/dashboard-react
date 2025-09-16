/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/services/supabase";
import { Button, Popconfirm, Table, Skeleton, message } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    document.title = "Categories";
    const fetchData = async () => {
      setLoading(true);
      const { data: categoryData, error } = await supabase
        .from("categories")
        .select("*");
      if (error) {
        console.log("Error fetching categories:", error);
      } else {
        setCategories(categoryData || []);
      }
      setLoading(false);
    };
    fetchData();
  }, []);
  const handleDelete = async (id: number) => {
    // Kiểm tra xem còn sản phẩm nào thuộc category này không
    const { data: products, error: productError } = await supabase
      .from("products")
      .select("id")
      .eq("category_id", id);
    if (productError) {
      messageApi.error("Failed to check products for this category");
      return;
    }
    if (products && products.length > 0) {
      messageApi.error(
        "Cannot delete: There are still products in this category!"
      );
      return;
    }
    // Nếu không còn sản phẩm nào thì xoá bình thường
    const { error } = await supabase.from("categories").delete().eq("id", id);
    if (error) {
      messageApi.error("Failed to delete category");
    } else {
      messageApi.success("Category deleted successfully");
      setCategories(categories.filter((cate) => cate.id !== id));
    }
  };
  const columns = [
    { title: "STT", dataIndex: "id", key: "id" },
    { title: "Category Name", dataIndex: "name", key: "name" },
    {
      title: "Created At",
      dataIndex: "created_at",
      key: "created_at",
      render: (created_at: string) => (
        <p>{new Date(created_at).toLocaleString()}</p>
      ),
    },
    {
      title: "Updated At",
      dataIndex: "updated_at",
      key: "updated_at",
      render: (updated_at: string) => (
        <p>{new Date(updated_at).toLocaleString()}</p>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (_: any, category: any) => (
        <div className="flex gap-2">
          <Popconfirm
            title="Delete"
            description="Are you sure to delete this product?"
            onConfirm={() => handleDelete(category.id)}
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="container mx-auto">
      {contextHolder}
      <div className="flex justify-between mb-4">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Link to={"add"}>
          <Button type="primary">Add Category</Button>
        </Link>
      </div>
      {loading ? (
        <Skeleton active paragraph={{ rows: 6 }} />
      ) : (
        <Table
          dataSource={categories}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 5,
            position: ["bottomCenter"],
          }}
        />
      )}
    </div>
  );
};

export default Categories;
