const LocalStrategy = require('passport-local').Strategy
const User = require('../models/user')
const bcrypt = require('bcrypt')

const init = (passport)=>{
    passport.use(new LocalStrategy({ usernameField:'email' } , async (email, password, done)=>{
        //Login
        //check if email exists
        const user = await User.findOne({ email:email })
        if(!user){
            return done(null, false, { message:'No User with this email' })
        }

        bcrypt.compare(password, user.password).then(match => {
            if(match) {
                return done(null, user, { message: 'Logged in succesfully' })
            }
            return done(null, false, { message: 'Wrong username or password' })
        }).catch(err => {
            return done(null, false, { message: 'Something went wrong' })
        })
    }))

    //to store logged in user._id in session
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    //this func is used to retrieve back the user from the id stored in session 
    passport.deserializeUser(async(id, done) => {
        // try{
        //     let userExists = await User.findById(id)
        //     if(userExists){
        //         done(null, userExists)
        //     }
        // }
        // catch(err){
        //     done(err, false)
        // }
        User.findById(id).then(user =>{
            done(null, user)
        }).catch(err =>{
            done(err, false)
        })
    })
    //by this func we can now get the currently logged in user by (req.user)
}

module.exports = init