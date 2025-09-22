const express = require('express');

const Bill = require('../../../Models/Bill');
const Order = require('../../../Models/Order');

// Create a bill from an order
exports.createBill = async (req, res) => {
  const { orderId, tax, totalAmount, paymentMethod, paidAmount } = req.body;

  try {
    const order = await Order.findById(orderId).populate('items.productID');
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const bill = new Bill({
      order: orderId,
      totalAmount,
      tax,
      paymentMethod,
      paidAmount
    });

    await bill.save();
    order.isBilled = true;
    await order.save();

    res.status(201).json({bills:bill});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Fetch a single bill by ID
exports.fetchBill = async (req, res) => {
  const { id } = req.params;

  try {
    const bill = await Bill.findById(id).populate({
      path: 'order',
      populate: [
        {
          path: 'items.productID',
          model: 'Product',
          select: 'productName salePrice quantity'
        },
        {
          path: 'createdBy',
          model: 'AdminAccount',
          select: 'name role'
        },
        {
          path: 'customerInfo',
          model: 'CustomerAccount',
          select: 'name address phoneNumber point'
        }
      ]
    });

    if (!bill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    res.status(200).json({
      message: 'Bill fetched successfully',
      bill
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bill', error: err.message });
  }
};

// Fetch all bills
exports.getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find().sort({ createdAt: -1 }).populate({
      path: 'order',
      populate: [
        {
          path: 'items.productID',
          model: 'Product',
          select: 'productName salePrice quantity'
        },
        {
          path: 'createdBy',
          model: 'AdminAccount',
          select: 'name role'
        },
        {
          path: 'customerInfo',
          model: 'CustomerAccount',
          select: 'name address phoneNumber point'
        }
      ]
    });

    if (!bills || bills.length === 0) {
      return res.status(404).json({ message: 'No bills found' });
    }

    res.status(200).json({
      message: 'All bills retrieved successfully',
      bills
    });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching bills', error: err.message });
  }
};