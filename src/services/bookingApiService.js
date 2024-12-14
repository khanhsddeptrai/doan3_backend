import db from "../models";

const createNewBooking = async (data) => {
    try {
        // Tạo booking mới
        let booking = await db.Booking.create({ ...data, status: "pending" });

        if (booking) {
            // Tìm lịch trình tương ứng
            let schedule = await db.Schedule.findOne({
                where: { id: data.scheduleId },
            });

            // Nếu lịch trình tồn tại, tăng currentNumber
            if (schedule) {
                if (schedule.currentNumber < schedule.maxNumber) {
                    // Tăng số lượng nếu chưa đạt giới hạn
                    await schedule.update({
                        currentNumber: schedule.currentNumber + 1,
                    });

                    return {
                        EM: "Create booking success!",
                        EC: 0,
                        DT: booking,
                    };
                } else {
                    // Trả về lỗi nếu đã đạt giới hạn
                    return {
                        EM: "Schedule is fully booked!",
                        EC: 1,
                        DT: [],
                    };
                }
            }

        } else {
            return {
                EM: "Failed to create booking!",
                EC: 1,
                DT: [],
            };
        }
    } catch (error) {
        console.error("Error in createNewBooking:", error);
        return {
            EM: "Something went wrong from service!",
            EC: 1,
            DT: [],
        };
    }
};

const getAllBookingByDoctorId = async (Id) => {

    try {
        const bookings = await db.Booking.findAll({
            attributes: ['status', 'date'],
            raw: true,
            nest: true,
            include: [
                {
                    model: db.Schedule,
                    include: [{ model: db.Timeslot, attributes: ['startTime', 'endTime'] }],
                    where: { doctorId: Id }
                },
            ],
            include: [
                {
                    model: db.Patient,
                    attributes: ['citizenId'],
                    include: [
                        {
                            model: db.User,
                            attributes: ['name', 'phone'],
                        },
                    ],
                },
            ],
        });
        if (bookings) {
            return {
                EM: "Get data success!",
                EC: 0,
                DT: bookings
            }
        } else {
            return {
                EM: "Get data success!",
                EC: 1,
                DT: []
            }
        }
    } catch (error) {
        return {
            EM: "Something wrong from service!!!",
            EC: 1,
            DT: []
        }
    }
}


module.exports = {
    createNewBooking, getAllBookingByDoctorId
}