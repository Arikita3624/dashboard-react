import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import { Skeleton } from "antd";

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
    document.title = "Dashboard - MyApp";
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

  if (loading)
    return (
      <div>
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <h2 className="text-xl mb-4">Latest Products</h2>
      {latestProducts.length > 0 ? (
        <ul className="space-y-4">
          {latestProducts.map((product) => (
            <li key={product.id} className="p-4 border rounded shadow">
              <h3 className="font-semibold">{product.name}</h3>
              <p>Price{product.price}</p>
              <p>
                Added on {new Date(product.created_at).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
};

export default Dashboard;
