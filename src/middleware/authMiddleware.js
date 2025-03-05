import jwt from "jsonwebtoken";
import User from "../Models/userModel.js";
import dotenv from "dotenv";

dotenv.config();

export const protect = async (req, res, next) => {
  console.log("Headers Received:", req.headers);

  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      try {
          token = req.headers.authorization.split(" ")[1];
          console.log("Extracted Token:", token);

          const decoded = jwt.verify(token, process.env.JWT_SECRET);
          console.log("Decoded Token:", decoded);

          req.user = await User.findById(decoded.id).select("-password");
          console.log("User Found:", req.user);

          if (!req.user) {
              return res.status(401).json({ message: "User not found in database" });
          }

          next();
      } catch (error) {
          console.error("JWT Verification Error:", error.message);
          return res.status(401).json({ message: "Not authorized, invalid token", error: error.message });
      }
  } else {
      return res.status(401).json({ message: "Not authorized, no token provided" });
  }
};
