const express = require('express');
const router = express.Router();
const {createProduct , getAllProduct, updateProduct, productDetail} = require('../../Controllers/ProductRoutesController/ProductController');
const { addCategory } = require('../../Controllers/ProductRoutesController/categoryAdd');
const { getAllCategory } = require('../../Controllers/ProductRoutesController/getAllCategory');
const { addSubCategory,getAllSubCategory } = require('../../Controllers/ProductRoutesController/subCategory');

router.post('/create-category',addCategory);
router.post('/add-product',createProduct);
router.get('/getAllCategory',getAllCategory);
router.post('/create-subCategory',addSubCategory)
router.get('/getAllSubCategory',getAllSubCategory);
router.get('/getAllProduct',getAllProduct);
router.put('/updateProduct/:id',updateProduct);
router.get('/productDetail/:id',productDetail)
module.exports = router;