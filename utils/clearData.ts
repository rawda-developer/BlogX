import { clear } from "./dbConnection";

beforeEach(() => {
  console.log("CLEAR");
  clear();
});
