// import scheduleApiService from '../services/scheduleApiService';

// const readSchedule = async (req, res) => {
//     try {
//         let data = await scheduleApiService.getAllScheduleByDoctorId(req.params.id)
//         if (data) {
//             return res.status(200).json({
//                 EM: data.EM,
//                 EC: data.EC,
//                 DT: data.DT
//             })
//         }
//     } catch (error) {
//         return res.status(200).json({
//             EM: "Something wrong from server!",
//             EC: 1,
//             DT: []
//         })
//     }
// }

// module.exports = {
//     readSchedule
// }