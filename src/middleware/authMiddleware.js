import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req, res, next) => {
  try {
    console.log("Checking JWT_SECRET:", process.env.JWT_SECRET);

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    if (!token || token === "undefined" || token === "null") {
      return res.status(401).json({ message: "Token not found" });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded);


    const userId = decoded._id || decoded.id;
    console.log("User ID Extracted from Token:", userId);

    if (!userId) {
      return res.status(401).json({ message: "Invalid token: User ID missing" });
    }

    req.user = await User.findById(userId).select("-password");
    console.log("Found User in DB:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "User not found in database", userId });
    }

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Not authorized, invalid token", error: error.message });
  }
};
