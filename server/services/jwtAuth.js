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


function getUser(token) {
    console.log(token)
    if (!token) return null;
    const decoded = Jwt.verify(token, secret); 
    console.log(decoded);
    return decoded;
};



export { setUser, getUser  };