
const AdminUser = require('../../Models/AdminAccount');

exports.createOtherAccount = async (req,res) => {
    try { 
         const {name,phoneNumber,email,password,address,role,createdBy} = req.body;
         console.log("req.user in other role create",req.user.id)
         
         
         
        if(req.user.role !== 'admin' ){
            return res.status(403).json({
                message: "Only admin can create other account."
            })
        }
        
        const existUser = await AdminUser.findOne({email});
        if(existUser){
            return res.status(400).json({
                message: "User already exist with this email."
            })
        }
        
        const newUser = new AdminUser({
            name,phoneNumber,email,password,address,role,createdBy:req.user.id

        })
        console.log('newUser Role',newUser)
        await newUser.save();

        res.status(200).json({
            message: `${role} account created successfully by the ${req.user.role}`,user :newUser
        })
}catch(error){
    console.log('server error in create other account',error)
    res.status(500).json({
        message: "Server error creating in other user account.",error
    })
}
    
}

