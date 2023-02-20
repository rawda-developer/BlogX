import "dotenv/config";
// console.log(process.env.DATABASE_TEST_URL)
export const dbSetting:any = {
  test: {
    url: process.env.DATABASE_TEST_URL,
  },
  development: {
    url: process.env.DATABASE_URL,
  },
};
