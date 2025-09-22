import React from 'react';

function FooterNav() {
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-md border-t  mt-3">
      <ul className="flex justify-around items-center py-3 text-gray-700 font-medium">
        <li className="w-auto border-r-2 border-gray-200 px-4">
          <a href="" className="hover:text-blue-600">Home</a>
        </li>
        <li className="w-auto border-r-2 border-gray-200 px-4 relative">
          <a href="" className="hover:text-blue-600 flex items-center gap-1">
            Report
            <span className="bg-red-500 text-white text-xs rounded-full px-2">3</span>
          </a>
        </li>
        <li className="w-auto px-4 relative">
          <a href="" className="hover:text-blue-600 flex items-center gap-1">
            Noti
            <span className="bg-blue-500 text-white text-xs rounded-full px-2">7</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default FooterNav;
