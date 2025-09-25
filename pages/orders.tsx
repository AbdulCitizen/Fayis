import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Orders() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await supabase.from("orders").select("*");
      setOrders(data || []);
    };
    fetchOrders();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">My Orders</h1>
      <ul className="mt-5 space-y-4">
        {orders.map((o) => (
          <li key={o.id} className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold">Order {o.order_id}</h2>
            <p>Status: {o.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
                }
