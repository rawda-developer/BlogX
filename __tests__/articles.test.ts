import { createMocks } from "node-mocks-http";
import handleArticles from "../pages/api/articles/index";
describe("/api/articles", () => {
  test("should get a list of articles in the system", async () => {
    const { req, res } = createMocks({
      method: "GET",
      
    });

    await handleArticles(req, res);

    expect(res._getStatusCode()).toBe(200);
    // console.log(res._getData())
    expect(JSON.parse(res._getData())).toEqual(
      expect.objectContaining({
        
      })
    );
  });
});
