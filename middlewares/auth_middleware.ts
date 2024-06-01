/**
 * @apiDescription Middleware to authenticate users before they can make requests to the server
 */
import jwt from "jsonwebtoken";

const authentication = async (req : any, res : any, next : Function)=>{
    /**
     * write your authentication logic here
     * you can use the jwt library to verify the token
     * if the token is valid, you can allow the user to access the resource
     * if the token is invalid, you can return an error message
     */
    try{
        if(!req.headers.authorization){
            res.status(401).json({message: "Authorization token is required"})
            return;
        }
        const token = req.headers.authorization.split(" ")[1];
        /**
         *  it's splitting the Authorization header value on spaces.
         *  This is because the Authorization header usually follows this format: Bearer <token>.
         *  So, splitting on spaces gives an array of two elements: ["Bearer", "<token>"].
         *  [1]: This accesses the second element in the array, which is the token itself.
         */
        const user = jwt.verify(token, process.env.JWT_SECRET as string);
        req.user = user;
        next();
    }catch(error){
        console.error(error);
        res.status(401).json({message: "Invalid Token"})
    }
}

export default authentication;