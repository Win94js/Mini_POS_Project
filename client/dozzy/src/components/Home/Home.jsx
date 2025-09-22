import React from 'react';

const Home= ()=> {
  return (
    <div>
        <div className="flex justify-center p-4">
        <ul className="flex flex-wrap justify-between w-5/6 gap-4">
            <li className="w-2/6 border border-gray-300 p-2 text-center rounded shadow">
            <a href="/menu" className="block hover:text-blue-600 transition">Sale</a>
            </li>
            <li className="w-2/6 border border-gray-300 p-2 text-center rounded shadow">
            <a href="/orderLists" className="block hover:text-blue-600 transition">Orders</a>
            </li>
            <li className="w-2/6 border border-gray-300 p-2 text-center rounded shadow">
            <a href="/products" className="block hover:text-blue-600 transition">Product</a>
            </li>
            <li className="w-2/6 border border-gray-300 p-2 text-center rounded shadow">
            <a href="/tableLists" className="block hover:text-blue-600 transition">Table</a>
            </li>
            <li className="w-2/6 border border-gray-300 p-2 text-center rounded shadow">
            <a href="/categories" className="block hover:text-blue-600 transition">Category</a>
            </li>
            <li className="w-2/6 border border-gray-300 p-2 text-center rounded shadow">
            <a href="/customers" className="block hover:text-blue-600 transition">Customer</a>
            </li>
        </ul>
        </div>
    </div>
  );
}

export default Home;
