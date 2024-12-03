import userServices from '../services/userService';


const getHomePage = async (req, res) => {
    return res.render('layouts/layout', {
        page: `pages/dashboard`,
        pageTitle: 'Dashboard'
    })
}

const getUserPage = async (req, res) => {
    let users = await userServices.getAllUser();
    console.log(req.cookies);
    return res.render('layouts/layout', {
        page: `pages/user`,
        pageTitle: 'Manager users',
        users: users
    })
}

const getDoctorPage = async (req, res) => {
    let doctors = await userServices.getAllDoctor();
    return res.render('layouts/layout', {
        page: `pages/doctor`,
        pageTitle: 'Manager doctor',
        doctors: doctors
    })
}

const getCreateDoctorPage = async (req, res) => {
    let specialties = await userServices.getAllSpecialty();
    let facilities = await userServices.getAllFacility();
    return res.render('layouts/layout', {
        page: `pages/createDoctor`,
        pageTitle: 'Create new doctor',
        specialties: specialties,
        facilities: facilities

    })
}

const handleCreateNewDoctor = async (req, res) => {
    try {
        let data = await userServices.createNewDoctor(req.body)
        res.redirect("/doctor")
        return data
    } catch (error) {
        return res.send(error)
    }

}

const getUpdateDoctorPage = async (req, res) => {
    let specialties = await userServices.getAllSpecialty();
    let facilities = await userServices.getAllFacility();

    let doctor = await userServices.getDoctorById(req.params.id)

    return res.render('layouts/layout', {
        page: `pages/editDoctor`,
        pageTitle: 'Edit doctor',
        specialties: specialties,
        facilities: facilities,
        doctor: doctor
    })
}

const handleUpdateDoctor = async (req, res) => {
    let id = req.params.id;
    await userServices.UpdateDoctorInfor(req.body, id);
    res.redirect("/doctor")
}

const handleDeleteDoctor = async (req, res) => {
    let id = req.params.id;
    console.log("check id:", id)
    await userServices.deleteDoctorById(id);
    res.redirect("/doctor")
}

const handleCreateNewUser = async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const username = req.body.username;
    const address = req.body.address;

    userServices.createNewUser(email, password, username, address)

    return res.redirect('back');
}

const handleDeleteNewUser = async (req, res) => {
    let id = req.params.id;
    await userServices.deleteUser(id);

    return res.redirect('back');
}

const getUpdateUserPage = async (req, res) => {
    let id = req.params.id;
    let user = await userServices.getUserById(id);
    return res.render('updateUser', { user })
}



const postUpdateUser = async (req, res) => {
    let email = req.body.email;
    let username = req.body.username;
    let address = req.body.address;
    let id = req.body.id;
    await userServices.updateUserInfor(email, username, address, id)
    return res.redirect("/user")
}

module.exports = {
    getHomePage, getUserPage, handleCreateNewUser, handleDeleteNewUser, getUpdateUserPage, postUpdateUser,
    getDoctorPage, getCreateDoctorPage, handleCreateNewDoctor, getUpdateDoctorPage, handleUpdateDoctor,
    handleDeleteDoctor
}