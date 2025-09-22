const { allPermissions } = require('../../../config/rolePermissions');
const User = require('../../../Models/AdminAccount');

exports.userPermission = async (req, res) => {
    const { extraPermissions, revokedPermissions } = req.body;
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { extraPermissions, revokedPermissions },
      { new: true }
    );
    return res.status(201).json({
        message: "Account role update successfully",
        updateRoleData: user
    });
  }