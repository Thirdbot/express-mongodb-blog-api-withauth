import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import type {NextFunction, Response,Request} from "express";

dotenv.config();

interface MyTokenPayload {
    id:string
    username:string
}

export class Authenicator{
    static hashPassword(password:string){
        return bcrypt.hashSync(password,parseInt(process.env.SALT_ROUNDS || "10"));
    }
    static comparePassword(password:string,hashedPassword:string){
        return bcrypt.compareSync(password,hashedPassword);
    }
}

export const requiredAuth = (req:Request,res:Response,next:NextFunction) => {
    const token = req.cookies?.token;
    if (!token){
        return res.status(401).json({message:'Please sign in'})
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || "replace_me_with_a_long_random_secret", {complete: true}) as unknown as { payload: MyTokenPayload };


        req.user = {
            id: verified.payload.id,
            username: verified.payload.username
        }

       return next();

    }catch (err){
        return res.status(401).json({message:'Invalid token'})
    }
}