import User from "../models/user.model";
import jwt from "jsonwebtoken";
import { expressjwt } from "express-jwt";
import config from "../config/index";
import { NextFunction, Request, Response } from "express";
import { IGetUserAuthInfoRequest } from "../../types/express";
const login = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    if (!user.authenticate(req.body.password)) {
      return res.status(401).send({ error: "Email and password don't match" });
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
    });
  } catch (err) {
    return res.status(401).json({ error: "couldn't login" });
  }
};
const logout = (req: Request, res: Response) => {
  //   res.clearCookie("t");
  return res.status(200).json({
    message: "Logout",
  });
};
const requireLogin = expressjwt({
  secret: config.jwtSecret,
  requestProperty: "auth",
  algorithms: ["HS256"],
});
const hasAuthorization = (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
  const authorized = req.profile && req.auth && req.profile._id == req.auth._id;

  if (!authorized) {
    return res.status(403).json({
      error: "User is not authorized",
    });
  }
  next();
};
export default { login, logout, requireLogin, hasAuthorization };
