import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Function to encrypt a password using bcrypt
const encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return hashedPassword;
};

// Function to create a JWT token
const createJWT = (userId, lifetime, secret) => {
  const token = jwt.sign({ userId }, secret, { expiresIn: lifetime });
  return token;
};

// Function to compare a password with its hashed version using bcrypt
const comparePassword = async (password, hashedPassword) => {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
};

export { encryptPassword, createJWT, comparePassword };
