//const homeController = require('../app/http/controllers/homeController')
const { index } = require('../app/http/controllers/homeController')()
const { login , postLogin , register , postRegister , logout } = require('../app/http/controllers/authController')()
const { cart , updateCart } = require('../app/http/controllers/customer/cartController')()
const { store, allOrders } = require('../app/http/controllers/customer/orderController')()
const { adminOrders } = require('../app/http/controllers/admin/orderController')()
const guest = require('../app/http/middlewares/guest')
const auth = require('../app/http/middlewares/auth')
const admin = require('../app/http/middlewares/admin')

const initRoutes = (app) => {
    app.get('/' , index)
    //app.get('/' , homeController().index)  //here (req,res) are automatically passed to second argument of app.get() then the are eventually passed to homeController().index
    //here homecontroller() returns an object from which we are calling index method using '.' operator
    // (req,res)=>{
    //     res.render('home')
    // }
    
    app.get('/login', guest, login)

    app.post('/login', postLogin)
    
    app.get('/register', guest, register)

    app.post('/register' , postRegister)

    app.post('/logout', logout)

    app.get('/cart' , cart)

    app.post('/update-cart' , updateCart)

    app.post('/orders' , auth , store)

    app.get('/customer/orders', auth , allOrders)

    //Admin routes
    app.get('/admin/orders' , admin , adminOrders)
    
}

module.exports = initRoutes