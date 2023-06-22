const Order = require('../../../models/order')

const orderController = ()=> {
    return {
        adminOrders(req,res){
            //Populate Use: in our orders db we have linked the orders db with customer db via customerId in orders db so when we are getting the data from order db then we want to fetch entire customer obj instead of just Id & -password means it will not be fetched with customer obj
            Order.find({ status:{ $ne: 'completed' }}, null, { sort:{ 'createdAt':-1 }}).populate('customerId' , '-passowrd').exec().then(orders =>{
                if(req.xhr){
                    return res.json(orders)
                }
                res.render('admin/orders')
            }).catch(err =>{
                console.log(err)
            })
        }
    }
}

module.exports = orderController