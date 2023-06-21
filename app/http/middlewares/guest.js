const guest = (req,res,next)=> {
    if(!req.isAuthenticated()) {   //means a user is not logged in
        return next()
    }
    return res.redirect('/')
}

module.exports = guest