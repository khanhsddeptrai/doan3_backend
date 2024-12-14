import db from '../models/index';
import formatUtils from '../utils/formatUtil';

const getBookingsPage = async (req, res) => {
    const bookings = await db.Booking.findAll({
        include: [
            { model: db.Patient },
            { model: db.Schedule, include: [{ model: db.Doctor, include: [{ model: db.User }] }] }
        ],
        raw: true,
        nest: true
    })
    const today = new Date();
    const formattedToday = formatUtils.formatDate(today);

    const todayBookings = bookings.filter(bo => formatUtils.formatDate(bo.date) === formattedToday);
    const bookingData = bookings.map(bo => ({
        ...bo, date: formatUtils.formatDate(bo.date)
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
    try {
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
                        { model: db.Doctor, include: [{ model: db.User }, { model: db.Specialty }, { model: db.Facility }] },
                        { model: db.Timeslot }
                    ]
                }
            ],
            raw: true,
            nest: true
        })
        
        const bookingData = {
            ...booking,
            date: formatUtils.formatDate(booking.date),
            status: booking.status === 'pending' ? 'Từ chối' : booking.status === 'aprowaprow' ? 'Đã nhận' : 'Hủy',
            price: formatUtils.formatCurrency(booking.Schedule.Doctor.price),
            createdAt: formatUtils.formatDate(booking.createdAt),
            updatedAt: formatUtils.formatDate(booking.updatedAt)
        }
        return res.render('layouts/layout', {
            page: `pages/bookingDetail.ejs`,
            pageTitle: 'Chi tiết lịch hẹn',
            booking: bookingData
        }) 
    } catch (error) {
        console.error(error)
    }
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