const cartController = () => {
    return {
        cart(req,res){ 
             res.render('customers/cart')
        },
        updateCart(req,res){
            //so this is how our cart object will look like
            // let cart = {
            //     items : {
            //         pizzaId1 : { item:pizzaID1Obj , qty:qty },
            //         pizzaId2 : { item:pizzaID2Obj , qty:qty },
            //         pizzaId2 : { item:pizzaID2Obj , qty:qty }
            //     },
            //     totalQty : totalQty,
            //     totalPrice:totalPrice
            // }

            //condition if cart is empty
            if (!req.session.cart) {
                req.session.cart = {
                    items: {},
                    totalQty: 0,
                    totalPrice: 0
                }
            }

            let cart = req.session.cart

            //check if we are adding a particular item for the first time
             if(!cart.items[req.body._id]) {
                cart.items[req.body._id] = {
                    item: req.body,
                    qty: 1
                }
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice = cart.totalPrice + req.body.price
            } else {
                cart.items[req.body._id].qty = cart.items[req.body._id].qty + 1
                cart.totalQty = cart.totalQty + 1
                cart.totalPrice =  cart.totalPrice + req.body.price
            }
            return res.json({ totalQty: req.session.cart.totalQty })
        }
    }
}

module.exports = cartController