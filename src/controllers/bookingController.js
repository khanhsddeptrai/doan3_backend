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
        price: bookingServices.formatCurrency(booking?.Schedule?.Doctor?.price || 0),
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