import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createTableAction, fetchTablesAction } from '../../../Redux/actions/tableActions';

function Table() {
  const dispatch = useDispatch();
  const { tables, loading, error } = useSelector((state) => state.tables);
  const [newTableName, setNewTableName] = useState('');

  useEffect(() => {
    dispatch(fetchTablesAction());
  }, [dispatch]);

  const handleCreateTable = () => {
    if (newTableName.trim()) {
      dispatch(createTableAction(newTableName));
      setNewTableName('');
    }
  };

  if (loading) return <p className="text-center text-gray-500 mt-10">Loading tables...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <div className="p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h2 className="text-3xl font-semibold mb-4 sm:mb-0">Manage Tables</h2>
        <div className="flex">
          <input
            type="text"
            value={newTableName}
            onChange={(e) => setNewTableName(e.target.value)}
            placeholder="Enter table number"
            className="border border-gray-300 rounded-l-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-64"
          />
          <button
            onClick={handleCreateTable}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 rounded-r-md"
          >
            Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tables.length === 0 ? (
          <p className="text-center text-gray-400 w-full col-span-full">No tables available.</p>
        ) : (
          tables.map((table) => (
            <div
              key={table._id}
              className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition p-5 flex flex-col justify-between"
            >
              <div className="text-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Table #{table.tableNo}</h3>
                <p className="text-sm text-gray-500 mt-1">Seats: {table.seat || '-'}</p>
              </div>

              {/* Status Badge */}
              <div className="flex justify-center mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    table.status === 'Available'
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {table.status || 'Unknown'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-center space-x-3">
                <button
                  onClick={() => console.log(`View detail table ${table._id}`)}
                  className="bg-yellow-400 hover:bg-yellow-500 text-white px-4 py-1 rounded-lg text-sm font-semibold"
                >
                  View Detail
                </button>
                
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Table;
