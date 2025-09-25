import axios from "axios";

const PAYSTACK_BASE = "https://api.paystack.co";

export async function initiatePayment(amount: number, email: string, orderId: string) {
  // Paystack accepts amount in kobo (₦100 = 10000 kobo)
  const koboAmount = amount * 100;

  const res = await axios.post(
    `${PAYSTACK_BASE}/transaction/initialize`,
    {
      amount: koboAmount,
      email,
      reference: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout?order=${orderId}`,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.data.authorization_url; // redirect customer to this link
}
