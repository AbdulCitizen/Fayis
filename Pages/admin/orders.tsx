import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AdminOrders() {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const { data, error } = await supabase.from("orders").select(`
      id, order_id, total, status, created_at,
      profiles(full_name, email)
    `).order("created_at", { ascending: false });

    if (!error) setOrders(data);
  };

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel("orders-changes")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "orders" },
        () => fetchOrders()
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const updateStatus = async (id: string, status: string) => {
    await supabase.from("orders").update({ status }).eq("id", id);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Admin Orders</h1>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Customer</th>
            <th className="border p-2">Email</th>
            <th className="border p-2">Amount (₦)</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Date</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id}>
              <td className="border p-2">{o.order_id}</td>
              <td className="border p-2">{o.profiles?.full_name || "-"}</td>
              <td className="border p-2">{o.profiles?.email}</td>
              <td className="border p-2">₦{o.total}</td>
              <td className="border p-2">{o.status}</td>
              <td className="border p-2">{new Date(o.created_at).toLocaleString()}</td>
              <td className="border p-2 space-x-2">
                <button onClick={() => updateStatus(o.id, "shipped")} className="bg-green-500 text-white px-3 py-1 rounded">Shipped</button>
                <button onClick={() => updateStatus(o.id, "cancelled")} className="bg-red-500 text-white px-3 py-1 rounded">Cancel</button>
                <button onClick={() => updateStatus(o.id, "refunded")} className="bg-yellow-500 text-white px-3 py-1 rounded">Refund</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
        }
