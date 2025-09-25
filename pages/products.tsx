import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Products() {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*");
      setProducts(data || []);
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Products</h1>
      <ul className="mt-5 space-y-4">
        {products.map((p) => (
          <li key={p.id} className="border p-4 rounded-lg">
            <h2 className="text-lg font-semibold">{p.name}</h2>
            <p>₦{p.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
