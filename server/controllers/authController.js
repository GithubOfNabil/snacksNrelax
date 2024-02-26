import { UserModel } from "../models/userModel.js";
import { setUser } from "../services/jwtAuth.js";

async function handleSignup(req, res) {
    
    try {
        const { name, email, password } = req.body;

        const newUser = await UserModel.create({
            name: name,
            email: email,
            password: password,
        });
        const token = setUser(newUser);
        // test

        res.cookie('uid', token, {httpOnly:true});
        res.status(200);
        res.json({"msg":"success"});
    } catch (error) {
        res.status(400)
    }

};

async function handleLogin(req, res) {
    try {

        const { email, password } = req.body;
        const oldUser = await UserModel.findOne({ email: email }).exec();
        console.log(oldUser);
        if (oldUser.password === password) {
            const token = setUser(oldUser);
            console.log(token)
            res.cookie('uid', token, {httpOnly:true});
            res.status(200);
            res.json({"msg":"success"});

        } else {
            res.status(400).json({ "msg": "incorect" });
        }
    } catch (error) {
        res.status(400);
    }
}

async function handleLogout(req, res) {
    console.log("/logout hitted")
    res.cookie('uid', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({"msg":"logged out"});
};


export { handleSignup, handleLogin, handleLogout };
