const Product = require('../../Models/Product');
const Category = require('../../Models/Category');
const Subcategory = require('../../Models/Subcategory');

exports.getAllCategory = async (req,res) =>{
    try{
        const categories =await Category.find({});
            res.status(200).json({
                message: "All category lists are successfully retrieved.",
                categories
            })
    }catch(error){
        console.log('error in getting all cagtegory lists',error)
        res.status(500).json({
            message: "Error occuring while connection to get all category server",error
        })
    }
}