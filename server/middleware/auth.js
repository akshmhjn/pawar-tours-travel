const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // ✅ Allow preflight CORS requests
  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // No Content
  }

  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: Token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
