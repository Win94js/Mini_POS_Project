import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsers, updateUserPermissions } from '../../../Redux/actions/userActions';

const ALL_PERMISSIONS = [
  'viewOrders', 'editOrders', 'deleteOrders', 'manageUsers',
  'accessReports', 'manageInventory', 'issueRefunds', 'updateSettings',
];

const UserPermissionsPanel = () => {
  const dispatch = useDispatch();
  const { users } = useSelector((state) => state.userState);

  const [editingUserId, setEditingUserId] = useState(null);
  const [extraPermissions, setExtraPermissions] = useState([]);
  const [revokedPermissions, setRevokedPermissions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (user) => {
    setEditingUserId(user._id);
    setExtraPermissions(user.extraPermissions || []);
    setRevokedPermissions(user.revokedPermissions || []);
    setSearchTerm('');
  };

  const handleCancel = () => {
    setEditingUserId(null);
    setExtraPermissions([]);
    setRevokedPermissions([]);
    setSearchTerm('');
  };

  const handleSave = (id) => {
    dispatch(updateUserPermissions(id, { extraPermissions, revokedPermissions }));
    handleCancel();
  };

  const togglePermission = (perm, type) => {
    const list = type === 'extra' ? extraPermissions : revokedPermissions;
    const otherList = type === 'extra' ? revokedPermissions : extraPermissions;
    const setList = type === 'extra' ? setExtraPermissions : setRevokedPermissions;

    if (list.includes(perm)) {
      setList(list.filter(p => p !== perm));
    } else if (!otherList.includes(perm)) {
      setList([...list, perm]);
    }
  };

  const filteredPermissions = ALL_PERMISSIONS.filter((p) =>
    p.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderPermissionCheckboxes = (type) => {
    const selected = type === 'extra' ? extraPermissions : revokedPermissions;
    const otherSelected = type === 'extra' ? revokedPermissions : extraPermissions;

    return (
      <div>
        <h5 className="font-semibold mb-1">
          {type === 'extra' ? '✅ Extra Permissions' : '❌ Revoked Permissions'}
        </h5>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-sm mb-4">
          {filteredPermissions.map((perm) => {
            const isChecked = selected.includes(perm);
            const isDisabled = otherSelected.includes(perm);
            return (
              <label key={`${type}-${perm}`} className="flex items-center gap-2 text-gray-700">
                <input
                  type="checkbox"
                  checked={isChecked}
                  disabled={isDisabled}
                  onChange={() => togglePermission(perm, type)}
                  className={isDisabled ? 'cursor-not-allowed' : ''}
                />
                <span className={isDisabled ? 'text-gray-400' : ''}>
                  {perm}
                </span>
              </label>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">User Access Management</h2>

      <ul className="space-y-4">
        {users.map((user) => (
          <li key={user._id} className="border rounded p-4 shadow-sm">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-lg">{user.name}</p>
                <p className="text-sm text-gray-500">Role: {user.role}</p>
              </div>
              <button
                onClick={() => handleEdit(user)}
                className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
              >
                Give Access
              </button>
            </div>

            {editingUserId === user._id && (
              <div className="mt-4 bg-gray-50 p-4 rounded border">
                <h4 className="font-medium mb-2">Manage Permissions</h4>

                <input
                  type="text"
                  placeholder="Search permissions..."
                  className="border px-2 py-1 w-full rounded mb-3"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />

                {renderPermissionCheckboxes('extra')}
                {renderPermissionCheckboxes('revoked')}

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleSave(user._id)}
                    className="bg-green-600 text-white px-4 py-1 rounded"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-400 text-white px-4 py-1 rounded"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserPermissionsPanel;
