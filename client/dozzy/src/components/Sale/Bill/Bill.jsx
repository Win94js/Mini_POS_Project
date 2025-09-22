import React, { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createBillAction } from "../../../Redux/actions/billActions";

import { toast } from "react-toastify";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import { editTableAction } from "../../../Redux/actions/tableActions";
import { updateOrderAction } from "../../../Redux/actions/orderActions";

const TAX_RATE = 0.1;

const CreateBill = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const billRef = useRef();

  const { tableId, orders,orderId } = location.state || {};
  const allOrders = useSelector((state) => state.ordersState.orders);

  const fallbackGroup = allOrders.find(
    (group) => group.tableNo._id === tableId
  );
  const tableOrders = orders || fallbackGroup?.items || [];
  const tableNumber = fallbackGroup?.tableNo?.tableNo || "Unknown";
  const cashierName = "John Doe";
  
  const getCurrentDateString = () => {
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  };

  const [currentVRID, setCurrentVRID] = useState(0);
  const currentDate = getCurrentDateString();
  const [paymentMethod, setPaymentMethod] = useState("Cash");

  useEffect(() => {
    const lastVRID = localStorage.getItem(`vrid_${currentDate}`);
    setCurrentVRID(lastVRID ? parseInt(lastVRID) + 1 : 1);
  }, [currentDate]);

  useEffect(() => {
    localStorage.setItem(`vrid_${currentDate}`, currentVRID);
  }, [currentVRID, currentDate]);
  useEffect(() => {
    console.log("Location State:", location.state);
  }, [location.state]);
  const calculateSubtotal = (price, quantity) => price * quantity;
  const subtotal = tableOrders.reduce(
    (sum, item) =>
      sum + calculateSubtotal(item.productID.salePrice, item.quantity),
    0
  );
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  const handlePrint = useReactToPrint({
    content: () => billRef.current,
    documentTitle: `Receipt_Table_${tableNumber}`,
    onAfterPrint: () => {
      toast.success("✅ Bill created & receipt printed!");
      navigate("/");
    },
  });

  const handleDownloadPDF = () => {
    const element = billRef.current;
    const opt = {
      margin: 0.3,
      filename: `Receipt_Table_${tableNumber}.pdf`,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };

    const updatedContent = `
      <div>
        <h1>🍽️ QuickBite Restaurant</h1>
        <p>Receipt for Table #${tableNumber}</p>
        <p>Cashier: ${cashierName}</p>
        <p>VR ID: ${currentDate}-${currentVRID}</p>
        <p>Date: ${new Date().toLocaleString()}</p>
        <p>Payment Method: ${paymentMethod}</p>
        <hr />
        <table border="1" cellpadding="5">
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${tableOrders
              .map(
                (item) => `
              <tr>
                <td>${item.productID.productName}</td>
                <td>${item.quantity}</td>
                <td>£${item.productID.salePrice.toFixed(2)}</td>
                <td>£${(item.productID.salePrice * item.quantity).toFixed(2)}</td>
              </tr>`
              )
              .join("")}
          </tbody>
        </table>
        <hr />
        <p>Subtotal: £${subtotal.toFixed(2)}</p>
        <p>Tax (10%): £${tax.toFixed(2)}</p>
        <p><strong>Total: £${total.toFixed(2)}</strong></p>
        <p>Thank you for dining with us! Visit again 🍽️</p>
      </div>
    `;

    html2pdf().set(opt).from(updatedContent).save();
    setCurrentVRID(currentVRID + 1);
  };

  const handleConfirmPayment = () => {
    const billPayload = {
      tableId,
      cashierName,
      paymentMethod,
      vrId: `${currentDate}-${currentVRID}`,
      items: tableOrders.map((item) => ({
        productId: item.productID._id,
        quantity: item.quantity,
        salePrice: item.productID.salePrice,
      })),
      subtotal,
      tax,
      total,
    };

    dispatch(createBillAction(billPayload));
    handlePrint();
  };
  const selectedOrder = allOrders.find(
    (order) => order.tableNo._id === tableId && order._id === orderId
  );
  const handleDone = () => {
    dispatch(editTableAction(tableId, { status: "Available" })); // You can change 'available' to whatever status you use
   
    console.log('selectedOrder',selectedOrder._id,"tableId",tableId)
  // Update each related order status to "Completed"
  dispatch(updateOrderAction(selectedOrder._id, { status: "Completed" }));
    toast.success("✅ Table status updated to Available!");
    navigate("/");
  };
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🧾 Bill for Table #{tableNumber}
      </h2>

      {tableOrders.length === 0 ? (
        <p className="text-gray-500">No order items found for this table.</p>
      ) : (
        <>
  <div className="overflow-x-auto px-2 sm:px-4" ref={billRef}>
    <div className="text-center mb-4">
      <h1 className="text-xl font-bold">🍽️ My Dozzy Restaurants</h1>
      <p className="text-sm text-gray-500">Receipt for Table #{tableNumber}</p>
      <p className="text-sm text-gray-400">{new Date().toLocaleString()}</p>
      <hr className="my-4" />
    </div>

    <div className="w-full overflow-x-auto">
      <table className="min-w-full table-auto border border-gray-200 text-sm">
        <thead className="bg-gray-100 text-left text-gray-600">
          <tr>
            <th className="px-2 py-2 sm:px-4">Product</th>
            <th className="px-2 py-2 sm:px-4">Quantity</th>
            <th className="px-2 py-2 sm:px-4">Price</th>
            <th className="px-2 py-2 sm:px-4">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {tableOrders.map((item) => (
            <tr key={item._id} className="border-t">
              <td className="px-2 py-2 sm:px-4">{item.productID.productName}</td>
              <td className="px-2 py-2 sm:px-4">{item.quantity}</td>
              <td className="px-2 py-2 sm:px-4">£{item.productID.salePrice.toFixed(2)}</td>
              <td className="px-2 py-2 sm:px-4 font-medium">
                £{calculateSubtotal(item.productID.salePrice, item.quantity).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    <div className="text-right text-sm text-gray-700 space-y-1 mb-4 mt-2 px-2 sm:px-0">
      <p>Subtotal: £{subtotal.toFixed(2)}</p>
      <p>Tax (10%): £{tax.toFixed(2)}</p>
      <p className="font-bold text-lg">Total: £{total.toFixed(2)}</p>
      <p>Payment Method: <strong>{paymentMethod}</strong></p>
    </div>
  </div>

  <div className="mb-4 px-2 sm:px-0">
    <label className="block mb-1 font-semibold text-gray-700">Select Payment Method:</label>
    <select
      value={paymentMethod}
      onChange={(e) => setPaymentMethod(e.target.value)}
      className="p-2 border rounded w-full sm:max-w-xs"
    >
      <option value="Cash">Cash</option>
      <option value="Credit Card">Credit Card</option>
      <option value="PayPal">PayPal</option>
    </select>
  </div>

  <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-end items-stretch px-2 sm:px-0 mt-6">
    <button
      onClick={handleConfirmPayment}
      className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
    >
      Confirm & Print Bill
    </button>
    <button
      onClick={handleDownloadPDF}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
    >
      Download PDF
    </button>
    <button
    onClick={handleDone}
    className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full sm:w-auto"
  >
    Done
  </button>
  </div>
</>

      )}
    </div>
  );
};

export default CreateBill;
