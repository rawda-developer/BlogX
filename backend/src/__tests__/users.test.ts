import {User} from "../models/user";
import request from "supertest";
import app from "../server";
describe('Create user', () => {
    test("should create new user using name, email, and password", () => {
        const response = await request(app).post("/api/users").send({
            name: "Rawda Yasser",
            email: "test1@test.com",
            password: "1234567890",
          });
          expect(response.statusCode).toBe(200);
          expect(response.headers["content-type"]).toEqual(
            expect.stringContaining("json");
    })
});