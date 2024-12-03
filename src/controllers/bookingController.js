import db from '../models/index';
import bookingServices from '../services/bookingServices';

const getBookingsPage = async (req, res) => {
    const bookings = await db.Booking.findAll({
        include: [
            { model: db.History },
            { model: db.Patient },
            { model: db.Schedule }
        ],
        raw: true,
        nest: true
    })

    const bookingData = bookings.map(bo => ({
        ...bo, date: bookingServices.formatDate(bo.date)
    }))

    console.log(bookingData)

    return res.render('layouts/layout', {
        page: `pages/bookingList.ejs`,
        pageTitle: 'Booking manager',
        bookings: bookingData,
        totalBooking: bookings.length,
    })
}

// --------------------------------------------------
const getBookingDetailPage = async (req, res) => {
    const bookingId = req.params.id
    const booking = await db.Booking.findOne({
        where: { id: bookingId },
        include: [
            { model: db.History },
            {
                model: db.Patient,
                include: [{ model: db.User }]
            },
            {
                model: db.Schedule,
                include: [
                    { model: db.Doctor, include: [{ model: db.User }] },
                    { model: db.Timeslot }
                ]
            }
        ],
        raw: true,
        nest: true
    })
    console.log(booking)

    const bookingData = {
        ...booking,
        date: bookingServices.formatDate(booking.date),
        createdAt: bookingServices.formatDate(booking.createdAt),
        updatedAt: bookingServices.formatDate(booking.updatedAt)
    }

    return res.render('layouts/layout', {
        page: `pages/bookingDetail.ejs`,
        pageTitle: 'Chi tiết lịch hẹn',
        booking: bookingData
    })
}

module.exports = {
    getBookingsPage,
    getBookingDetailPage
}