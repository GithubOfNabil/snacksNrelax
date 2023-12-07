import { UserModel } from "../models/userModel.js";
import { getUser } from "../services/jwtAuth.js";

async function handleName(req, res){
    const jwt_token = req.cookies.uid;
    const user =  getUser(jwt_token);
    console.log(user)
    res.status(200).json({"name":user.name});
    
};


export {handleName};