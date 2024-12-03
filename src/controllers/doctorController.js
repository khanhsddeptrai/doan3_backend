import db from '../models/index';

const getDoctorsPage = async (req, res) => {
    const doctors = await db.Doctor.findAll({
        include: [
            {
                model: db.User,
                attributes: ['name', 'email', 'id']

            },
            {
                model: db.Facility,
                attributes: ['name']
            },
            {
                model: db.Specialty,
                attributes: ['name']
            }

        ], raw: true,
        nest: true
    })
    return res.render('layouts/layout', {
        page: `pages/doctorList.ejs`,
        pageTitle: 'doctor manager',
        doctors: doctors,
        totalDoctor: doctors.length
    })
}

// --------------------------------------------------
const getDoctorDetailPage = async (req, res) => {
    const doctorId = req.params.id
    console.log(doctorId)
    const doctor = await db.Doctor.findOne({
        where: { id: doctorId },
        include: [
            {
                model: db.User,
            },
            {
                model: db.Facility,
                attributes: ['name']
            },
            {
                model: db.Specialty,
                attributes: ['name']
            }

        ], raw: true,
        nest: true
    })
    console.log(doctor)
    return res.render('layouts/layout', {
        page: `pages/doctorDetail.ejs`,
        pageTitle: 'doctor detail',
        doctor: doctor
    })
}
module.exports = {
    getDoctorsPage, getDoctorDetailPage
}