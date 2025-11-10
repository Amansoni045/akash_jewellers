import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export function hashPassword(password){
    return bcrypt.hashSync(password, 10)
};

export function comparePassword(password, hashedPassword){
    return bcrypt.compareSync(password, hashedPassword)
};

export function generateToken(user){
    return jwt.sign(
        { id:user.id , email:user.email},
        process.env.JWT_SECRET,
        { expiresIn: "7d"}
    )
}

export function verifyToken(token){
    return jwt.verify(token, process.env.JWT_SECRET)
}