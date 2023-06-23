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
            
            order.save().then(result =>{
                Order.populate(result , { path:'customerId' }).then(placedOrder =>{
                    req.flash('success', 'Order placed successfully')
                    delete req.session.cart
                    //emit that order has been placed to event emitter
                    const eventEmitter = req.app.get('eventEmitter')
                    eventEmitter.emit('orderPlaced', placedOrder)
                    return res.redirect('/customer/orders')
                }).catch(err =>{
                        console.log(err)
                })
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
        },
        async showStatus(req,res){
            const order = await Order.findById(req.params.id)
            //Authorize user (a user can se status of his own orders only not others)
            if(req.user._id.toString() === order.customerId.toString()){
                return res.render('customers/singleOrder', { order:order })  //same as res.render('customers/singleOrder',{order})
            }
            return res.redirect('/')
        }
    }
}

module.exports = orderController