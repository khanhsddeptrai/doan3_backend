import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config()

const createJWT = (payload) => {
    let key = process.env.JWT_SECRET;
    let token = null;
    try {
        token = jwt.sign(payload, key, { expiresIn: process.env.JWT_EXPIRES_IN });
    } catch (error) {
        console.log(error)
    }
    return token;
}

const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;
    let decoded = null;
    try {
        decoded = jwt.verify(token, key);
    } catch (error) {
        console.log(error)
    }
    return decoded;
}

const checkUserJWT = (req, res, next) => {
    let cookies = req.cookies;
    if (cookies && cookies.jwt) {
        let token = cookies.jwt;
        let decoded = verifyToken(token);
        if (decoded) {
            req.user = decoded;
            req.token = token
            next();
        } else {
            return res.status(401).json({
                EC: -1,
                EM: "Not authenticated the user",
                DT: ''
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            EM: "Not authenticated the user",
            DT: ''
        })
    }
}

const checkUserPermisson = (req, res, next) => {
    if (req.user) {
        let email = req.user.email;
        let roles = req.user.groupWithRoles.Roles;
        let currentUrl = req.path;
        if (!roles || roles.lenght === 0) {
            return res.status(403).json({
                EC: -1,
                EM: "You don't have permisson to access this resource!",
                DT: ''
            })
        }
        let canAccess = roles.some(item => item.url = currentUrl);
        if (canAccess === true) {
            next();
        } else {
            return res.status(403).json({
                EC: -1,
                EM: "You don't have permisson to access this resource!",
                DT: ''
            })
        }
    } else {
        return res.status(401).json({
            EC: -1,
            EM: "Not authenticated the user",
            DT: ''
        })
    }
}

module.exports = {
    createJWT, verifyToken, checkUserJWT, checkUserPermisson
}