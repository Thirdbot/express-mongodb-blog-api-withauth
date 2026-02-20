import {Authenicator} from "../utils/authenicator.js";
import userModel from "../models/user.js";
import jwt from 'jsonwebtoken';


export const signUp = async (req,res) => {
    const {username,email,password} = req.body

    if (!username || !password || !email){
        return res.status(400).json({message:'Username and email and password are required'})
    }
    const dupe = await userModel.findOne({email:email})

    if(dupe){
        return res.status(409).json({message:'Email already exists'})
    }

    const hashedPassword = Authenicator.hashPassword(password);

    try{
        const userData = await userModel.create({username:username,email:email,password:hashedPassword})
        const token = jwt.sign({id:userData._id},process.env.JWT_SECRET,{expiresIn:'1d'})

        //pass user id to cookie for session after signIn or signUp
        res.cookie('token',token)

        res.status(201).json({
            id:userData._id,
            username:userData.username})

    }catch (err){
        return res.status(500).json({message:err.message})
    }

}

export const signIn = async (req,res) => {
    const {email,password} = req.body

    if (!email){
        return res.status(400).json({message:'email is required'})
    }
    if (!password){
        return res.status(400).json({message:'Password is required'})
    }

    try {
        const user = await userModel.findOne({email: email})
        if (!user) return res.status(401).json(
            {message: 'Invalid username or email or password'}
        )

        const ok = Authenicator.comparePassword(password, user.password)
        if (!ok) {
            return res.status(401).json({message: 'Invalid username or email or password'})
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})
        res.cookie('token', token)
        res.json({message: 'Signed in successfully'})

    }catch (err){
        return res.status(500).json({message:err.message})
    }
}

export const signOut = (req,res) => {
    res.clearCookie('token')
    res.status(200).json({message:'Signed out successfully'})
}

