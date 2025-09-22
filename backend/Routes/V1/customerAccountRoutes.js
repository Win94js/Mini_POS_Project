const express = require('express');
const router = express.Router();

const {AddCustomer,getAllCustomer, customerDetail} = require('../../Controllers/CustomerAccountController/customerAccountController');

router.post('/create-customer',AddCustomer);
router.get('/getAllCustomer',getAllCustomer);
router.get('/customerDetail/:id',customerDetail);


module.exports= router;