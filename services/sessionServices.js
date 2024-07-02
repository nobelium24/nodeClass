const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require("../constants/index")

const generateToken = (email, userType) => {
    try {
        const payload = {
            email,
            userType
        }
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '5m' });
        return token;
    } catch (error) {
        throw error;
    }
}

const verifyToken = (token) => {
    try {
        const verifiedToken = jwt.verify(token, JWT_SECRET);
        console.log(verifiedToken);
        return verifiedToken;
    } catch (error) {
        throw error;
    }
}

module.exports = {generateToken, verifyToken};


