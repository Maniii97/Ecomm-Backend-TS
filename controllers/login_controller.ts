import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const login = async (req : any, res : any)=>{
    // write your login logic here
    // when a user logs in, it gives you a email and a password, 
    // you can use this to authenticate the user
    // if the user is authenticated, you can return a token to the user and log them in
    // if the user is not signed in/account does not exist, you can return an error message
    try{
        if(!req.body.email || !req.body.password){
            res.status(400).json({message: "Email and Password are required"})
            return;
        }
        const user = await User.findOne({email: req.body.email});
        if(!user){
            res.status(404).json({message: "User not found, Please create an account"})
            return;
        }
        if(!(await bcrypt.compare(req.body.password, user.password))){
            res.status(401).json({message: "Invalid Credentials"})
            return;
        }
        const token = await jwt.sign({user}, process.env.JWT_SECRET as string);

        res.status(200).json({
            message: "Login Successful",
            data : {
                name : user.name,
                email : user.email,
                auth_token : token
            }
        })

    }catch(error){
        console.error(error);
        res.status(500).json({message: "Could not login, check for Server Error"})
    }

}

export default login;