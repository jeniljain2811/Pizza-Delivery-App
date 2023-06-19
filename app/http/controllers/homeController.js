const Menu = require('../../models/menu')   
const homeController = () => {
    return {
        async index(req,res){  // same as index : function(){ res.render('home') }
            const pizzas = await Menu.find()
            return res.render('home' , { pizzas : pizzas })
        }

        //same as
        //index(req,res){
            // Menu.find().then((pizzas)=>{
            //     return res.render('home' , { pizzas : pizzas })
            // })
        //}
    }
}

module.exports = homeController