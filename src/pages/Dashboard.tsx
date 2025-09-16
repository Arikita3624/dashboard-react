import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";

interface Product {
  id: number;
  name: string;
  price: number;
  created_at: string;
}

const Dashboard = () => {
  const [latestProducts, setLatestProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestProducts = async () => {
      try {
        const { data, error } = await supabase
          .from("products")
          .select("*")
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

  if (loading) return <div>Đang tải...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <h2 className="text-xl mb-4">Sản phẩm mới nhất</h2>
      {latestProducts.length > 0 ? (
        <ul className="space-y-4">
          {latestProducts.map((product) => (
            <li key={product.id} className="p-4 bg-gray-800 rounded-lg">
              <h3 className="font-semibold">{product.name}</h3>
              <p>Giá: ${product.price}</p>
              <p>
                Thêm vào: {new Date(product.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Không có sản phẩm nào.</p>
      )}
    </div>
  );
};

export default Dashboard;
