import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersAction } from "../../../Redux/actions/orderActions";
import { useNavigate } from "react-router-dom";

const OrderListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { orders, loading, error } = useSelector(
    (state) => state.ordersState
  );

  useEffect(() => {
    dispatch(fetchOrdersAction());
  }, [dispatch]);

  // const testOrder = orders.map((group) => ( group.items._id));
  console.log('orders from orderLists',orders)
  const handleCreateBill = (group) => {
    console.log('group',group)
    navigate("/createBill", {
      state: {
        tableId: group.tableNo._id,
        orders: group.items,
        orderId: group._id
      },
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">🧾 Order List</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {
  orders.filter((group) => group.status === 'Pending').length === 0 && !loading ? (
    <p className="text-gray-500">No orders found.</p>
  ) : (
    <div className="space-y-4">
      {orders
        .filter((group) => group.status === 'Pending')
        .map((group) => (
          <div
            key={group._id}
            className="flex justify-between items-center p-4 bg-white shadow rounded-xl border"
          >
            <div>
              <h2 className="text-lg font-semibold">
                Table #{group.tableNo.tableNo}
              </h2>
              <p className="text-sm text-gray-500">
                Status: {group.status || "Pending"}
              </p>
            </div>
            <button
              onClick={() => handleCreateBill(group)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded"
            >
              Create Bill
            </button>
          </div>
        ))}
    </div>
  )
}

    </div>
  );
};

export default OrderListPage;
