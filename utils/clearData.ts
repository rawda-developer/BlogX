import { clear } from "./dbConnection";

afterEach(async () => {
  console.log("CLEAR");
  await clear();
});
