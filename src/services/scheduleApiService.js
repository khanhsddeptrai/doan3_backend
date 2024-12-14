// import { where } from "sequelize/lib/sequelize";
// import db from "../models";
// import { raw } from "body-parser";

// const getAllScheduleByDoctorId = async (Id) => {

//     try {
//         const bookings = await db.Booking.findAll({
//             attributes: ['status', 'date'],
//             raw: true,
//             nest: true,
//             include: [
//                 {
//                     model: db.Schedule,
//                     include: [{ model: db.Timeslot, attributes: ['startTime', 'endTime'] }],
//                     where: { doctorId: Id }
//                 },
//             ],
//             include: [
//                 {
//                     model: db.Patient,
//                     attributes: ['citizenId'],
//                     include: [
//                         {
//                             model: db.User,
//                             attributes: ['name', 'phone'],
//                         },
//                     ],
//                 },
//             ],
//         });
//         if (bookings) {
//             return {
//                 EM: "Get data success!",
//                 EC: 0,
//                 DT: bookings
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

// module.exports = {
//     getAllScheduleByDoctorId
// }