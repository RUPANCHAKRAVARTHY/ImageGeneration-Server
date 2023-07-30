import express from 'express';
import * as dotenv from 'dotenv';
import cors from 'cors';


import connectDB from './mongodb/connect.js';
import postRoutes from './routes/postRoutes.js';
import dalleRoutes from './routes/dalleRoutes.js';


//dotenv configuration
dotenv.config();

//middlewares
const app = express();
app.use(cors({
    origin: "*",
    credentials:true
}));
app.use(express.json({ limit: '50mb' }));

//routes
app.get('/', async (req, res) => {
    res.status(200).json({
        message: 'Hello from DALL.E!😍',
      });
  });
//api routes for frontend
app.use('/api/v1/post', postRoutes);
app.use('/api/v1/dalle', dalleRoutes);


//function to start a server
const startServer = async () => {
    try {
      connectDB(process.env.MONGODB_URL);
      app.listen(8080, () => console.log('Server started on port 8080'));
    } catch (error) {
      console.log(error);
    }
  };
  
startServer();
