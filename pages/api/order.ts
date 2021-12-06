import { createOrder, getOrder } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { items, paymentInfo, shippingInfo } = req.body;
    try {
      const order = await createOrder(items, shippingInfo, paymentInfo);
      return res.status(201).json({ orderId: order.id });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } else if (req.method === "GET") {
    const orderId = req.query.orderId as string;
    if (orderId) {
      const order = await getOrder(orderId);
      return res.status(200).json(order);
    }
    return res.status(400);
  }

  return res.send("Method not allowed.");
};

export default handler;
