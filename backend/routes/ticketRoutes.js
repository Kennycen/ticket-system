import express from 'express';
import { createTicket, getTickets, updateTicket } from '../controllers/ticketController.js'; 

const ticketRouter = express.Router(); 

ticketRouter.post('/tickets', createTicket);
ticketRouter.get('/tickets', getTickets);
ticketRouter.patch('/tickets/:id', updateTicket);

export default ticketRouter;