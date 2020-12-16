
module.exports = function (req,res,next) {
    if (!req.newUser.isAdmin) {
        return res.status(403).send('you are not admein user...')
    }
    next()

}
