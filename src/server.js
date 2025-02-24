import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import taskRoutes from "./Routes/routes.js";


dotenv.config();
db.connectToDb();

const app = express();
app.use(express.json());

app.use("/task", taskRoutes);

const PORT = process.env.PORT || 4999;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));