const Unit = require('../../Models/Unit')
exports.addUnit = async (req,res) => {
    try{
        let {unit} = req.body;

        console.log('unit',unit,'add unit user',req.user.role);
        if(!req.user || req.user.role !== "admin"){
          return  res.status(403).json({
                message: "Only admin can create unit."
            })
        }
        unit = unit.toLowerCase().trim();
        const exitUnit = await Unit.findOne({unit})
        if(exitUnit){
        console.log('exitUnit',exitUnit)

            return res.status(403).json({
                message:"Unit already exit in database.",exitUnit
            })
        }
        
        const newUnit = new Unit({
            unit
        })
        await newUnit.save();
        res.status(200).json({
            message: `Create ${unit} unit successfully by ${req.user.role} `,unitAdd:newUnit
        })
    }catch(error){
        console.log("Server error occuring in createing unit",error);
        res.status(500).json({
            message: "Server error occuring in createing unit",error
        })
    }
}

exports.getAllUnit = async (req,res) =>{
    try{
        const units =await Unit.find({});
            res.status(200).json({
                message: "All unit lists are successfully retrieved.",
                units
            })
    }catch(error){
        console.log('error in getting all units lists',error)
        res.status(500).json({
            message: "Error occuring while connection to get all units server",error
        })
    }
}