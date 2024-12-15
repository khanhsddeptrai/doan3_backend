import db from '../models/index';
import dataFormatterUtil from '../utils/dataFormatterUtil';
import formatUtils from '../utils/formatUtil';

const getDoctorsPage = async (req, res) => {
    try {
        const doctors = await db.Doctor.findAll({
            include: [
                { model: db.User },
                { model: db.Facility },
                { model: db.Specialty },
                // { model: db.Schedule, include: [
                    // { model: db.Booking },
                // ]},
            ],
            raw: true,
            nest: true
        })

        const schedule = await db.Schedule.findAll({
            include: [
                { model: db.Doctor },
            ],
            raw: true,
            nest: true
        })
        // let schedulesArray = []
        // doctors.forEach(doctor => {
        //     schedulesArray.push(doctor.Schedules.date)
        // })
        // let schedulesToday = await dataFormatterUtil.countToday(schedulesArray)
        // const scheduleDates = schedule.map(sche => sche.date + ', ' + sche.doctorId)
        return res.render('layouts/layout', {
            page: `pages/doctorList.ejs`,
            pageTitle: 'doctor manager',
            doctors: doctors,
            totalDoctor: doctors.length,
            // schedulesToday: schedulesToday,
            // bookingsToday: bookingsToday,
        })
    } catch (error) {
        console.error(error)
    }
}

// --------------------------------------------------
const getDoctorDetailPage = async (req, res) => {
    try {
        const doctorId = req.params.id
        let doctor = await db.Doctor.findOne({
            where: { id: doctorId },
            include: [
                { model: db.User },
                { model: db.Facility },
                { model: db.Specialty },
                {
                    model: db.Schedule, include: [
                        { model: db.Timeslot },
                        { model: db.Booking },
                    ]
                }
            ],
            raw: true,
            nest: true
        })

        doctor = {
            ...doctor,
            price: formatUtils.formatCurrency(doctor.price)
        }

        const bookingId = doctor.Schedules.Bookings.id
        const bookingData = await db.Booking.findOne({
            where: { id: bookingId },
            include: [{
                model: db.Patient, include: [{
                    model: db.User
                }]
            }, { model: db.Schedule, include: [{ model: db.Timeslot }] }],
            raw: true,
            nest: true
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