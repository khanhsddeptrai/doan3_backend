import db from '../models/index';

const getPatientsPage = async (req, res) => {
    const patients = await db.Patient.findAll({
        include: [
            {
                model: db.User,
            }
        ],
        raw: true,
        nest: true
    })
    return res.render('layouts/layout', {
        page: `pages/patientList.ejs`,
        pageTitle: 'patient manager',
        patients: patients
    })
}

// -----------------------------------------------------
const getPatientDetailPage = async (req, res) => {
    try {
        const patientId = req.params.id
        const patient = await db.Patient.findOne({
            where: { id: patientId },
            include: [
                { model: db.User },
            ],
            raw: true,
            nest: true
        })
        const bookings = await db.Booking.findAll({
            where: { patientId: patientId },
            include: [{
                model: db.Patient,
                include: [{
                    model: db.User
                }],
                model: db.Schedule,
                include: [
                    { model: db.Doctor, include: [{ model: db.User }] },
                    { model: db.Timeslot }
                ]
            }],
            raw: true,
            nest: true
        })
        console.log(bookings[0].Schedule.Timeslot.startTime)
        console.log(bookings[0].Schedule.Timeslot.endTime)
        return res.render('layouts/layout', {
            page: `pages/patientDetail.ejs`,
            pageTitle: 'Thông tin bệnh nhân',
            patient: patient,
            bookings: bookings
        })
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getPatientsPage,
    getPatientDetailPage
}