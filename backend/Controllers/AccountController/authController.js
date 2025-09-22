const bcrypt = require('bcrypt');
const AdminUser = require('../../Models/AdminAccount');
const jwt  = require('jsonwebtoken');
const { generateToken } = require('../../utils/generateJWTToken');

// exports.createUserAcc = (req,res) => {
//     const {username,password,phoneNumber,address,role} = req.body;
//     const userFind = Users.findOne()
//     const createdUser = user
// }
exports.adminAccountLogin = async (req,res) =>{
   try{ const {email,password,role} = req.body;
    console.log('email',email, "password",password);
    const user = await AdminUser.findOne({email});
    if(!user){
        return res.status(403).json({message: "User not found."});
    }
    console.log('user password',password)
    // if(role !== 'admin'){
    //     return res.status(403).json({
    //         message:"Unauthorized login"
    //     })
    // }
    
    if(password !== user.password){
        
        return res.status(403).json({
            message: "invalid password"
        })
    }
    console.log('user_id',user._id);
    const token = generateToken(user)
    return res.status(200).json({
        message: "Login successful",name:user.name,
        token,
        user:{
            id: user._id,
            name : user.name,
            role: user.role,
            extraPermissions: user.extraPermissions,
        revokedPermissions: user.revokedPermissions
        }
    })
    }catch(error){
        console.log('error',error);
        res.status(500).json({
            
            message: "Server error occuring",error
        }
        )
    }

}