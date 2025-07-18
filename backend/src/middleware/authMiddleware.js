import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) return res.status(401).json({ success: false, message: 'Not authenticated' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};

export default authenticateJWT; 