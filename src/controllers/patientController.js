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
            where: { userId: patientId },
            include: [
                { model: db.User },
            ],
            raw: true,
            nest: true
        })
        const bookings = await db.Booking.findAll({
            where: { patientId: patientId },
            raw: true,
            nest: true
        })
        console.log(bookings)
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