import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

// hash
export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

// compare
export async function comparePassword(plain, hashed) {
  return await bcrypt.compare(plain, hashed);
}

// generate token
export function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );
}

// verify token
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
}
