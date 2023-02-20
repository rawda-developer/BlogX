// import { ObjectId } from "mongoose-typescript";
import User from "../../src/models/user.model";
import { Request } from "express"
export interface IGetUserAuthInfoRequest extends Request {
  profile?: User; 
  auth?: User;
}

// declare namespace Express {
//   interface Request {
//     profile?:User ;
//     // auth?: User;
//   }
// }
