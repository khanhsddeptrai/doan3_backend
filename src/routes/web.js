import express from "express";
import homeController from "../controllers/homeController";
import doctorController from '../controllers/doctorController';
import patientController from '../controllers/patientController';
import specialtyController from '../controllers/specialtyController';
import facilityController from '../controllers/facilityController';
import bookingController from '../controllers/bookingController';
import userController from '../controllers/userController';


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

    // Người dùng
    router.get('/user-detail/:id', userController.getUserDetailPage)


    // Bác sĩ
    router.get('/doctor-list', doctorController.getDoctorsPage)
    router.get('/doctor-detail/:id', doctorController.getDoctorDetailPage)

    // Bệnh nhân
    router.get('/patient-list', patientController.getPatientsPage)
    router.get('/patient-detail/:id', patientController.getPatientDetailPage)

    // Chuyên khoa
    router.get('/specialty-list', specialtyController.getSpecialtiesPage);
    router.get('/specialty-detail/:id', specialtyController.getSpecialtyDetailPage)

    // Cơ sở y tế
    router.get('/facility-list', facilityController.getFacilitiesPage);
    router.get('/facility-detail/:id', facilityController.getFacilityDetailPage);

    // Lịch hẹn
    router.get('/booking-list', bookingController.getBookingsPage);
    router.get('/booking-detail/:id', bookingController.getBookingDetailPage);


    return app.use("/", router)
}
export default initWebRoutes;