const jwt = require('jsonwebtoken');
const secretKey = 'xyz';
const authenticateToken = (userType) => (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }
  jwt.verify(token, xyz, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Forbidden: Invalid token' });
    }
    const { userType } = user;
    if (!allowedRoles.includes(userType)) {
      return res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
    }
    req.user = user;
    next();
  });
};

module.exports = authenticateToken;