import bookingApiService from '../services/bookingApiService';

const createBooking = async (req, res) => {
    try {
        let data = await bookingApiService.createNewBooking(req.body);
        return res.status(200).json({
            EM: data.EM,
            EC: data.EC,
            DT: data.DT
        })
    } catch (error) {
        return res.status(200).json({
            EM: "Something wrong from server!",
            EC: "-1",
            DT: ""
        })
    }

}

const readBooking = async (req, res) => {
    try {
        let page = req.query.page;
        let limit = req.query.limit;
        let data = await bookingApiService.getAllBookingByDoctorId(req.params.id, +page, +limit)
        if (data) {
            return res.status(200).json({
                EM: data.EM,
                EC: data.EC,
                DT: data.DT
            })
        }
    } catch (error) {
        return res.status(200).json({
            EM: "Something wrong from server!",
            EC: 1,
            DT: []
        })
    }
}


module.exports = {
    createBooking, readBooking
}