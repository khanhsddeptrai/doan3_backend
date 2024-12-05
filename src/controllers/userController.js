import db from '../models/index';
import bookingServices from '../services/bookingServices';

const getUserDetailPage = async (req, res) => {
    const userId = req.params.id
    const user = await db.User.findOne({
        where: { id: userId },
        raw: true,
        nest: true
    })
    const userData = {
        ...user,
        createdAt: bookingServices.formatDate(user.createdAt),
        updatedAt: bookingServices.formatDate(user.updatedAt)
    }

    return res.render('layouts/layout', {
        page: `pages/userDetail.ejs`,
        pageTitle: 'Chi tiết tài khoản',
        user: userData
    })
}

module.exports = {
    getUserDetailPage
}