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
    const today = new Date();
    const formattedToday = bookingServices.formatDate(today);

    const todayBookings = bookings.filter(bo => bookingServices.formatDate(bo.date) === formattedToday);
    const bookingData = bookings.map(bo => ({
        ...bo, date: bookingServices.formatDate(bo.date)
    }))

    return res.render('layouts/layout', {
        page: `pages/bookingList.ejs`,
        pageTitle: 'Booking manager',
        bookings: bookingData,
        totalBooking: bookings.length,
        todayBookings: todayBookings
    })
}

// --------------------------------------------------
const getBookingDetailPage = async (req, res) => {
    const bookingId = req.params.id
    const booking = await db.Booking.findOne({
        where: { id: bookingId },
        include: [
            {
                model: db.Patient,
                include: [{ model: db.User }]
            },
            {
                model: db.Schedule,
                include: [
                    {
                        model: db.Doctor, include: [
                            { model: db.User },
                            { model: db.Facility },
                            { model: db.Specialty },
                        ]
                    },
                    { model: db.Timeslot }
                ]
            }
        ],
        raw: true,
        nest: true
    })

    const bookingData = {
        ...booking,
        date: bookingServices.formatDate(booking.date),
        createdAt: bookingServices.formatDate(booking.createdAt),
        updatedAt: bookingServices.formatDate(booking.updatedAt)
    }
    return res.render('layouts/layout', {
        page: `pages/bookingDetail.ejs`,
        pageTitle: 'Thông tin lịch hẹn',
        booking: bookingData
    })
}

// --------------------------------------------------
const approveBooking = async (req, res) => {
    try {
        const { bookingId } = await req.body
        const bookingUpdated = await db.Booking.update(
            {
                status: 'Đã duyệt'
            },
            {
                where: { id: bookingId },
                raw: true,
                nest: true
            }
        )

        console.log(bookingUpdated)
        return res.redirect(`/booking-detail/${bookingId}`)
    } catch (error) {
        console.error(error)
    }
}

const rejectBooking = async (req, res) => {
    try {
        const { bookingId } = await req.body
        const bookingUpdated = await db.Booking.update(
            {
                status: 'Hủy'
            },
            {
                where: { id: bookingId },
                raw: true,
                nest: true
            }
        )

        console.log(bookingUpdated)
        return res.redirect(`/booking-detail/${bookingId}`)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getBookingsPage,
    getBookingDetailPage,

    approveBooking,
    rejectBooking
}