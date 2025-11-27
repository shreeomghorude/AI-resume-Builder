import jwt from "jsonwebtoken";

const protect = async (req, res, next) => {
  let token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "unauthorized" });
  }

  try {
    // If token starts with "Bearer ", extract the actual token
    if (token.startsWith("Bearer ")) {
      token = token.split(" ")[1];
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user ID to request object
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ message: "unauthorized" });
  }
};

export default protect;
