import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { Skeleton } from "antd";

interface Product {
  id: number;
  name: string;
  price: number;
  created_at: string;

  thumbnail?: string;
}

const Dashboard = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Dashboard - MyApp";
    const fetchLatestProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*") // Thêm cột image_url nếu có
          .order("created_at", { ascending: false })
          .limit(5);

        if (error) throw error;
        setLatestProducts(data || []);
      } catch (error) {
        console.error("Error fetching latest products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProducts();
  }, []);

  if (loading)
    return (
      <div className="p-6">
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <h2 className="text-xl">Latest Products</h2>
      </div>
      {latestProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {latestProducts.map((product) => (
            <div
              key={product.id}
              className="p-4 border rounded-lg shadow-md hover:shadow-lg transition-shadow bg-white text-gray-800"
            >
              {product.thumbnail ? (
                <img
                  src={product.thumbnail}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg mb-2"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center rounded-t-lg mb-2">
                  No Image
                </div>
              )}
              <h3 className="font-semibold text-lg truncate">{product.name}</h3>
              <p className="text-gray-600">Price: ${product.price}</p>
              <p className="text-sm text-gray-500">
                Added on: {new Date(product.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No products found</p>
      )}
    </div>
  );
};

export default Dashboard;
