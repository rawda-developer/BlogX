import request from "supertest";
import app from "../server";
describe("Create user", () => {
  test("should create new user using name, email, and password", async () => {
    const response = await request(app).post("/api/users/").send({
      name: "Rawda Yasser",
      email: "test1@test.com",
      password: "1234567890",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
  });
});
describe("Login user", () => {
  test("should return 200 status code", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "test_user@example.org",
      password: "a_password",
    });
    expect(response.statusCode).toEqual(200);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(response.body.token).toBeTruthy();
    expect(response.body.user.email).toEqual("test_user@example.org");
  });
  test("should return 404 status code", async () => {
    const response = await request(app).post("/api/auth/login").send({
      email: "test_user@example.org",
      password: "a_password12",
    });
    expect(response.statusCode).toEqual(401);
    expect(response.headers["content-type"]).toEqual(
      expect.stringContaining("json")
    );
    expect(response.body.token).not.toBeTruthy();
  });
});
