import { createMocks } from "node-mocks-http";
import handleUsers from "../pages/api/users/index";
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
