const express = require('express');
const router = express.Router();

const { createOrder,getAllOrders, updateOrder, orderDetail } = require('../../Controllers/Order/OrderController/createOrder');



router.post('/create-order',createOrder);
router.get('/getAllOrders',getAllOrders);
router.put('/update-order/:id',updateOrder);
router.get('/orderDetail/:id',orderDetail)
module.exports= router;
