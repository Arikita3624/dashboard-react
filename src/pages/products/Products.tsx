/* eslint-disable @typescript-eslint/no-explicit-any */
import { supabase } from "@/services/supabase";
import { Button, Popconfirm, Table, Tag, Skeleton, message } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const [{ data: productData }, { data: categoryData }] = await Promise.all(
        [
          supabase
            .from("products")
            .select("*")
            .order("id", { ascending: true }),
          supabase.from("categories").select("*"),
        ]
      );
      setProducts(productData || []);
      setCategories(categoryData || []);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) {
      messageApi.error("Failed to delete product");
    } else {
      messageApi.success("Product deleted successfully");
      setProducts(products.filter((product) => product.id !== id));
    }
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Product Name",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Thumbnail",
      dataIndex: "thumbnail",
      key: "thumbnail",
      render: (thumbnail: string) => (
        <img src={thumbnail} alt="err" width={50} />
      ),
    },
    {
      title: "Product Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Stock",
      dataIndex: "stock",
      key: "stock",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => {
        const color = status === "on going" ? "green" : "red";
        return <Tag color={color}>{status}</Tag>;
      },
    },
    {
      title: "Category",
      dataIndex: "category_id",
      key: "category_id",
      render: (category_id: number) => {
        const category = categories.find((c) => c.id === category_id);
        return category ? category.name : "Unknown";
      },
    },
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
      render: (_: any, product: any) => (
        <div className="flex gap-2">
          <Link to={`${product.id}/edit`}>
            <Button type="primary">Edit</Button>
          </Link>
          <Popconfirm
            title="Delete"
            description="Are you sure to delete this product?"
            onConfirm={() => handleDelete(product.id)}
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
        <h1 className="text-2xl font-bold">Products List</h1>
        <Link to="add">
          <Button type="primary">Add</Button>
        </Link>
      </div>
      {loading ? (
        <Skeleton active paragraph={{ rows: 8 }} />
      ) : products.length > 0 ? (
        <Table
          dataSource={products}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 5,
            position: ["bottomCenter"],
          }}
        />
      ) : (
        <div className="text-center text-gray-400 py-8">No products found.</div>
      )}
    </div>
  );
};

export default Products;
