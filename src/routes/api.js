import express from "express";
import apiController from "../controllers/apiController";
import userApiController from '../controllers/userApiController';
import jwtActions from '../middleware/JWTAction';
// import homeApiController from '../controllers/homeApiController';
import doctorApiController from '../controllers/doctorApiController';
import bookingApiController from '../controllers/bookingApiController';

const router = express.Router();
const initApiRoutes = (app) => {

    router.post('/register', apiController.handleRegister)
    router.post('/login', apiController.handleLogin)
    router.get('/account', jwtActions.checkUserJWT, userApiController.getUserAccount)

    // người dùng
    router.get('/user/read', jwtActions.checkUserJWT, userApiController.readUser)
    router.post('/user/create', userApiController.createUser)
    router.put('/user/update', userApiController.updateUser)
    router.delete('/user/delete', userApiController.deleteUser)

    // bác sĩ
    router.get('/doctor/read', doctorApiController.readDoctor)
    router.get('/doctor/read/:id', doctorApiController.readDoctorDetail)

    // đặt lịch
    router.post('/booking/create', bookingApiController.createBooking)

    return app.use("/api/", router)
}
export default initApiRoutes;