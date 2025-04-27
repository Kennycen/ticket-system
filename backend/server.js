import express from 'express';
import cors from 'cors';
import ticketRouter from './routes/ticketRoutes.js'; 

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', ticketRouter);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});