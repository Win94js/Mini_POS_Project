// config/permissions.js
module.exports.defaultPermissions = {
    cashier: ['view_orders', 'process_payment'],
    manager: ['view_orders', 'process_payment','create_product'],
    admin: ['create_product', 'update_product', 'delete_product', 'view_orders','manage_users'],
  };

module.exports.allPermissions =[
    'create_product', 'update_product', 'delete_product', 'view_orders','manage_users'
]
  