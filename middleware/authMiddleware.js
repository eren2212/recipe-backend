const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "No token" });

  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.decode(token);
    if (!payload) return res.status(401).json({ error: "Invalid token" });

    req.user = { id: payload.sub, email: payload.email };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Unauthorized" });
  }
}

module.exports = checkAuth;
