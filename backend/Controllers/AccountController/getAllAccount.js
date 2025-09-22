const AdminUser = require('../../Models/AdminAccount');
exports.getAllUserByAdmin = async (req,res) => {
    try{
   
    const users =await AdminUser.find({},"-password");
    res.status(200).json({
        message: "All user lists are successfully retrieved.",
        users:users
    })
    }catch(error){
        console.log('error in getting all user lists',error)
        res.status(500).json({
            message: "Error occuring while connection to server",error
        })
    }
}