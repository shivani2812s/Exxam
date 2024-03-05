const jwt = require('jsonwebtoken');


const secretKey = 'xyz';

const authenticateToken = (allowedRoles) => (req, res, next) => {
  const authToken = req.headers.authorization;
  if (!authToken || !authToken.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized: Token missing or invalid' });
  }
  const token = authToken.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: Token missing' });
  }

  jwt.verify(token, secretKey, (err, user) => {
    
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