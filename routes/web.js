//const homeController = require('../app/http/controllers/homeController')
const { index } = require('../app/http/controllers/homeController')()
const { login , register } = require('../app/http/controllers/authController')()
const { cart , updateCart } = require('../app/http/controllers/customer/cartController')()

const initRoutes = (app) => {
    app.get('/' , index)
    //app.get('/' , homeController().index)  //here (req,res) are automatically passed to second argument of app.get() then the are eventually passed to homeController().index
    //here homecontroller() returns an object from which we are calling index method using '.' operator
    // (req,res)=>{
    //     res.render('home')
    // }
    
    app.get('/login', login)
    
    app.get('/register', register)

    app.get('/cart' , cart)

    app.post('/update-cart' , updateCart)
    
}

module.exports = initRoutes