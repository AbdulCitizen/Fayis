import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";

export default function Orders() {
  const user = useUser();
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    if (!user) return;
    const { data, error } = await supabase
      .from("orders")
      .select("id, order_id, total, status, created_at")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });
    if (!error) setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
    if (!user) return;

    const channel = supabase
      .channel("customer-orders")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders", filter: `user_id=eq.${user.id}` },
        () => fetchOrders()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  if (!user) return <p className="p-8">Please log in to view your orders.</p>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">My Orders</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Amount (₦)</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td className="border p-2">{o.order_id}</td>
              <td className="border p-2">₦{o.total}</td>
              <td className="border p-2 font-semibold">{o.status}</td>
              <td className="border p-2">{new Date(o.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
         }
