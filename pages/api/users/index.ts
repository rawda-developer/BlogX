import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user.model";
import { connect } from "../../../utils/dbConnection";
interface Data {
  message?: string;
  success: boolean;
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await connect();
  const { method } = req;
  switch (method) {
    case "POST":
      try {
        await new User(req.body).save();
        console.log(await User.find({}));
        res.json({ message: "You registered successfully", success: true });
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
