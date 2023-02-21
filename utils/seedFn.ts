import User from "../models/user.model";
const name = "Test 1";
const password = "a_password";

const email = "test_user@example.org";
// const validAuth = Buffer.from(`${username}:${password}`).toString("base64");
// const authHeader = `Basic ${validAuth}`;

let user;
const seedData = async () => {
  user = new User({
    name, email, password
  });
  await user.save();
};
export { seedData, user };
