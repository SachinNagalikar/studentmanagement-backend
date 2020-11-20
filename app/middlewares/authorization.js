function authorization(req, res, next) {
    const user = req.user
    if (user.role == "faculty") {
        next()
    } else {
        res.send('unauthorized access')
    }
}

module.exports = {
    authorization
}