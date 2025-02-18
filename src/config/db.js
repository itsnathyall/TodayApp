import { mongoose } from "mongoose";
import dotenv from 'dotenv';
dotenv.config()
const uri = process.env.MONGODB_URI;




export default {
    connectToDb: async () => {
        mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => console.log('Connected to MongoDB!'))
        .catch((err) => console.error('Error connecting to MongoDB:', err));
    }
};