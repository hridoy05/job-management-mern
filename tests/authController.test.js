import request from "supertest";
import { StatusCodes } from "http-status-codes";
import app from "../app.js";
import { comparePassword, createJWT } from "../utils/authUtils.js";

jest.mock("../repository/auth.repository.js");
jest.mock("../utils/authUtils.js");

describe("USER AUTH endpoints", () => {
  describe("POST /api/v1/auth/register", () => {
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
      expect(createJWT).toHaveBeenCalled();
      expect(res.status).toBe(StatusCodes.CREATED);
      expect(res.body.user.email).toBe("john.doe@example.com");
      expect(res.body.token).toBeDefined();
      expect(res.body.location).toBeDefined();
    });
  });
  describe("POST /api/v1/auth/login", () => {
    test("should login a user", async () => {
      // arrange
      const email = "john.doe@example.com";
      const password = "password";
      //jest.spyOn(authUtils, "comparePassword").mockResolvedValue(true);
      // act
      const res = await request(app).post("/api/v1/auth/login").send({
        email,
        password,
      });

      // assert
      expect(comparePassword).toHaveBeenCalled();

      expect(res.status).toBe(StatusCodes.OK);
      expect(res.body.user.email).toBe(email);
      expect(res.body.token).toBeDefined();
    });
  });
});

import jwt from "jsonwebtoken";

// // jest.mock("jsonwebtoken", () => ({
// //   sign: jest.fn().mockReturnValue("mockedToken"),
// // }));

// jest.spyOn(jwt, "sign").mockReturnValue("mockedToken"),
//   // Then in your test, you can use jwt.sign as usual, and it will return "mockedToken":
//   test("jwt", () => {
//     const token = jwt.sign("hridoy", process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_LIFETIME,
//     });
//     expect(token).toBe("mockedToken");
//   });
