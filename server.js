const express = require('express')
const app = express()
const path = require('path')
const ejs = require('ejs')
const expressLayouts = require('express-ejs-layouts')

const PORT = process.env.PORT || 3003

app.get('/' , (req,res)=>{
    res.render('home') //now you have to set path after views folder as you had set(app.set) that take layout files from views folder & now you just have to specify which file to take when
})

//Set Template Engine
app.use(expressLayouts)
//Set the layout files folder
app.set('views' , path.join(__dirname , '/resources/views'))
app.set('view engine' , 'ejs')

app.listen(PORT , ()=>{
    console.log(`Server on port ${PORT}`);
})