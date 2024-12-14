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

const readBooking = async () => {
    try {
        let data = await bookingApiService({
            // attributes: ['id', 'username', 'email', "phone", "sex"],
            // include: { model: db.Group, attributes: ['name', 'description'] }
        })

        if (users) {
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
    createBooking, readBooking
}