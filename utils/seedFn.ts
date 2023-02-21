import User from "../models/user.model";
import Article from "../models/article.model";
const name = "Test 1";
const password = "a_password";
const email = "test_user@example.org";
// const validAuth = Buffer.from(`${username}:${password}`).toString("base64");
// const authHeader = `Basic ${validAuth}`;

let user;
const seedArticles = async () => {
  const article1 = new Article({
    title: "Test Article 1 title",
    text: "Hello world Article 1",
  });
  await article1.save();
  const article2 = new Article({
    title: "Test Article 2 title",
    text: "Hello world Article 2",
  });
  await article2.save();
  console.log(await Article.find({}));
};
const seedUsers = async () => {
  user = new User({
    name,
    email,
    password,
  });
  await user.save();
  console.log(await User.find({}));
};
const seedData = async () => {
  await seedUsers();
  await seedArticles();
};
export { seedData, user };
