import express from "express";
import homeController from "../controllers/homeController";

const router = express.Router();
const initWebRoutes = (app) => {


    router.get('/dashboard', homeController.getHomePage)
    router.get('/user', homeController.getUserPage)
    router.get('/doctor', homeController.getDoctorPage)
    router.get('/doctor/create-doctor', homeController.getCreateDoctorPage)
    router.post('/doctor/create-doctor', homeController.handleCreateNewDoctor)
    router.get('/doctor/update/:id', homeController.getUpdateDoctorPage)
    router.put('/doctor/update/:id', homeController.handleUpdateDoctor)
    router.delete('/doctor/delete/:id', homeController.handleDeleteDoctor)
    router.post('/delete-user/:id', homeController.handleDeleteNewUser)
    router.get('/update-user/:id', homeController.getUpdateUserPage)
    router.post('/users/update-user', homeController.postUpdateUser)

    return app.use("/", router)
}
export default initWebRoutes;