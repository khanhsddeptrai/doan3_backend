import db from '../models/index';
import formatUtils from '../utils/formatUtil';

const getFacilitiesPage = async (req, res) => {
    try {
        const facilities = await db.Facility.findAll({
            include: [
                { model: db.Doctor, as: 'doctors' },
            ],
            raw: true,
            nest: true
        })
    
        return res.render('layouts/layout', {
            page: `pages/facilityList.ejs`,
            pageTitle: 'Quản lý cơ sở y tế',
            facilities: facilities
        })
    } catch (error) {
        console.error(error)
    }
}

const getFacilityDetailPage = async (req, res) => {
    const facilityId = req.params.id
    const facility = await db.Facility.findOne({
        where: { id: facilityId },
        raw: true,
        nest: true
    })

    const doctors = await db.Doctor.findAll({
        where: { facilityId: facilityId },
        include: [
            { model: db.Specialty },
            { model: db.User },
        ],
        raw: true,
        nest: true
    })

    const facilityData =  {
        ...facility,
        createdAt: formatUtils.formatDate(facility.createdAt),
        updatedAt: formatUtils.formatDate(facility.updatedAt)
    }

    return res.render('layouts/layout', {
        page: `pages/facilityDetail.ejs`,
        pageTitle: 'Chi tiết Cơ sở',
        facility: facilityData,
        doctors: doctors
    })
}
module.exports = {
    getFacilitiesPage, getFacilityDetailPage
}