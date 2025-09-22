const express = require('express');
const router = express.Router();

const {createOtherAccount} = require('../../Controllers/AccountController/createOtherAcc');
const adminDashboard = require('../../Controllers/AccountController/adminDashboard');
const { deleteOtherAccount } = require('../../Controllers/AccountController/deleteOtherAcc');
const { getAllUserByAdmin } = require('../../Controllers/AccountController/getAllAccount');
const { userPermission } = require('../../Controllers/AccountController/userPermissionController/userPermissionController');

//admin dashboard
router.get('/admin-dashboard',adminDashboard)
//admin dashboard create other role
router.post('/create-role',createOtherAccount)
// delete user role by admin
router.delete('/delete-acc/:id',deleteOtherAccount);
//get all user account list by admin
router.get('/users',getAllUserByAdmin)
//update use permission
router.put('/permissions/:id',userPermission)
module.exports = router;