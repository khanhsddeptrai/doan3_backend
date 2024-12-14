import db from "../models";

const getAllDoctor = async () => {
    try {
        let doctors = await db.Doctor.findAll({
            include: [
                { model: db.User, },
                { model: db.Specialty, },
                { model: db.Facility, }, {
                    model: db.Schedule,
                    include: [{ model: db.Timeslot }]
                }
            ],
            raw: true,
            nest: true
        });
        if (doctors) {
            return {
                EM: "Get doctor success!",
                EC: 0,
                DT: doctors
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

const getDoctorDetail = async (id) => {
    try {
        let doctor = await db.Doctor.findOne({
            where: { id: id },
            include: [
                { model: db.User, },
                { model: db.Specialty, },
                { model: db.Facility, }, {
                    model: db.Schedule,
                    include: [{ model: db.Timeslot }]
                }
            ],
            raw: true,
            nest: true
        })
        
        if (doctor) {
            return {
                EM: "Get doctor success!",
                EC: 0,
                DT: doctor
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

// const getDoctorScheduleByDoctorId = async (id) => {
//     try {
//         let doctorSchedule = await db.Schedule.findAll({
//             where: { doctorId: id },
//             nest: true
//         });
//         if (doctorSchedule) {
//             return {
//                 EM: "Get doctorSchedule success!",
//                 EC: 0,
//                 DT: doctorSchedule
//             }
//         } else {
//             return {
//                 EM: "Get data success!",
//                 EC: 1,
//                 DT: []
//             }
//         }
//     } catch (error) {
//         return {
//             EM: "Something wrong from service!!!",
//             EC: 1,
//             DT: []
//         }
//     }
// }

module.exports = {
    getAllDoctor, getDoctorDetail
}