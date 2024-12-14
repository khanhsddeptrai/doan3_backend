import db from '../models/index';
import bookingController from './bookingController'

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
    try {
        const doctorId = req.params.id
        const doctor = await db.Doctor.findOne({
            where: { id: doctorId },
            include: [
                { model: db.User },
                { model: db.Facility },
                { model: db.Specialty },
                {
                    model: db.Schedule, include: [
                        { model: db.Timeslot },
                        { model: db.Booking }
                    ]
                }
            ],
            raw: true,
            nest: true
        })

        const bookingId = doctor.Schedules.Bookings.id
        const bookingData = await db.Booking.findOne({
            where: { id: bookingId },
            include: [{
                model: db.Patient, include: [{
                    model: db.User
                }]
            }, { model: db.Schedule, include: [{ model: db.Timeslot }] }]
        })

        return res.render('layouts/layout', {
            page: `pages/doctorDetail.ejs`,
            pageTitle: 'doctor detail',
            doctor: doctor,
            schedules: doctor.Schedules,
            bookings: bookingData
        })
    } catch (error) {
        console.error(error)
    }
}

// --------------------------------------------------
module.exports = {
    getDoctorsPage, getDoctorDetailPage
}