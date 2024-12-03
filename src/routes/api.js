import express from "express";
import apiController from "../controllers/apiController";
import userApiController from '../controllers/userApiController';
import jwtActions from '../middleware/JWTAction';

const router = express.Router();
const initApiRoutes = (app) => {

    router.post('/register', apiController.handleRegister)
    router.post('/login', apiController.handleLogin)
    router.get('/account', jwtActions.checkUserJWT, userApiController.getUserAccount)

    router.get('/user/read', jwtActions.checkUserJWT, userApiController.readUser)
    router.post('/user/create', userApiController.createUser)
    router.put('/user/update', userApiController.updateUser)
    router.delete('/user/delete', userApiController.deleteUser)


    return app.use("/api/", router)
}
export default initApiRoutes;