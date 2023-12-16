import { UserModel } from "../models/userModel.js";
import { linkModel } from "../models/linkModel.js";
import { getUser } from "../services/jwtAuth.js";


async function handleName(req, res){
    const jwt_token = req.cookies.uid;
    const user =  getUser(jwt_token);
    res.status(200).json({"name":user.name});
    
};

async function handleContentAdd(req, res){
console.log("/content/add hitted")
const {link} = req.body;
const social = req.query.social;
console.log(social);
console.log(link);
res.status(200).json({"msg":"added successfully"});
};

async function handleContentServe(req, res){

};
export {handleName, handleContentAdd, handleContentServe};