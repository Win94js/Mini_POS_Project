const Product = require('../../Models/Product');
const Category = require('../../Models/Category');
const Subcategory = require('../../Models/Subcategory');

exports.addSubCategory = async (req,res) => {
    try{
        let {subCategory,category} = req.body;

        console.log('mainCategory',category,'subCategory',subCategory,'add subCategory user',req.user.role);
        if(!req.user || req.user.role !== "admin"){
          return  res.status(403).json({
                message: "Only admin can create category."
            })
        }
        const parentCategory = await Category.findById(category);
        console.log('parentCategory',parentCategory);
        if(!parentCategory){
            return res.status(403).json({
                message: "Before add sub category should create parent category first. "
            })
        }

        subCategory = subCategory.toLowerCase().trim();
        const exitSubCategory = await Subcategory.findOne({subCategory,category})
        if(exitSubCategory){
        console.log('exitSubCategory',exitSubCategory)

            return res.status(403).json({
                message:"SubCategory already exit in database."
            })
        }
        
        const newSubCategory = new Subcategory({
            subCategory,
            category:category
        })
        await newSubCategory.save();
        res.status(200).json({
            message: `Create subcategory: ${subCategory}, under category: ${parentCategory.category} successfully by ${req.user.role} `,sunCategoryAdd:newSubCategory
        })
    }catch(error){
        console.log("Server error occuring in createing sub category",error);
        res.status(500).json({
            message: "Server error occuring in createing sub category",error
        })
    }
}

exports.getAllSubCategory = async (req,res) => {
        try{
            const subCategories =await Subcategory.find({});
                res.status(200).json({
                    message: "All sub category lists are successfully retrieved.",
                    subCategories
                })
        }catch(error){
            console.log('error in getting all sub cagtegory lists',error)
            res.status(500).json({
                message: "Error occuring while connection to get all subcategory server",error
            })
        }
}