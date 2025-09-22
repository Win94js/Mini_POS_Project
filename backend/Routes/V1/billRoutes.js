const express = require('express');

const router = express.Router();
const { createBill, fetchBill,getAllBills } = require('../../Controllers/Order/BillController/billController');

router.post('/createBill',createBill)
router.get('/billDetail/:id',fetchBill)
router.get('/bills',getAllBills)

module.exports= router;