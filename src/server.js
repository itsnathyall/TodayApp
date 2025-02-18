import express from 'express';
const app = express();

import dotenv from 'dotenv'
dotenv.config();


//Connecting to the DB(duh)
import db from './config/db.js'
db.connectToDb();





//Router
// app.use(express.json());

// const authRoute = require('./Routes/auth.js')
// app.use('/auth', authRoute,)

// const taskRoute = require('./Routes/task.js')
// app.use('/auth', taskRoute)

// Start Server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});

