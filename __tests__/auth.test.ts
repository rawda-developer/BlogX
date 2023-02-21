import { createMocks } from "node-mocks-http";
import handleLogin from "../pages/api/auth/login";
import handleLogout from "../pages/api/auth/logout";

describe("Login user", () => {
  test("should return 200 status code", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: {
        email: "test_user@example.org",
        password: "a_password",
      },
    });

    await handleLogin(req, res);

    console.log(res._getData());
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
        email: "test_user@example.org",
        password: "a wrong password",
      },
    });

    await handleLogin(req, res);

    expect(res._getStatusCode()).toBe(401);

    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "Email and password don't match",
        success: false,
      })
    );
  });
});
describe("Logout user", () => {
  test("should return 200 status code", async () => {
    const { req, res } = createMocks({
      method: "GET",
    });

    await handleLogout(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        message: "You logged out successfully",
        success: true,
      })
    );
  });
});
