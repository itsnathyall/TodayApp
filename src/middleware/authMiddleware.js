import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req, res, next) => {
  console.log("JWT_SECRET in protect:", process.env.JWT_SECRET);

  try {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    console.log("Extracted Token:", token);

    if (!token || token === "undefined" || token === "null") {
      return res.status(401).json({ type: "verify token", message: "Token not found" });
    }


    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded Token:", decoded); 


    req.user = await User.findById(decoded.id).select("-password");
    console.log("User Found in DB:", req.user);

    if (!req.user) {
      return res.status(401).json({ message: "User not found in database", userId: decoded.id });
    }

    next();
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    return res.status(401).json({ message: "Not authorized, invalid token", error: error.message });
  }
};
