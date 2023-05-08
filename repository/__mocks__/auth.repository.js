// mock repository layer

import User from "../../models/User.js";

const mockUser = {
  name: "John Doe",
  email: "john.doe@example.com",
  password: "password",
};

export const createUser = async (userData) => {
  const user = new User({ ...userData });
  return user._doc;
};

export const findUserUsingEmail = async (email) => {
  if (email === mockUser.email) {
    return mockUser;
  }
  return null;
};
