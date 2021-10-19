import { NextApiRequest, NextApiResponse } from "next";
import { getAllCategories } from "@/lib/db";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const categories = await getAllCategories();
    return res.status(200).json(categories);
  }
  return res.send("Method not allowed.");
}

export default handler;
