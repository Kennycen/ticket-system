import express from 'express';
import cors from 'cors';
import 'dotenv/config'
import ticketRouter from './routes/ticketRoutes.js'; 
import connectDB from "./config/mongodb.js";

const app = express();
connectDB();

app.use(
  cors({
    origin: "*", 
    methods: ["GET", "POST", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  })
);
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Ticket System API' });
});

// API Routes
app.use('/api', ticketRouter);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});