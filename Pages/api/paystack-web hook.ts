import type { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
import crypto from "crypto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const secret = process.env.PAYSTACK_SECRET_KEY!;
  const hash = crypto
    .createHmac("sha512", secret)
    .update(JSON.stringify(req.body))
    .digest("hex");

  if (hash !== req.headers["x-paystack-signature"]) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  try {
    const event = req.body;

    if (event.event === "charge.success") {
      const orderId = event.data.reference;
      const amount = event.data.amount / 100; // convert back from kobo
      const customerEmail = event.data.customer.email;

      // Idempotency check
      const { data: existing } = await supabase
        .from("orders")
        .select("id")
        .eq("order_id", orderId)
        .maybeSingle();

      if (!existing) {
        await supabase.from("orders").insert([
          {
            order_id: orderId,
            total: amount,
            status: "paid",
            customer_email: customerEmail,
            created_at: new Date().toISOString(),
          },
        ]);
      }
    }

    return res.status(200).json({ received: true });
  } catch (err) {
    console.error("Paystack webhook error:", err);
    return res.status(200).json({ received: true }); // still ack to avoid retries
  }
      }
