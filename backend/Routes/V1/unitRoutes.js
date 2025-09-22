const express = require('express');
const router = express.Router();
const { addUnit,getAllUnit } = require('../../Controllers/UnitController/unitController');


router.post('/create-unit',addUnit);
router.get('/getAllUnit',getAllUnit);

module.exports= router;