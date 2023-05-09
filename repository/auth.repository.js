import User from "../models/User.js";

async function findUserUsingEmail(email) {
  return await User.findOne({ email }).select("+password");
}

const updateUser = async (userId, email, name, lastName, location) => {
  const user = await User.findOne({ _id: userId });
  if (!user) {
    throw new Error("no user found");
  }
  user.email = email;
  user.name = name;
  user.lastName = lastName;
  user.location = location;

  await user.save();
  return user;
};

async function createUser(userData) {
  //const user = await User.create({ name, email, password });
  const user = await new User({ ...userData });
  const savedUser = await user.save();
  return savedUser;
}
export { createUser, findUserUsingEmail, updateUser };
