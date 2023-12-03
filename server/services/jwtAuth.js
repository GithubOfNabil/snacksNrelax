import Jwt from "jsonwebtoken";

const secret =process.env.JWT_SECRET;


function setUser(user) {
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
    }
    return Jwt.sign(payload, secret);
}

function verifyUser(token) {
    if (!token) return null;
    return Jwt.verify(token, secret);
};

export { setUser, verifyUser };