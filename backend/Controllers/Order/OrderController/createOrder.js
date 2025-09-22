const Order = require('../../../Models/Order');
const Product = require('../../../Models/Product');
const Table = require('../../../Models/Table');
const Customer = require('../../../Models/CustomerAccount');
exports.createOrder = async (req,res) => {
    try{
        const {items,tableNo} = req.body;
        console.log('items',items,'tableNo',typeof(tableNo),tableNo)
        // if(!req.user || req.user.role !== "admin"){
        //     return  res.status(403).json({
        //           message: "Only admin can create order."
        //       })
        //   }
        const checkTable = await Table.findOne({tableNo});
        // console.log('tableNo--',checkTable.id)
        if(!checkTable ){
            return res.status(403).json({
                message: "Table not found",tableNo
            })
        }
        if (!items || items.length === 0) {
            return res.status(400).json({ message: "No items in the order" });
        }
        console.log("items sss",items)

        const itemsID = items.map((item) =>  item.productID);
        console.log('itemID',itemsID)
        // const checkItem = Product.findById({items.productID});
        const products = await Product.find({ _id: { $in: itemsID } }).select("salePrice quantity");
        if(!products || products.length !== items.length){
            return res.status(403).json({
                message: "Some item are not found in database",items
            })
        }
        for(let item of items){
            const product = products.find((p) => p._id.toString() === item.productID)
            if(!product){
                return res.status(403).json({
                    message: `Prodcut with id: ${item.productID} not found `
                })
            }
            if(product.quantity < item.quantity){
                return res.status(403).json({
                    message: `No enought stock for this product with id ${item.productID}`
                })
            }
        }
        // temporarily block code stock update
        /*for (let item of items) {
            await Product.findByIdAndUpdate(item.productID, { $inc: { quantity: -item.quantity } });
        }*/
       {/*
       if(customerInfo){
    //     const checkCus = await Customer.findById(customerInfo);
    //     if(!checkCus){
    //         return res.status(403).json({
    //             message: "no customer found in customer list",customerInfo
    //         })
    //     }
       }
     */}
        
        const newOrder = new Order({
            items,
            // customerInfo : checkCus._id,
            tableNo : checkTable._id,
            // createdBy : req.user.id
            createdBy : "67dbb69e56dc479503990e51"
        })
        console.log("new order")
        const orderSave = await newOrder.save();
        console.log("new order",orderSave )

        await Table.findByIdAndUpdate(checkTable._id, {
            orderId: orderSave._id,
            status: "Booked"
          });
        {/*await Customer.findByIdAndUpdate(checkCus._id,{
            orderId: orderSave._id
        })*/}
        const populatedOrder = await Order.findById(orderSave._id)
      .populate({
        path: 'items.productID',
        select: 'salePrice productName'
      })
      .populate({
        path: 'tableNo',
        select: 'tableNo'
      })
      {/*.populate({
        path: 'customerInfo',
        select: 'name phone'
      })*/};

    return res.status(200).json({
      message: `Order created successfully by $$admin`,
      order: populatedOrder
    });
        // res.status(200).json({
        //     message: `Order create successfully by ${req.user.role} `,orderSave
        // })
        
      

    }catch(error){
        res.status(500).json({
            message: "Error occuring in connecting order create.",error
        })
    }


}
exports.orderDetail = async (req,res) =>{
    try{
        const orderID = req.params.id;
        const orderCheck = await Order.findById(orderID).populate({
            path: "tableNo",
            model: "Table",
            select: "tableNo"
        })
        if(!orderCheck){
            return res.status(403).json({
            message: "No order found!"
            })
        }
        res.status(201).json({
            message: "Order successfully retrive",orderDetail :orderCheck
        })
    }catch(error){
        console.log("Error occuring while retrive orderDetail",error);
        return res.status(500).json({
            message: "Error occuring while retrive orderDetail",error
        })
    }
}
exports.getAllOrders = async (req,res) => {
    try { 
        const orders = await Order.find().populate()
        .populate({
            path: "items.productID",
            select: "productName salePrice",
            model: "Product"
          })
          .populate({
            path: "tableNo",
            select: "tableNo",
            model: "Table"
          });
    ;
    res.status(200).json({
        message: "Successfully retrieve orders from database",orders
    })
    }catch(error){
        console.log('Error occuring connecting to retrieve all orders:',error)
        res.status(500).json({
            message: "Error occuring connecting to retrieve all orders.",error
        })
    }
}
exports.updateOrder = async(req,res) => {
    try{
        const {status} = req.body;
        const orderId = req.params.id
        const order = await Order.findById(orderId);
        if(!order){
            return res.status(403).json({
                message: "Order not found",orderId
            }
            )
        }
        order.status = status;
        const updateOrderStatus = await order.save();
        return res.status(201).json({
            message: "Order status update successfully",updateOrderStatus
        })
    }catch(error){
        console.log('Error occuring in update order',error);
        return res.status(500).json({
            message: "Error occuring in update order",error
        })
    }
}