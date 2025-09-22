const AdminUser = require('../../Models/AdminAccount');

exports.deleteOtherAccount = async (req,res) => {
   try{
    const userID = req.params.id;
    console.log('admin request:',req.user);
    // if(!req.user || req.user.role !== "admin"){
    //     res.status(403).json({
    //         message: "Only admin can delete other account."
    //     })
    // }
    console.log("owner id to delete",userID);
    const findIDToDelete = await AdminUser.findById(userID);
    console.log('find id to delete', findIDToDelete)
    if(!findIDToDelete){
        res.status(403).json({
            message: "No user found in database."
        })
    }
    if(findIDToDelete.role === 'admin'){
        res.status(403).json({
            message: "Admin cannot delete other admin account."
        })
    }

    await AdminUser.findByIdAndDelete(userID);
    res.status(200).json({
        message: `${findIDToDelete.name} role is successfully deleted by ${req.user.role}`
    })
   } catch (error) {
    console.error('Error deleting account:', error);
    res.status(500).json({ message: "Server error while deleting user account." });
}
}