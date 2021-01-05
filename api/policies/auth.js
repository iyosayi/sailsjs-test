const jwt = require("jsonwebtoken");
module.exports = async function (req, res, proceed) {
  try {
    const token = req.headers["x-auth-token"];
    if (!token) {
      return res.status(401).json({
        error: "Access denied, no valid token.",
      });
    }
    const secret = sails.config.jwtSecret || process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);
    const { sub } = decoded;
    const validUser = await User.findOne({ email: sub });
    if (!validUser) {
      return res.status(404).json({
        error: "User with this email does not exist.",
      });
    }
    req.me = validUser;
    return proceed();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
