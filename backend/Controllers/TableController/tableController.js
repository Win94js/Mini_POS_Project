const Table = require('../../Models/Table');
exports.addTable = async (req,res) => {
    try{
        let {tableNo,seat,orderId} = req.body;

        console.log('tableNo',tableNo,'seat',seat,'add tableNo and seat,req.user.role');
        // if(!req.user || req.user.role !== "admin"){
        //   return  res.status(403).json({
        //         message: "Only admin can create Table."
        //     })
        // }
        
        const exitTableNo= await Table.findOne({tableNo})
        if(exitTableNo){
        console.log('exitTableNo',exitTableNo)

            return res.status(403).json({
                message:`exitTableNo: ${tableNo} already exit in database.`
            })
        }
        if (!Number.isInteger(tableNo) || !Number.isInteger(seat)) {
            return res.status(400).json({ message: "Invalid input. Table number and seat must be integers." });
          }
        const newTable = new Table({
            tableNo, seat,...(orderId && { orderId })
            
          });
          await newTable.save();

          

          res.status(201).json({
            message: `Table number ${tableNo} added successfully by $req.user.role}`,
            table: newTable
          });
    } catch (error) {
          console.log("Server error occurred while creating table:", error);
          res.status(500).json({
            message: "Server error occurred while creating table",
            error
          });
        }
}

exports.getTableDetail = async(req,res) => {
  try{
    const tableID = req.params.id;
    const tableData1 = await Table.findById(tableID);
    console.log('tableData1',tableData1)

    console.log('tableData1',tableData1?.status)
    console.log('tableData1',tableData1?.orderId)

    const tableData = await Table.findById(tableID).populate({
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
            path: 'customerInfo',
            model: 'CustomerAccount',
            select: 'name address point phoneNumber'
          }
        ]
      })
      console.log(tableData)
    if(!tableData){
      return res.status(403).json({
        message: "Table not found"
      })
    }
    res.status(200).json({
      message: "Success table data retrive",
      table: tableData
    })
  }catch(error){
    console.log("Server error occurred while retriving table detail:", error);
    res.status(500).json({
      message: "Server error occurred while retriving table detail:",
      error
    });
  
  }
}

exports.getAllTable = async(req,res) => {
  try {
    const tables = await Table.find();
    if(!tables){
      return res.status(400).json({
        message: "Tabels not found"
      })
    }
    res.status(200).json({
      message: "All tables are here",tables
    })
  } catch (error) {
    console.log("Server error occurred while retriving tables:", error);
    res.status(500).json({
      message: "Server error occurred while retriving tables:",
      error
    });
  }
}


exports.editTable = async (req, res) => {
  try {
    const tableId = req.params.id;
    const { tableNo, seat, orderId,status } = req.body;

    // if (!req.user || req.user.role !== "admin") {
    //   return res.status(403).json({
    //     message: "Only admin can edit a table."
    //   });
    // }

    const table = await Table.findById(tableId);
    if (!table) {
      return res.status(404).json({
        message: "Table not found."
      });
    }

    // Optional: prevent updating to an already-existing tableNo
    if (tableNo && tableNo !== table.tableNo) {
      const existing = await Table.findOne({ tableNo });
      if (existing) {
        return res.status(409).json({
          message: `Table number ${tableNo} already exists.`
        });
      }
    }

    if (tableNo) table.tableNo = tableNo;
    if(status) table.status = status;
    if (seat) table.seat = seat;
    if (orderId) table.orderId = orderId;

    await table.save();

    const updatedTable = await Table.findById(tableId).populate('orderId');

    res.status(200).json({
      message: `Table updated successfully by $.user.role`,
      table: updatedTable
    });
  } catch (error) {
    console.log("Server error occurred while editing table:", error);
    res.status(500).json({
      message: "Server error occurred while editing table",
      error
    });
  }
};
