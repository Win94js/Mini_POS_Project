const Product = require('../../Models/Product');
const Category = require('../../Models/Category');
const Subcategory = require('../../Models/Subcategory');

exports.addCategory = async (req,res) => {
    try{
        let {category} = req.body;

        console.log('category',category,'add category user',req.user.role);
        if(!req.user || req.user.role !== "admin"){
          return  res.status(403).json({
                message: "Only admin can create category."
            })
        }
        category = category.toLowerCase().trim();
        const exitCategory = await Category.findOne({category})
        if(exitCategory){
        console.log('exitCategory',exitCategory)

            return res.status(403).json({
                message:"Category already exit in database."
            })
        }
        
        const newCategory = new Category({
             category
        })
        await newCategory.save();
        res.status(200).json({
            message: `Create ${category} category successfully by ${req.user.role} `,categoryAdd:newCategory
        })
    }catch(error){
        console.log("Server error occuring in createing category",error);
        res.status(500).json({
            message: "Server error occuring in createing category",error
        })
    }
}