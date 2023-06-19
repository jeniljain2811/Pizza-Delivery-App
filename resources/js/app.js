const axios = require('axios')  //same as "import axios from 'axios'"
import Noty from "noty"

const addToCartBtn = document.querySelectorAll('.add-to-cart')
const cartCounter = document.querySelector('.cart-counter')

function updateCart(currPizza) {
    axios.post('/update-cart', currPizza).then(res => {
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type: 'success',
            timeout: 1000,
            text: "Item added to cart..",
            layout: 'topLeft'
          }).show();
     }).catch(err => {
        new Noty({
            type: 'error',
            timeout: 1000,
            text: "Something went wrong..",
            layout: 'topLeft'
          }).show();
     })
}

addToCartBtn.forEach((btn)=>{
    btn.addEventListener('click' , (e)=>{
        let currPizza =  JSON.parse(btn.dataset.pizza)
        updateCart(currPizza)
    })
})