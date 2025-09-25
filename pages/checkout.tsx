import { initiatePayment } from "@/lib/paystack";

export default function Checkout() {
  const handleCheckout = async () => {
    const orderId = `ORDER-${Date.now()}`;
    const checkoutUrl = await initiatePayment(5000, "customer@example.com", orderId);
    window.location.href = checkoutUrl;
  };

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <button
        onClick={handleCheckout}
        className="mt-5 bg-green-600 text-white px-4 py-2 rounded-lg"
      >
        Pay ₦5000 with Paystack
      </button>
    </div>
  );
        }
