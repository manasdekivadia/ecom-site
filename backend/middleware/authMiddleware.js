import {config} from "dotenv";
import jwt from "jsonwebtoken";

config();

const auth = async(req,res,next) =>{
    const authHeader = req.headers['authorization'];

    if(!authHeader  || !authHeader.startsWith('Bearer ')){
        return res.stauts(401).json({msg:'NO Token , Authorization has been Denied'});
    }

    const token = authHeader.split(' ')[1];
    try {
        
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        console.error("Token Verification Error : ",error.message);
        res.status(401).json({msg:'Token is not Valid'});
    }
};

export {auth};