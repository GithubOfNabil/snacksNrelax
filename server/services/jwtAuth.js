import Jwt from "jsonwebtoken";

const secret =process.env.JWT_SECRET;


function setUser(user) {
    console.log(user.name)
    const payload = {
        _id: user._id,
        name: user.name,
        email: user.email,
    }
    console.log(Jwt.sign(payload, secret))
    
    return Jwt.sign(payload, secret);
}


function getUser(token) {
    if (!token) return null;
    const decoded = Jwt.verify(token, secret); 
    return decoded;
};



export { setUser, getUser  };