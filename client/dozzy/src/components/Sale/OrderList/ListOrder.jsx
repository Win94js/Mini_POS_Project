import React from "react";
import { useSelector, useDispatch, createSelectorHook } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createBillAction } from "../../../Redux/actions/billActions";

const ListOrder = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const groupedOrders = useSelector((state) => state.ordersState.orders);
  const hasOrders = groupedOrders.some(group => group.items.length > 0);
  const handleCreateBill = (tableId, orders,orderId) => {
    console.log("hasOrders",groupedOrders);
    const groupedOrdersId = groupedOrders._id
    const billData = {
      tableId,
      items: orders,
      orderId: orderId
    };
    // dispatch(createBillAction(billData));
    navigate("/createBill", { state: { tableId, orders ,orderId} });
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">🧾 Orders Grouped by Table</h2>

      {!hasOrders ? (
        <p className="text-center text-gray-500 italic">No orders available.</p>
      ) : (
        <div className="grid gap-6">
          {groupedOrders.map((group) =>
            group.items.length > 0 && (
              <div
  key={group._id}
  className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 transition hover:shadow-xl w-full"
>
  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-4">
    <h3 className="text-lg sm:text-xl font-semibold text-blue-700">
      Table #{group.tableNo.tableNo}
    </h3>
    <button
      onClick={() => handleCreateBill(group.tableNo._id, group.items,group._id)}
      className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-5 py-2 rounded-full font-medium transition w-full sm:w-auto text-center"
    >
      Create Bill
    </button>
  </div>

  <div className="overflow-x-auto">
    <table className="min-w-full table-auto border border-gray-300 rounded-lg text-sm sm:text-base">
      <thead className="bg-gray-100 text-gray-700">
        <tr>
          <th className="px-2 sm:px-4 py-2 text-left">Product</th>
          <th className="px-2 sm:px-4 py-2 text-left">Quantity</th>
          <th className="px-2 sm:px-4 py-2 text-left">Price</th>
          <th className="px-2 sm:px-4 py-2 text-left">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        {group.items.map((item) => (
          <tr key={item._id} className="border-t">
            <td className="px-2 sm:px-4 py-2">{item.productID.productName}</td>
            <td className="px-2 sm:px-4 py-2">{item.quantity}</td>
            <td className="px-2 sm:px-4 py-2">£{item.productID.salePrice.toFixed(2)}</td>
            <td className="px-2 sm:px-4 py-2 font-medium">
              £{(item.productID.salePrice * item.quantity).toFixed(2)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

            )
          )}
        </div>
      )}
    </div>
  );
};

export default ListOrder;
