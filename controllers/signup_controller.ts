import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from 'dotenv';

config();

const signup = async (req : any,res : any)=>{
    try{
        // write your signup logic here
        // when a user signs up, it gives you a name, email and a password, 
        // you can use this to create an account for the user
        // if the user is created, you can return a token to the user and log them in
        // if the user is not created, you can return an error message
        if(!req.body.name || !req.body.email || !req.body.password){
            res.status(400).json({message: "Name, Email and Password are required"})
            return;
        }
        const user = await User.findOne({email: req.body.email});
        if(user){
            res.status(409).json({message: "User already exists, Please login"})
            return;
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        await newUser.save();
        const token = await jwt.sign({user: newUser}, process.env.JWT_SECRET as string);
        res.status(201).json({
            message: "Signup Successful",
            data : {
                name : newUser.name,
                email : newUser.email,
                auth_token : token
            }
        })

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Could not signup, check for Server Error"})
    }
}

export default signup;