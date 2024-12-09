import db from '../models/index';

const getSpecialtiesPage = async (req, res) => {
    const specialties = await db.Specialty.findAll({
        include: [
            { model: db.Doctor },
        ],
        raw: true,
        nest: true
    })

    return res.render('layouts/layout', {
        page: `pages/specialtyList.ejs`,
        pageTitle: 'Quản lý chuyên khoa',
        specialties: specialties
    })
}

const getSpecialtyDetailPage = async (req, res) => {
    const specialId = req.params.id
    const specialty = await db.Specialty.findOne({
        where: { id: specialId },
        raw: true,
        nest: true
    })

    const doctors = await db.Doctor.findAll({
        where: { specialtyId: specialId },
        include: [
            { model: db.Facility },
            { model: db.User }
        ],
        raw: true,
        nest: true
    })

    return res.render('layouts/layout', {
        page: `pages/specialtyDetail.ejs`,
        pageTitle: 'Chi tiết chuyên khoa',
        specialty: specialty,
        doctors: doctors
    })
}


module.exports = {
    getSpecialtiesPage, getSpecialtyDetailPage
}