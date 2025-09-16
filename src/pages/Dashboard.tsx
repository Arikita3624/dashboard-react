/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { supabase } from "@/services/supabase";
import StartCard from "@/components/StartCard";

const Dashboard = () => {
  const [stats, setStats] = useState<any[]>([]);

  useEffect(() => {
    document.title = "Dashboard";
    const fetchData = async () => {
      const { data, error } = await supabase.from("stats").select("*");
      if (error) {
        console.error(error);
      } else {
        console.log(data);
        setStats(data);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 max-w-6xl mx-auto">
      {stats.map((item: any) => (
        <StartCard
          key={item.id}
          title={item.title}
          value={item.value}
          created_at={item.created_at}
        />
      ))}
    </div>
  );
};

export default Dashboard;
