const express = require('express');
const router = express.Router();

const {addTable,getTableDetail,getAllTable, editTable} = require('../../Controllers/TableController/tableController')

router.post('/add-table',addTable);
router.get('/table-detail/:id',getTableDetail);
router.get('/tables',getAllTable);
router.put('/updateTable/:id',editTable);

module.exports = router;
