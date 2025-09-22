import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { fetchProductsAction } from '../../../Redux/actions/productActions';
import { fetchTablesAction } from '../../../Redux/actions/tableActions';
import { createOrderAction } from '../../../Redux/actions/orderActions';
import { editTableAction } from '../../../Redux/actions/tableActions';
const categories = ["All Products", "Electronics", "Clothing", "Home", "Sports"];

function MenuList() {
  const [activeTab, setActiveTab] = useState("menu");
  const [selectedCategory, setSelectedCategory] = useState("All Products");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedTable, setSelectedTable] = useState(null); // Ensure selectedTable is the object, not just a string
  
  /*-------------------Use Redux------------------- */
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, items, error } = useSelector((state) => state.products);
  const { tables } = useSelector((state) => state.tables); // Access tables from Redux

  useEffect(() => {
    dispatch(fetchProductsAction());
    dispatch(fetchTablesAction());

  }, [dispatch]);

 
  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  /*filter product */
  console.log('items', items);
  console.log('tables', tables);

  const filteredProducts = items.filter(product =>
    (selectedCategory === "All Products" || product.category === selectedCategory) &&
    product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setIsModalOpen(false);
  };
  // Handle table selection and status update
  const handleTableSelect = (table) => {
    console.log("handleTableSelect",table)
    if (table.status === 'Booked') {
      alert('This table is already booked.');
      return;
    }
    setSelectedTable(table); // Set the full table object
    setIsTableModalOpen(false);

    // Update the selected table status to 'booked'
    const updatedTable = { ...table, status: 'Booked' };
    console.log("updatedTable",table)

    dispatch(editTableAction(table._id, updatedTable)); // Dispatch the action to update table status
  };
  const addToOrder = (product) => {
    setOrders((prevOrders) => {
      const existing = prevOrders.find(item => item.productName === product.productName);
      if (existing) {
        return prevOrders.map(item =>
          item.productName === product.productName ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevOrders, { ...product, quantity: 1 }];
      }
    });
  };

  const changeQuantity = (name, delta) => {
    setOrders(prevOrders =>
      prevOrders.map(item =>
        item.productName === name ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      )
    );
  };

  const removeFromOrder = (name) => {
    setOrders(prevOrders => prevOrders.filter(item => item.productName !== name));
  };

  const handlePlaceOrder = (orderSelectedTable,ordersItem) => {
    if (!selectedTable) {
      alert("Please select a table before placing the order.");
      return;
    }
    if (orders.length === 0) {
      alert("Your order is empty.");
      return;
    }
    
    let itemsForOrder = {
      tableNo: parseInt(orderSelectedTable.tableNo),
      items: ordersItem.map(order => ({
        productID: order._id,
        // salePrice: order.salePrice,
        quantity: order.quantity
      }))
    
    };
    // itemsForOrder = JSON.stringify(itemsForOrder);
    console.log('items from create order',  itemsForOrder)
    console.log("Placing order for", typeof(orderSelectedTable) , items.productID);
    alert(`Order placed successfully for ${selectedTable.tableNo}!`);
    dispatch(createOrderAction(itemsForOrder)).then(() => {
      alert(`Order placed successfully for ${orderSelectedTable.tableNo}!`);
      navigate('/orderList', {
        orders : itemsForOrder
      });
      setOrders([]); // Clear orders after placing
      setSelectedTable(null); // Clear selected table
      setActiveTab("menu"); // Reset to menu tab
    }).catch((error) => {
      console.error("Order creation failed:", error.response.data);
      alert("Failed to place order. Please try again.");
    });
  };

  const totalPrice = orders.reduce((sum, item) => sum + item.salePrice * item.quantity, 0);

  console.log('orders', orders);
  console.log('selectedTable',selectedTable)

  return (
    <div className="w-full h-auto">
      {/* Tabs */}
      <div className="tabs flex justify-between p-4 border-b bg-white shadow">
        <div
          className={`cursor-pointer p-2 font-semibold ${activeTab === "menu" ? "text-blue-600 border-b-2 border-blue-600" : ""}`}
          onClick={() => setActiveTab("menu")}
        >
          Menu
        </div>
        <div
          className={`cursor-pointer p-2 font-semibold flex items-center gap-1 ${activeTab === "order" ? "text-blue-600 border-b-2 border-blue-600" : ""}`}
          onClick={() => setActiveTab("order")}
        >
          Order
          {orders.length > 0 && (
            <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full">{orders.length}</span>
          )}
        </div>
      </div>

      {/* Menu Tab */}
      {activeTab === "menu" && (
        <>
          {/* Search and Category */}
          <div className="action-container flex justify-between items-center p-4">
            <input
              type="search"
              placeholder="Search Products"
              className="border p-2 rounded w-2/3"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="border p-2 rounded bg-blue-500 text-white"
              onClick={() => setIsModalOpen(true)}
            >
              Category
            </button>
          </div>

          {/* Category Modal */}
          {isModalOpen && (
            <div className="modal fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
              <div className="modal-content bg-white p-6 rounded shadow-lg w-1/2">
                <h3 className="text-xl font-semibold mb-4">Select Category</h3>
                <ul className="flex flex-col gap-2">
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      className="cursor-pointer text-blue-500 hover:text-blue-700"
                      onClick={() => handleCategoryClick(category)}
                    >
                      {category}
                    </li>
                  ))}
                </ul>
                <button
                  className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Product List */}
          <div className="menuLists-container p-4">
            <div className="menuLists-boxes grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredProducts.map((product) => (
                <div key={product._id} className="menuList border p-4 rounded shadow-lg bg-white">
                  <span className="block font-semibold">{product.productName}</span>
                  <span className="block text-gray-600">${product.salePrice}</span>
                  <button
                    className="mt-2 bg-green-500 text-white px-4 py-1 rounded text-sm"
                    onClick={() => addToOrder(product)}
                  >
                    Add to Order
                  </button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Order Tab */}
      {activeTab === "order" && (
        <div className="order-container p-4">
          {orders.length === 0 ? (
            <p className="text-gray-600 text-center">No items in your order yet.</p>
          ) : (
            <>
              <div className="mb-4">
                <label className="block font-semibold mb-2">Select Table:</label>
                <div className="flex items-center gap-4">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                    onClick={() => setIsTableModalOpen(true)}
                  >
                    Choose Table
                  </button>
                  {selectedTable && (
                    <span className="text-gray-700 font-medium">{selectedTable.tableNo}</span>
                  )}
                </div>
              </div>

              {/* Table Selection Modal */}
              {isTableModalOpen && (
        <div className="modal fixed top-0 left-0 w-full h-full bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="modal-content bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <h3 className="text-2xl font-bold text-center mb-4">Select Table</h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 overflow-y-auto pr-2 max-h-[300px]">
              {tables.map((table) => (
                <div
                  key={table._id}
                  className="cursor-pointer border border-blue-300 rounded-xl p-4 text-blue-700 font-medium bg-white hover:bg-blue-50 transition shadow-sm"
                  onClick={() => handleTableSelect(table)} // Use handleTableSelect
                >
                  <div className="text-lg font-semibold mb-1">Table {table.tableNo}</div>
                  <div className="text-sm">Seats: {table.seat}</div>
                  <div className={`text-sm mt-1 ${table.status === 'Available' ? 'text-green-600' : 'text-red-500'}`}>
                    Status: {table.status}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-6">
              <button
                className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-600 transition"
                onClick={() => setIsTableModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

              <ul className="flex flex-col gap-3 mb-4">
                {orders.map((item, index) => (
                  <li key={index} className="border p-3 rounded bg-white shadow-sm flex justify-between items-center">
                    <div>
                      <span className="font-medium">{item.productName}</span> - ${item.salePrice} x {item.quantity}
                      <div className="text-sm text-gray-600">Subtotal: ${item.salePrice * item.quantity}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        className="bg-gray-300 px-2 rounded"
                        onClick={() => changeQuantity(item.productName, -1)}
                      >
                        -
                      </button>
                      <button
                        className="bg-gray-300 px-2 rounded"
                        onClick={() => changeQuantity(item.productName, 1)}
                      >
                        +
                      </button>
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded"
                        onClick={() => removeFromOrder(item.productName)}
                      >
                        Remove
                      </button>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="text-right font-semibold mb-4">
                Total: ${totalPrice}
              </div>

              <button
                className="bg-blue-600 text-white px-4 py-2 rounded"
                onClick={()=>handlePlaceOrder(selectedTable,orders)}
              >
                Place Order
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MenuList;
