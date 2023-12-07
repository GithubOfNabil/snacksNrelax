import { getUser } from "../services/jwtAuth.js";

async function restictToLogInOnly(req, res, next) {
    const userUid = req.cookies.uid;
    if (!userUid) return res.status(401).json({"msg": "login first"});
    const user = getUser(userUid);
    if (!user) return res.status(401).json({"msg": "login first"});
    next();
};

export { restictToLogInOnly }