import { createOrder } from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const { items, paymentInfo, shippingInfo } = req.body;
    const order = await createOrder(items, shippingInfo, paymentInfo);
    res.status(201).json({ orderId: order.id });
  }
};

export default handler;
