import mongoose from "mongoose";
import crypto from "crypto";
interface IUser {
  name: { type: string; trim: boolean; required: string };
  email: {
    type: string;
    trim: boolean;
    required: string;
    unique: string;
    match: [RegExp, string];
  };
  hashed_password?: {
    type: string;
    required: string ;
   
  } ;
  salt?: string;
  updated: Date;
  created: {
    type: Date;
  };
  _password: string;
  makeSalt: Function;
  authenticate: Function;
  encryptPassword: Function;
}

const UserSchema = new mongoose.Schema<IUser>({
  name: {
    type: String,
    trim: true,
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  hashed_password: {
    type: String,
    required: "Password is required",
  },
  salt: String,
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.virtual("password")
  .set(function (password) {
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function () {
    return this._password;
  });

UserSchema.path("hashed_password").validate(function (v) {
  if (this._password && this._password.length < 6) {
    this.invalidate("password", "Password must be at least 6 characters.");
  }
  if (this.isNew && !this._password) {
    this.invalidate("password", "Password is required");
  }
}, undefined);

UserSchema.methods = {
  authenticate: function (plainText: string) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  encryptPassword: function (password: string) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (err) {
      return "";
    }
  },
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random()) + "";
  },
};

export default mongoose.model("User", UserSchema);
