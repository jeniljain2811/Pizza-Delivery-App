const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')

const PORT = process.env.PORT || 3003

//Ststic Assets
app.use(express.static('public'))

//Set Template Engine
app.use(expressLayouts)
//Set the layout files folder
app.set('views' , path.join(__dirname , '/resources/views'))
app.set('view engine' , 'ejs')

app.get('/' , (req,res)=>{
    res.render('home') //now you have to set path after views folder as you had set(app.set) that take layout files from views folder & now you just have to specify which file to take when
})

app.get('/cart' , (req,res)=>{
    res.render('customers/cart')
})

app.get('/login' , (req,res)=>{
    res.render('auth/login')
})

app.get('/register' , (req,res)=>{
    res.render('auth/register')
})

app.listen(PORT , ()=>{
    console.log(`Server on port ${PORT}`);
})