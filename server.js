const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')
const connectDB = require('./app/config/db')
const session = require('express-session')
const flash = require('express-flash')
const MongoDBStore = require('connect-mongo')

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

app.use(express.json())

app.use(flash())

//Ststic Assets
app.use(express.static('public'))

//Global Middleware
app.use((req, res, next)=> {
    res.locals.session = req.session
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