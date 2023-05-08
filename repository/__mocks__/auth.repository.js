// mock repository layer

import User from "../../models/User.js";

let users = [];

export const createUser = async (userData) => {
  const user = new User({ ...userData });
  users.push(user._doc);
  return user._doc;
};

export const findUserUsingEmail = async (email) => {
  console.log("called mock checked email");
  return users.find((user) => user.email === email) || null;
};
