const Order = require('../../../models/order')
const moment = require('moment')

const orderController = ()=>{
    return {
        store(req,res){
            //Validate Request
            const { phone, address } = req.body
            if(!phone || !address){
                req.flash('error', 'All feilds are required')
                return res.redirect('/cart')
            }

            const order = new Order({
                customerId: req.user._id,    //with passport.js we can access currently logged in user by (req.user)
                items: req.session.cart.items,
                phone,
                address,
            })
            console.log(order)
            order.save().then(result =>{
                console.log(result)
                req.flash('success', 'Order placed successfully')
                delete req.session.cart
                return res.redirect('/customer/orders')
            }).catch(err =>{
                console.log(err)
                req.flash('error', 'Something went wrong..')
                return res.redirect('/cart')
            })
        },
        async allOrders(req,res){
            const orders = await Order.find({ customerId:req.user._id }, null, { sort:{ 'createdAt':-1 } })
            res.header('Cache-Control', 'no-store')
            return res.render('customers/orders', { orders:orders, moment:moment })
        }
    }
}

module.exports = orderController