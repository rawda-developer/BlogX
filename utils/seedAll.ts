import { seedData } from "./seedFn";

beforeEach(async () => {
  console.log("Before Each");
  await seedData();
});
