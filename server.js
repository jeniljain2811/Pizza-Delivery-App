const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const connectDB = require('./app/config/db')
const session = require('express-session')
const flash = require('express-flash')
const MongoDBStore = require('connect-mongo')
const passport = require('passport')

const PORT = process.env.PORT || 3003

//Database Connection
connectDB()

//Session Config
app.use(session({
    secret: process.env.COOKIE_SECRET_KEY,
    resave:false,
    store: MongoDBStore.create({
        mongoUrl : process.env.MONGO_CONNECTION_URL
    }),
    saveUninitialized:false,
    cookie: { maxAge : 1000 * 60 * 60 * 24 } //means a  session will be expired in 24 hours ( You have to set expiry time more less as the security of your app grows like in bank apps its nearly 1-20 sec )
}))

//Passport config (remeber to write it after session config)
const passportInit = require('./app/config/passport')
passportInit(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use(flash())

//Ststic Assets
app.use(express.static('public'))

//to access form data
app.use(express.urlencoded({ extended:false }))

app.use(express.json())

//Global Middleware
app.use((req, res, next)=> {
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})

//Set Template Engine
app.use(expressLayouts)
//Set the layout files folder
app.set('views' , path.join(__dirname , '/resources/views'))
app.set('view engine' , 'ejs')

require('./routes/web')(app)

app.listen(PORT , ()=>{
    console.log(`Server on port ${PORT}`);
})