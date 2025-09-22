const jwt = require('jsonwebtoken');
const { generateToken } = require('../utils/generateJWTToken');
const { defaultPermissions } = require('../config/rolePermissions');

authenticateJWT = (req,res,next) => {
    const token = req.header('Authorization')?.split(" ")[1];
    console.log('token',token)
    if(!token){
        return res.status(401).json({
            message: "Access denied. No token provided."
        })
    }
    try{
        const varified = jwt.verify(token,process.env.SECRET_JWT);
        req.user = varified;
        console.log("varified jwt",varified)
        console.log('req.user check',req.user)
        next();
    }catch(error){
        res.status(403).json({
            message: "Invalid or expired token"
        })
    }
}
const authorize = (requiredPermission) => {
    return (req, res, next) => {
      
      const basePermissions = defaultPermissions[req.user.role] || [];
      const effectivePermissions = new Set([
        ...basePermissions,
        ...(req.user.extraPermissions || []),
      ]);
  
      for (const perm of req.user.revokedPermissions || []) {
        effectivePermissions.delete(perm);
      }
  
      if (effectivePermissions.has(requiredPermission)) {
        next();
      } else {
        res.status(403).send('Access denied.');
      }
    };
  };
authorizeRoles = (...roles) => {
    return (req, res, next) => {
      if (!roles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied: insufficient permission" });
      }
      next();
    };
  };


module.exports = { authenticateJWT, authorizeRoles,authorize };