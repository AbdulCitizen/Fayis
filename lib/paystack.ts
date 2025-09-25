import axios from "axios";

const PAYSTACK_BASE = "https://api.paystack.co";

export async function initiatePayment(amount: number, email: string, orderId: string) {
  const koboAmount = amount * 100;

  const res = await axios.post(
    `${PAYSTACK_BASE}/transaction/initialize`,
    {
      amount: koboAmount,
      email,
      reference: orderId,
      callback_url: `${process.env.NEXT_PUBLIC_SITE_URL}/orders`,
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        "Content-Type": "application/json",
      },
    }
  );

  return res.data.data.authorization_url;
}
