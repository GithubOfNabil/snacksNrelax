import { verifyUser } from "../services/auth.js";

async function restictToLogInOnly(req, res, next) {
    const userUid = req.cookies.uid;
    if (!userUid) return res.redirect("/login");
    const user = verifyUser(userUid);
    if (!user) return res.redirect('/login');
    next();
};

export { restictToLogInOnly }