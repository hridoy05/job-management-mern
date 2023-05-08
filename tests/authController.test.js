import request from "supertest";
import { StatusCodes } from "http-status-codes";
import app from "../app.js";
jest.mock("../repository/auth.repository.js");
describe("USER HTTP endpoints", () => {
  describe("HTTP endpoints", () => {
    test("should register a user", async () => {
      // arrange
      const userData = {
        name: "John Doe",
        email: "john.doe@example.com",
        password: "password",
      };

      // act
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(userData);
      // assert
      expect(res.status).toBe(StatusCodes.CREATED);
      expect(res.body.user.email).toBe("john.doe@example.com");
      expect(res.body.token).toBeDefined();
      expect(res.body.user.id).toBeDefined();
      // expect(res.body).toEqual({
      //   user: {
      //     id: expect.any(String),
      //     name: userData.name,
      //     email: userData.email,
      //   },
      //   token: expect.any(String),
      // });
    });
  });

  it("should login a user", async () => {
    const res = await request(app).post("/api/v1/auth/login").send({
      email: "john.doe@example.com",
      password: "password",
    });

    expect(res.status).toBe(StatusCodes.OK);
    expect(res.body.user.email).toBe("john.doe@example.com");
    expect(res.body.token).toBeDefined();
  });
});
