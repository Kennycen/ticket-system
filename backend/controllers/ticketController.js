import { Ticket } from "../models/ticket.js";

// In memory array to store tickets
let tickets = [];

// Helper to generate a unique ticket ID
const generatedId = () => Date.now().toString();

const createTicket = async (req, res) => {
  try {
    const { name, email, description } = req.body;

    if (!name || !email || !description) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    // Use the Ticket class to create a new ticket object
    const newTicket = new Ticket({ name, email, description });

    tickets.push(newTicket);

    // Log email in console
    console.log(`New ticket created for ${name} about ${description}.`);

    res.status(201).json(newTicket);
  } catch (error) {
    console.error("Error created ticket:", error);
    res.status(500).json({ message: "Server error while creating ticket." });
  }
};

const getTickets = async (req, res) => {
  try {
    res.status(200).json(tickets);
  } catch (error) {
    console.error("Error fetching tickets:", error);
    res.status(500).json({ message: "Server error while creating ticket." });
  }
};

const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const ticket = tickets.find((ticket) => ticket.id === id);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found." });
    }

    // Update status if provided
    if (status && ["new", "in progress", "resolved"].includes(status)) {
      ticket.status = status;
    }

    // Add response if provided
    if (responseMessage) {
      if (!ticket.responses) {
        ticket.responses = [];
      }
      ticket.responses.push({
        message: responseMessage,
        createdAt: new Date().toISOString(),
      });
    }

    // Log email in console
    console.log(`Ticket for ${ticket.name} updated to ${status} status.`);
  } catch (error) {
    console.error("Error updating ticket:", error);
    res.status(500).json({ message: "Server error while creating ticket." });
  }
};

export { createTicket, getTickets, updateTicket };
