const jwt = require('jsonwebtoken');
const User = require('../models/User');

const validateToken = async (req, res, next) => {
  let token;

  // 1. Check Authorization header
  const authHeader = req.headers.authorization;
  
  // 2. Check cookies
  const authCookie = req.cookies?.token; // Change 'token' to your cookie name

  if (authHeader && authHeader.startsWith('Bearer')) {
    token = authHeader.split(' ')[1];
  } 
  else if (authCookie) {
    token = authCookie;
  }

  if (!token) {
    return res.status(401).json({ message: 'Not authorized, token missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (error) {
    console.error('JWT Verification Error:', error);
    
    // Handle specific JWT errors
    let message = 'Not authorized, token invalid';
    if (error.name === 'TokenExpiredError') {
      message = 'Not authorized, token expired';
    } else if (error.name === 'JsonWebTokenError') {
      message = 'Not authorized, malformed token';
    }
    
    return res.status(401).json({ message });
  }
};

module.exports = validateToken;