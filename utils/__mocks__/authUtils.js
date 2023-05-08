// Function to create a JWT token
const createJWT = jest.fn().mockReturnValue("string");

// Function to compare a password with its hashed version using bcrypt
const comparePassword = jest.fn().mockResolvedValue(true);

export { createJWT, comparePassword };
