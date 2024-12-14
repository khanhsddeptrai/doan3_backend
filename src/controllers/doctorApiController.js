import doctorApiService from '../services/doctorApiService';

const readDoctor = async (req, res) => {
    try {
        let data = await doctorApiService.getAllDoctor();
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(200).json({
            EM: "Something wrong from server!",
            EC: "-1",
            DT: ""
        })
    }

}

const readDoctorDetail = async (req, res) => {
    try {
        let doctorId = req.params.id
        let data = await doctorApiService.getDoctorDetail(doctorId);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(200).json({
            EM: "Something wrong from server!",
            EC: "-1",
            DT: ""
        })
    }

}

// const getDoctorSchedule = async (id) => {
//     try {
//         let data = await doctorApiService.getDoctorScheduleByDoctorId(id);
//         return res.status(200).json({
//             EM: data.EM,
//             EC: data.EC,
//             DT: data.DT
//         })
//     } catch (error) {
//         return res.status(200).json({
//             EM: "Something wrong from server!",
//             EC: "-1",
//             DT: ""
//         })
//     }
// }

module.exports = {
    readDoctor, readDoctorDetail
}