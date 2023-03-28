function guestMiddleware(req, res, next) {// s estoy logueado solo redirijo a profile
    if (req.session.userLogged) {
        return res.redirect('/users/profile');
    }
    next();
}

module.exports = guestMiddleware;