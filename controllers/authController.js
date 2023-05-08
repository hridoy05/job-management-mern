import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { BadRequestError, UnAuthenticatedError } from "../errors/index.js";
import {
  createUser,
  findUserUsingEmail,
} from "../repository/auth.repository.js";
import { comparePassword, createJWT } from "../utils/authUtils.js";

//user sign in
const HttpRegister = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    throw new BadRequestError("please provide all values");
  }

  const user = await createUser(req.body);

  const token = await createJWT(
    user._id,
    process.env.JWT_LIFETIME,
    process.env.JWT_SECRET
  );
  console.log(user, token);
  res.status(StatusCodes.CREATED).json({
    user: {
      email: user.email,
      lastName: user.lastName,
      location: user.location,
      name: user.name,
    },
    token,
    location: user.location,
  });
};

//user login
const HttpLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequestError("Please provide all values");
  }
  const user = await findUserUsingEmail(email);
  if (!user) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }

  const isPasswordCorrect = await comparePassword(password, user.password);
  if (!isPasswordCorrect) {
    throw new UnAuthenticatedError("Invalid Credentials");
  }
  const token = createJWT(
    user._id,
    process.env.JWT_LIFETIME,
    process.env.JWT_SECRET
  );
  user.password = undefined;
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

//update user controller
const HttpUpdateUser = async (req, res) => {
  const { email, name, lastName, location } = req.body;
  if (!email || !name || !lastName || !location) {
    throw new BadRequestError("Please provide all values");
  }

  const user = await User.findOne({ _id: req.user.userId });
  if (!user) {
    throw new BadRequestError("no user found");
  }
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();
  const token = createJWT(
    user._id,
    process.env.JWT_LIFETIME,
    process.env.JWT_SECRET
  );
  res.status(StatusCodes.OK).json({ user, token, location: user.location });
};

export { HttpRegister, HttpLogin, HttpUpdateUser };
