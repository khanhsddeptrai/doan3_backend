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
    const patientId = req.params.id
    const patient = await db.Patient.findOne({
        where: { userId: patientId },
        include: [
            {
                model: db.User,
            }
        ],
        raw: true,
        nest: true
    })
    return res.render('layouts/layout', {
        page: `pages/patientDetail.ejs`,
        pageTitle: 'Chi tiết bệnh nhân',
        patient: patient
    })
}

module.exports = {
    getPatientsPage,
    getPatientDetailPage
}