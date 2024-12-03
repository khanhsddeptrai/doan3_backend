import express from "express";
import apiController from "../controllers/apiController";
import userController from '../controllers/userController';
import jwtActions from '../middleware/JWTAction';

const router = express.Router();
const initApiRoutes = (app) => {

    router.post('/register', apiController.handleRegister)
    router.post('/login', apiController.handleLogin)
    router.get('/account', jwtActions.checkUserJWT, userController.getUserAccount)

    router.get('/user/read', jwtActions.checkUserJWT, userController.readUser)
    router.post('/user/create', userController.createUser)
    router.put('/user/update', userController.updateUser)
    router.delete('/user/delete', userController.deleteUser)


    return app.use("/api/", router)
}
export default initApiRoutes;