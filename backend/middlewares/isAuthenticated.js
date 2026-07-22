import jwt from "jsonwebtoken";

const isAuthenticated = (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token && req.headers.authorization) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        message: "User not authenticated",
        success: false,
      });
    }

    // verify token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    if (!decoded) {
      return res.status(401).json({
        message: "Invalid token",
        success: false,
      });
    }

    // 🔥 attach user properly
    req.user = {
      id: decoded.userId,
      role: decoded.role, // optional if you store role in JWT
    };

    next();
  } catch (error) {
    console.log("Auth Middleware Error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export default isAuthenticated;
