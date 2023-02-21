import mongoose from "mongoose";
import "dotenv/config";
import { dbSetting } from "./dbSetting";

export const connect = async () => {
  const env: string = process.env.NODE_ENV || "test";
  const mongoString: string = dbSetting[env].url;

  await mongoose.connect(mongoString);
  const database = mongoose.connection;
  database.on("error", (error) => {
    console.log(error);
  });

  database.once("connected", () => {
    console.log("Database Connected");
  });
};

// Remove and close the database and server.
export const close = async () => {
  await mongoose.disconnect();
  //   await mongoServer.stop();
  console.log("Connection closed");
};

// Remove all data from collections
export const clear = () => {
  // const collections = mongoose.connection.collections;
  // // console.log(collections);
  // for (const key in collections) {
  //   collections[key].deleteMany();
  // }

  mongoose.connection.db.dropDatabase();

  console.log("Database cleaned");
};
