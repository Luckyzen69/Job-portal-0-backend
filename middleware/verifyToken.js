const jwt = require('jsonwebtoken');


const verifyToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized: Token not provided' });
    }
  
    try {
      const decoded = jwt.verify(token, 'shhhhhh');
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: 'Unauthorized: Invalid token' });
    }
  };
module.export = {   verifyToken};