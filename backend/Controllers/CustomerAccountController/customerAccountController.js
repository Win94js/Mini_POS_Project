const CustomerAccount = require('../../Models/CustomerAccount');

exports.AddCustomer = async (req,res) => {
    try{
        const { name,phoneNumber,address,point,orderId,createdBy }= req.body;
        const existUser = await CustomerAccount.findOne({phoneNumber});
        if(existUser){
            return res.status(400).json({
            message: `User already exist with this phoneNumber:${phoneNumber}`
        })
        }
        const newUser = new CustomerAccount({
            name,phoneNumber,address,point, ...(orderId && { orderId })   ,createdBy:req.user.id})
        console.log('newUser Role',newUser)
        await newUser.save();
            
        res.status(200).json({
            message: `${name} account created successfully by the ${req.user.role}`,user :newUser
        })
    }catch(error){
        console.log("Error occuring in connecting in create customer account",error)
        res.status(500).json({
            message: "Error occuring in connecting in create customer account",error
        })
    }
}

exports.getAllCustomer = async (req,res) => {
    try{
        const users = await CustomerAccount.find({},"-password");
        res.status(200).json({
            message: "All user lists are successfully retrieved.",
            users
        })
    }catch(error){
        console.log("Error occuring in getting all users account",error)
        return res.status(500).json({
            message: "Error occuring in getting all users account",error
        })
    }
}

exports.customerDetail = async (req,res) => {
    try{
        const customerId = req.params.id;
        const checkCus = await CustomerAccount.findById(customerId).populate({
            path:"orderId",
            populate:[
              {
                path : 'createdBy',
                model: 'AdminAccount',
                select: "name role"
              },
              {
                path: 'items.productID',
                model: 'Product',
                select: 'productName salePrice quantity '
              },
              {
                path: 'tableNo',
                model: 'Table',
                select: 'tableNo'
              }
            ],
            
          })
          console.log(checkCus)
    if(!checkCus){
      return res.status(403).json({
        message: "Customer not found"
      })
    }
    res.status(200).json({
      message: "Success Customer data retrive",
      CusInfo: checkCus
    })
    }catch(error){
        console.log("error occuring in customer detail",error)
        return res.status(500).json({
            message: "error occuring in customer detail",error
        })
    }
}