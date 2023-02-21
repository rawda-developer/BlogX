import type { NextApiRequest, NextApiResponse } from "next";
import User from "../../../models/user.model";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import { connect } from "../../../utils/dbConnection";
import { ObjectId } from "mongoose";
import config from "../../../config";
interface IUser {
  _id: ObjectId;
  name: string;
  email: string;
}
interface Data {
  message: string;
  success: boolean;
  token?: string;
  user?: IUser;
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
        const user = await User.findOne({ email: req.body.email });

        if (!user || !user.authenticate(req.body.password)) {
          return res.status(401).json({
            message: "Email and password don't match",
            success: false,
          });
        }
        const token = jwt.sign({ _id: user._id }, config.jwtSecret);
        // res.cookie("t", token, { expire: new Date() + 9999 });
        return res.json({
          token,
          user: {
            _id: user._id,
            name: user.name,
            email: user.email,
          },
          message: `${user.name} is now authenticated`,
          success: true,
        });
      } catch (err) {
        return res
          .status(401)
          .json({ message: "couldn't login", success: false });
      }
   
    default:
      res
        .status(400)
        .json({ message: "Sorry there's an error login", success: false });
      break;
  }
}
