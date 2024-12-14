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

const checkPassword = (inputPassord, hashPassword) => {
    return bcrypt.compareSync(inputPassord, hashPassword);
}

const registerNewUser = async (userData) => {
    console.log("check user register: ", userData)
    try {
        let isExistEmail = await checkEmail(userData.email);
        if (isExistEmail === true) {
            return {
                EM: 'Email đã được đăng ký!',
                EC: 1
            }
        }

        let hashUserPass = hashPassword(userData.password);

        let newPatient = await db.User.create({
            email: userData.email,
            password: hashUserPass,
            name: userData.name,
            address: userData.address,
            sex: userData.sex,
            phone: userData.phone,
            userType: "patient"
        })

        await db.Patient.create({
            citizenId: userData.citizenId,
            userId: newPatient.id
        });

        return {
            EM: "Đăng ký thành công!",
            EC: 0
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Lỗi hệ thống...",
            EC: -1
        }
    }

}

const handleUserLogin = async (inputUser) => {
    try {
        let user = await db.User.findOne({
            include: [{
                model: db.Patient
            }],
            where: { email: inputUser.email },
            raw: true,
            nest: true
        })
        console.log("check patient id: ", user.Patients.id)
        let id;
        if (user) {
            let isCorrectPassword = checkPassword(inputUser.password, user.password)
            if (isCorrectPassword === true) {
                if (user.userType === 'patient') {
                    id = user.Patients.id;
                }
                let payload = {
                    email: user.email,
                    userType: user.userType,
                    name: user.name,
                    id
                }
                let token = jwtActions.createJWT(payload)
                return {
                    EM: 'Đăng nhập thành công!',
                    EC: 0,
                    DT: {
                        access_token: token,
                        userType: user.userType,
                        email: user.email,
                        name: user.name,
                        patientId: id
                    }
                }
            }
        }
        return {
            EM: 'Sai Email hoặc mật khẩu!',
            EC: 1,
            DT: ""
        }
    } catch (error) {
        return {
            EM: "Lỗi hệ thống...",
            EC: -2
        }
    }
}

module.exports = {
    registerNewUser, handleUserLogin, checkEmail, hashPassword
}