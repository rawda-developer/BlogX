import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user.model";
import { connect } from "../../../utils/dbConnection";
interface Data {
  result?: string;
  success: boolean;
  message?: string;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connect();
  const {
    method,
    query: { id },
  } = req;
  switch (method) {
    case "POST":
      try {
        const result = await User.findById(id);
        res.json({ result, success: true });
      } catch (err) {
        res
          .status(400)
          .json({ success: false, message: "Can't register account" });
      }
      break;
    default:
      res.status(400).json({ success: false });
      break;
  }
}
