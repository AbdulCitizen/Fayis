import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 flex gap-4">
      <Link href="/">Home</Link>
      <Link href="/products">Products</Link>
      <Link href="/cart">Cart</Link>
      <Link href="/checkout">Checkout</Link>
      <Link href="/orders">My Orders</Link>
      <Link href="/admin/orders">Admin</Link>
    </nav>
  );
}
