const adminDashboard = async (req,res)=>{
    console.log('user.req********',req.user.id)

   return res.json({
        message: "Hello this for admin dashboard access",user:req.user.id
    })
}

module.exports  = adminDashboard;