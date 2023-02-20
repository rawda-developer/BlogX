import { ObjectId } from "mongoose-typescript";
import User from "../models/user.model";
import { NextFunction, Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../../types/express";
export const create = async (req: Request, res: Response) => {
  try {
    await User.create(req.body);
    res.json({ message: "You registered successfully" });
  } catch (err) {
    res.status(400).json({ error: "Can't register account" });
  }
};
export const userByID = async (
  req: IGetUserAuthInfoRequest,
  res: Response,
  next: NextFunction,
  id: string
) => {
  try {
    const user = await User.findById(id);

    if (!user)
      return res.status(400).json({
        error: "User not found",
      });
    user.hashed_password = undefined;
    user.salt = undefined;
    req.profile = user;
    next();
  } catch (err) {
    return res.status(400).json({
      error: "Could not retrieve user",
    });
  }
};
