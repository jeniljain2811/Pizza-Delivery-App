require('dotenv').config()
const mongoose = require('mongoose')
function connectDB() {
    // Database connection 
    mongoose.connect(process.env.MONGO_CONNECTION_URL, { 
        useNewUrlParser: true, 
        useUnifiedTopology: true, 
    });
    const connection = mongoose.connection
    connection.once('open', () => {
        console.log('Database connected')
    })
}

module.exports = connectDB

//imported data of menu from pizza-menu.json using below command
//mongoimport mongodb+srv://Rahul:vyE7UaJPPADluwBK@cluster0.al2l3ze.mongodb.net/pizza --collection menus --jsonArray pizza-menu.json