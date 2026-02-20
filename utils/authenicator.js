import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export class Authenicator{
    static hashPassword(password){
        return bcrypt.hashSync(password,parseInt(process.env.SALT_ROUNDS));
    }
    static comparePassword(password,hashedPassword){
        return bcrypt.compareSync(password,hashedPassword);
    }
}

export const requiredAuth = (req,res,next) => {
    const token = req.cookies?.token;
    if (!token){
        return res.status(401).json({message:'Please sign in'})
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = {
            id: verified.id,
            username: verified.username
        };

       return next();
    }catch (err){
        return res.status(401).json({message:'Invalid token'})
    }
}