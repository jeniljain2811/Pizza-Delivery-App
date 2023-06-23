const Order = require('../../../models/order')

function statusController() {
    return {
        updateStatus(req,res){
            Order.updateOne({ _id:req.body.orderId }, { status:req.body.status }).then(data =>{
                const eventEmitter = req.app.get('eventEmitter')
                eventEmitter.emit('orderUpdated', { id:req.body.orderId, status:req.body.status })
                return res.redirect('/admin/orders')
            }).catch(err =>{
                console.log(err)
            })
        }
    }
}

module.exports = statusController