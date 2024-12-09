import db from "../models";

const createNewBooking = async (data) => {
    try {
        let booking = await db.Booking.create({ ...data, status: "pending" });
        if (booking) {
            return {
                EM: "Create boooking success!",
                EC: 0,
                DT: booking
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
    createNewBooking
}