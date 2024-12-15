import { asIs } from "sequelize"
import db from "../models"
import { checkEmail, hashPassword } from './loginService'
import { where } from "sequelize/lib/sequelize"

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            attributes: ['id', 'username', 'email', "phone", "sex"],
            include: { model: db.Group, attributes: ['name', 'description'] }

        });
        if (users) {
            return {
                EM: "Get data success!",
                EC: 0,
                DT: users
            }
        } else {
            return {
                EM: "Get data success!",
                EC: 1,
                DT: []
            }
        }
    } catch (error) {
        return {
            EM: "Something wrong from service!!!",
            EC: 1,
            DT: []
        }
    }
}

const getUserPaginate = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.Doctor.findAndCountAll({
            offset: offset,
            limit: limit,
            attributes: ['infor', 'price'],
            include: { model: db.User, attributes: ['email', 'name', 'phone'] },
            order: [["id", "DESC"]]
        })

        let totalPages = Math.ceil(count / limit)
        let data = {
            totalRows: count,
            totalPages: totalPages,
            users: rows
        }
        return {
            EM: "success!",
            EC: 0,
            DT: data
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Something wrong from service!!!",
            EC: 1,
            DT: []
        }
    }
}

const createNewUser = async (data) => {
    try {
        //check email
        let isExistEmail = await checkEmail(data.email);
        // console.log(isExistEmail)
        if (isExistEmail === true) {
            return {
                EM: 'Email is already exist',
                EC: 1,
                DT: []
            }
        }
        //hash password
        let hashUserPass = hashPassword(data.password)

        await db.User.create({ ...data, password: hashUserPass })
        return {
            EM: "Created successfully!",
            EC: 0,
            DT: []
        }
    } catch (error) {
        return {
            EM: "Something wrong from service!!!",
            EC: 1,
            DT: []
        }
    }
}

const updateUser = async (data) => {
    try {
        if (!data.groupId) {
            return {
                EM: "Error with groupId!",
                EC: 1,
                DT: 'group'
            }
        }

        let user = await db.User.findOne({
            where: { id: data.id }
        })
        if (user) {
            await user.update({
                phone: data.phone,
                username: data.username,
                sex: data.sex,
                groupId: data.groupId
            })
            return {
                EM: "Update user success!",
                EC: 0,
                DT: ''
            }
        } else {
            return {
                EM: "User not found!",
                EC: 2,
                DT: ''
            }
        }
    } catch (error) {
        return {
            EM: "Somgthing wrongs with services!",
            EC: 1,
            DT: []
        }
    }
}

const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })
        if (user) {
            await user.destroy()
            return {
                EM: "Delete user success!",
                EC: 0,
                DT: []
            }

        } else {
            return {
                EM: "User not found",
                EC: 2,
                DT: []
            }
        }
    } catch (error) {
        console.log(error)
        return {
            EM: "Something wrong from service!!!",
            EC: 1,
            DT: []
        }
    }
}

module.exports = {
    getAllUser, updateUser, createNewUser, deleteUser, getUserPaginate
}