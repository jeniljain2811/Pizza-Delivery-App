const axios = require('axios')  //same as "import axios from 'axios'"
import Noty from "noty"
import { initAdmin } from './admin'
import moment from 'moment'

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


//Remove alert message after x seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg){
    setTimeout(() => {
        alertMsg.remove()
    }, 2000);
}


//change/update order status
let statuses = document.querySelectorAll('.status_line')
let hiddenInput = document.querySelector('#hiddenInput')
let order = hiddenInput ? hiddenInput.value : null
order = JSON.parse(order)
let time = document.createElement('small')
function updateStatus(order){
    statuses.forEach(status =>{
        status.classList.remove('step-completed')
        status.classList.remove('current')
    })
    let stepCompleted = true
    statuses.forEach(status =>{
        let dataProp = status.dataset.status
        if(stepCompleted){
            status.classList.add('step-completed')
        }
        if(dataProp === order.status){
            stepCompleted = false
            time.innerText = moment(order.updatedAt).format('hh:mm A')
            status.appendChild(time)
            if(status.nextElementSibling){
                status.nextElementSibling.classList.add('current')
            }
        }
    })
}

updateStatus(order)

//Socket
const socket = io()
initAdmin(socket)
if(order){
    //Join (when desired page loads then socket sends a join message having data ->'order_884ewbdnbw48weu392' and this we will use to create a private room to emit the message only to user whose order is this)
    socket.emit('join', `order_${order._id}`)
}

let adminAreaPath = window.location.pathname
if(adminAreaPath.includes('admin')){
    socket.emit('join', 'adminRoom')
}

socket.on('orderUpdated', (data)=>{
    const updatedOrder = { ...order }   //copying the current order by value and creating an updated order
    updatedOrder.updatedAt = moment().format()
    updatedOrder.status = data.status
    updateStatus(updatedOrder)
    new Noty({
        type: 'success',
        timeout: 1000,
        text: "Order Updated",
        layout: 'topLeft'
      }).show()
})