import { createMocks } from "node-mocks-http";
import handleUsers from "../pages/api/users/index";
import handleLogin from "../pages/api/auth/login";
describe("/api/users", () => {
  test("should create new user using name, email, and password", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        name: "Test2",
        email: "test4@test.com",
        password: "123456789",
      },
    });

    await handleUsers(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "You registered successfully",
      })
    );
  });
});
describe("Login user", () => {
  test("should return 200 status code", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        name: "Test 1",
        email: "test_user@example.org",
        password: "a_password",
      },
    });

    await handleLogin(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "Test 1 is now authenticated",
        success: true,
      })
    );
  });
  test("should return 401 status code", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        name: "Test 1",
        email: "test_user@example.org",
        password: "a wrong password",
      },
    });

    await handleLogin(req, res);

    expect(res._getStatusCode()).toBe(401);
    
    expect(res._getData()).toEqual(
      expect.objectContaining({
        message: "Email and password don't match",
        success: false,
      })
    );
  });
});
