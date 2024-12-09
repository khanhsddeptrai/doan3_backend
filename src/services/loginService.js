import db from "../models/index"
import bcrypt from 'bcryptjs';

import jwtActions from '../middleware/JWTAction';

const salt = bcrypt.genSaltSync(10);

const hashPassword = (userPassword) => {
    let hash = bcrypt.hashSync(userPassword, salt);
    return hash
}

const checkEmail = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })

    if (user) {
        return true;
    }
    return false;
}


const registerNewUser = async (userData) => {
    try {
        let isExistEmail = await checkEmail(userData.email);
        // console.log(isExistEmail)
        if (isExistEmail === true) {
            return {
                EM: 'Email is already exist',
                EC: 1
            }
        }

        let hashUserPass = hashPassword(userData.password);

        await db.User.create({
            email: userData.email,
            phone: userData.phone,
            password: hashUserPass
        })
        return {
            EM: "Register successfully!",
            EC: 0
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Something wrong in service...",
            EC: -1
        }
    }

}

const checkPassword = (inputPassord, hashPassword) => {
    return bcrypt.compareSync(inputPassord, hashPassword);
}

const handleUserLogin = async (inputUser) => {
    try {
        let user = await db.User.findOne({
            where: { email: inputUser.email },
            raw: true,
            nest: true
        })
        console.log(inputUser);
        if (user) {
            let isCorrectPassword = checkPassword(inputUser.password, user.password)
            if (isCorrectPassword === true) {

                let payload = {
                    email: user.email,
                    userType: user.userType,
                    name: user.name
                }
                let token = jwtActions.createJWT(payload)
                return {
                    EM: 'Login success',
                    EC: 0,
                    DT: {
                        access_token: token,
                        userType: user.userType,
                        email: user.email,
                        name: user.name,
                        id: user.id
                    }
                }
            }
        }
        return {
            EM: 'Email or Password is incorrect',
            EC: 1,
            DT: ""
        }
    } catch (error) {
        return {
            EM: "Something wrong in service...",
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser, handleUserLogin, checkEmail, hashPassword
}