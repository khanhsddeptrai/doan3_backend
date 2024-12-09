import db from "../models";

const fetchDoctors = async (query) => {
    try {
        let doctors = await db.Doctor.findAll({
            ...query,
            raw: true,
            nest: true
        });
        return {
            EM: doctors.length ? "Get doctor success!" : "Get data success!",
            EC: doctors.length ? 0 : 1,
            DT: doctors
        };
    } catch (error) {
        return {
            EM: "Something wrong from service!!!",
            EC: 1,
            DT: []
        };
    }
};

const getAllDoctor = async () => {
    return await fetchDoctors({
        include: [
            { model: db.User },
            { model: db.Specialty },
            { model: db.Facility },
            {
                model: db.Schedule,
                include: [{ model: db.Timeslot }]
            }
        ]
    });
};

const getDoctorDetail = async (id) => {
    return await fetchDoctors({
        where: { id },
        include: [
            { model: db.User },
            { model: db.Specialty },
            { model: db.Facility },
            {
                model: db.Schedule,
                include: [{ model: db.Timeslot }]
            }
        ]
    });
};

module.exports = {
    getAllDoctor,
    getDoctorDetail
};
