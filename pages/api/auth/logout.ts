import type { NextApiRequest, NextApiResponse } from "next";

interface Data {
  message: string;
  success: boolean;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { method } = req;
  switch (method) {
    case "GET":
      res.json({ message: "You logged out successfully", success: true });
      break;
    default:
      res
        .status(400)
        .json({ message: "Sorry there's an error login", success: false });
      break;
  }
}
