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
                await schedule.update({
                    currentNumber: schedule.currentNumber + 1,
                });
            }

            return {
                EM: "Create booking success!",
                EC: 0,
                DT: booking,
            };
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


const getAllBookingByDoctorId = async (id) => {
    try {
        let bookings = await db.Booking.findAll({
            where: { id }
        })

        if (bookings) {
            return {
                EM: "Get data success!",
                EC: 0,
                DT: users
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