const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')

const authController = () => {

    function _getRedirectUrl(req){
        return req.user.role === 'admin' ? '/admin/orders' : '/customer/orders'
    }

    return {
        login(req,res){  
            res.render('auth/login')
        },
        postLogin(req,res,next){
            const { email, password }   = req.body
             // Validate request 
             if(!email || !password) {
                req.flash('error', 'All fields are required')
                return res.redirect('/login')
            }
            passport.authenticate('local' , (err, user, info)=>{  // remember func done(err/null, user/false, {msg})
                if(err){
                    req.flash('error', info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }

                req.logIn(user, (err)=>{
                    if(err){
                        req.flash('error', info.message)
                        return next(err)
                    }
                    return res.redirect(_getRedirectUrl(req))
                })
            })(req,res,next)
        },
        register(req,res){  
            res.render('auth/register')
        },
        async postRegister(req,res){
            const { name, email, password } = req.body

            //Validate Request
            if(!name || !email || !password){
                req.flash('error' , 'All fields are required')
                req.flash('name', name)
                req.flash('email', email)
                return res.redirect('/register')
            }
            
            //Check if email already exists
            //User.exists({ email:email }, (err,result)=>{    
            const userExists = await User.exists({ email:email })
                if(userExists){
                    req.flash('error' , 'User Already exists..')
                    req.flash('name', name)
                    req.flash('email', email)
                    return res.redirect('/register')
                }
            //same as
            //const user = await User.findOne({ email:email })
            //if(user) {}
            //and if you want to check that if a user with name=name and email=email exists then write const user = await User.findOne({email:email},{name:name})
            //and if you want to check if a user with either name=name or email=email exists then write const user = await User.findOne({"$or":[{email: email},{phone:phone}]})

            //if all this are fine then create a user
            //encrypt the password
            const hashedPassword = await bcrypt.hash(password , 10)
            const user = new User({
                name,
                email,
                password: hashedPassword
            })

            user.save().then(user =>{
                //Login
                return res.redirect('/')
            }).catch(err =>{
                req.flash('error' , 'Something Went Wrong..')
                return res.redirect('/register')
            })
        },
        logout(req,res){
            req.logout(function(err) {
                if (err) { return next(err); }
                res.redirect('/login');
            })
        }
    }
}

module.exports = authController