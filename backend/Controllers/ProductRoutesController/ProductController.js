const Product = require('../../Models/Product');
const Category = require('../../Models/Category');
const Subcategory = require('../../Models/Subcategory');
const Unit = require('../../Models/Unit');
exports.createProduct = async(req,res) => {
    try{
        let {productID,productName,originalPrice,salePrice,wholeSalePrice,quantity,alertQuantity,unitQuantity,
            unit,description,category,subCategory,options,createdBy
        } = req.body;
        
        const owner = req.user.role
        if(!req.user|| req.user.role !== "admin"){
        return res.status(403).json({
                message: "Only admin can create product.",owner
            })
        }
        const findProduct = await Product.findOne({ $or: [{ productID }, { productName }] });
       console.log('findProduct',findProduct)
        category = category.toLowerCase().trim();
        const findCategory = await Category.findOne({category});
        subCategory = subCategory.toLowerCase().trim();
        const findSubCategory = await Subcategory.findOne({subCategory});
        unit = unit.toLowerCase().trim();
        const findUnit = await Unit.findOne({unit})

        console.log('finding in product create',"category",findCategory,"subcategory",findSubCategory,"unit",findUnit);
        if(findProduct){
            console.log('findProduct',findProduct)
            return res.status(403).json({
                message: "ProductID or Product already exit in database",findProduct
            })
        }
        if(!findUnit || !findCategory ||!findSubCategory){
        
            return res.status(403).json({
                message:`${findUnit?'-':unit} | ${findCategory?'-':category} | ${findSubCategory?"-":subCategory} doesnot exit in database.`
                    })
                }
        
        const newProduct = new Product({
            productID,
            productName,
            originalPrice,
            salePrice,
            wholeSalePrice,
            quantity,
            alertQuantity,
            unitQuantity,
            unit: findUnit._id,
            description,
            category,
            subCategory,
            options,
            createdBy:req.user.id
        })
        const saveProduct = await newProduct.save();
        res.status(200).json({
            message: `Product:${newProduct.productName} Create successfully By ${req.user.role}`,product:saveProduct })
    }catch(error){
        console.log("error occuring in create new product",error);
        res.status(500).json({
            message: "Error occuring in when creating new product",error
        })
    }
}

exports.getAllProduct = async(req,res) => {
    try{
        const products = await Product.find({});
        if(!products){
            return res.status(403).json({
                message: "No proudcts are not found in database"
            ,product:"Product not found"})
        }
        res.status(200).json({
            message: "All products are successfully retrived from database",products
        })

    }catch(error){
        console.log('error in getting all products lists',error)
        res.status(500).json({
            message: "Error occuring while connection to get all product server",error
        })
    }
}

exports.updateProduct = async (req, res) => {
    try {
        const productIdParams = req.params.id;
        let {
            productID, productName, originalPrice, salePrice, wholeSalePrice, quantity,
            alertQuantity, unitQuantity, unit, description, category, subCategory, options
        } = req.body;

        const owner = req.user.role;
        if (!req.user || req.user.role !== "admin") {
            return res.status(403).json({ message: "Only admin can edit product.", owner });
        }

        const existingProduct = await Product.findById(productIdParams);
        if (!existingProduct) {
            return res.status(404).json({ message: "Product not found." });
        }

        // Check for duplicate productID or productName if being updated
        if (productID || productName) {
            const findProduct = await Product.findOne({
                $or: [{ productID }, { productName }],
                _id: { $ne: productIdParams }
            });

            if (findProduct) {
                return res.status(403).json({
                    message: "ProductID or Product already exists in the database."
                });
            }
        }

        // Validate category, subCategory, and unit only if provided
        if (category) {
            category= category.toLowerCase().trim()
            const findCategory = await Category.findOne({  });
            if (!findCategory) return res.status(403).json({ message: `Category '${category}' does not exist.` });
            existingProduct.category = category;
        }

        if (subCategory) {
            subCategory= subCategory.toLowerCase().trim()
            const findSubCategory = await Subcategory.findOne({ subCategory});
            if (!findSubCategory) return res.status(403).json({ message: `SubCategory '${subCategory}' does not exist.` });
            existingProduct.subCategory = subCategory;
        }

        if (unit) {
           
            unit = unit.toLowerCase().trim();
            const findUnit = await Unit.findOne({unit})
            if (!findUnit) return res.status(403).json({ message: `Unit '${unit}' does not exist.` });
            existingProduct.unit = findUnit._id;
        }

        // Update only provided fields
        if (typeof productID !== 'undefined') existingProduct.productID = productID;
        if (typeof productName !== 'undefined') existingProduct.productName = productName;
        if (typeof originalPrice !== 'undefined') existingProduct.originalPrice = originalPrice;
        if (typeof salePrice !== 'undefined') existingProduct.salePrice = salePrice;
        if (typeof wholeSalePrice !== 'undefined') existingProduct.wholeSalePrice = wholeSalePrice;
        if (typeof quantity !== 'undefined') existingProduct.quantity = quantity;
        if (typeof alertQuantity !== 'undefined') existingProduct.alertQuantity = alertQuantity;
        if (typeof unitQuantity !== 'undefined') existingProduct.unitQuantity = unitQuantity;
        if (typeof description !== 'undefined') existingProduct.description = description;
        if (typeof options !== 'undefined') existingProduct.options = options;if (productID) existingProduct.productID = productID;
        if (productName) existingProduct.productName = productName;
        if (originalPrice) existingProduct.originalPrice = originalPrice;
        if (salePrice) existingProduct.salePrice = salePrice;
        if (wholeSalePrice) existingProduct.wholeSalePrice = wholeSalePrice;
        if (quantity) existingProduct.quantity = quantity;
        if (alertQuantity) existingProduct.alertQuantity = alertQuantity;
        if (unitQuantity) existingProduct.unitQuantity = unitQuantity;
        if (description) existingProduct.description = description;
        // if(unit) existingProduct.unit = unit;
        if (options) existingProduct.options = options;

        // Save and return updated product
        const updatedProduct = await existingProduct.save();
        res.status(200).json({
            message: `Product: ${updatedProduct.productName} updated successfully.`,
            product: updatedProduct,
            productIdParams
        });

    } catch (error) {
        console.log('Error in updating product', error);
        res.status(500).json({
            message: "Error occurred when updating product",
            error
        });
    }
};

exports.productDetail = async (req, res) => {
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId)
            .populate('category', 'category')         // Only fetch the 'category' field
            .populate('subCategory', 'subCategory')   // Only fetch the 'subCategory' field
                            // Only fetch the 'unit' field
            .exec();

        if (!product) {
            return res.status(404).json({ message: "Product not found." });
        }

        res.status(200).json({
            message: "Product detail fetched successfully.",
            product: {
                ...product.toObject(),
                category: product.category?.category || product.category,
                subCategory: product.subCategory?.subCategory || product.subCategory,
                unit: product.unit?.unit || product.unit
            }
        });

    } catch (error) {
        console.log('Error in fetching product detail', error);
        res.status(500).json({
            message: "Error occurred while fetching product detail",
            error
        });
    }
};
