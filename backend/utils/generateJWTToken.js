const jwt = require('jsonwebtoken');

exports.generateToken = (user) => {
  const payload = {
    id: user._id,
    role: user.role, // 'user', 'cashier', 'admin'
    extraPermissions: user.extraPermissions || [], // Example: ['create_product']
    revokedPermissions: user.revokedPermissions || [] // Example: ['delete_product']
  };

  return jwt.sign(payload, process.env.SECRET_JWT, {
    expiresIn: '7d', // adjust as needed
  });
};