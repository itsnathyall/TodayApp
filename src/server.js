import express from "express";
import dotenv from "dotenv";
import db from "./config/db.js";
import taskRoutes from "./Routes/routes.js";
import authRoutes from "./Routes/routes.js";
import cors from "cors";


dotenv.config();
db.connectToDb();

const app = express();
app.use(express.json());

const corsOptions = {
    origin: '*'
}

app.use(cors(corsOptions))

app.use("/", taskRoutes);
app.use("/auth", authRoutes);

app.get('/', (req, res) => {
    res.send('API is working');
});

const PORT = process.env.PORT || 4999;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));