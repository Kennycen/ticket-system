import { Ticket } from "../models/ticket.js";

// In memory array to store tickets
let tickets = [];

const createTicket = async (req, res) => {
  try {
    const { name, email, description } = req.body;

    // Validate required fields
    if (!name || !email || !description) {
      console.log('Validation failed - missing fields');
      return res.status(400).json({
        success: false,
        message: "All fields are required",
        details: {
          name: !name ? "Name cannot be empty" : null,
          email: !email ? "Email cannot be empty" : null,
          description: !description ? "Description cannot be empty" : null
        }
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      console.log('Validation failed - invalid email');
      return res.status(400).json({
        success: false,
        message: "Invalid email format"
      });
    }

    try {
      // Create new ticket
      const newTicket = new Ticket({
        name,
        email,
        description
      });

      console.log('Created ticket:', newTicket);

      tickets.push(newTicket);

      return res.status(201).json({
        success: true,
        data: newTicket
      });
    } catch (ticketError) {
      console.error('Error creating ticket object:', ticketError);
      throw ticketError;
    }
  } catch (error) {
    console.error("Error in createTicket:", {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    return res.status(500).json({
      success: false,
      message: "Server error while creating ticket",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

const getTickets = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      data: tickets
    });
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching tickets"
    });
  }
};

const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, responseMessage } = req.body;

    console.log('Update request received:', {
      id,
      status,
      responseMessage,
      body: req.body,
      params: req.params,
      headers: req.headers
    });

    if (!status && !responseMessage) {
      console.log('Validation failed: No status or response message provided');
      return res.status(400).json({
        success: false,
        message: "Either status or response message is required"
      });
    }

    // Convert both IDs to strings for comparison
    const ticketIndex = tickets.findIndex((ticket) => String(ticket.id) === String(id));

    console.log('Found ticket index:', ticketIndex);
    console.log('Current tickets:', tickets);

    if (ticketIndex === -1) {
      console.log('Ticket not found:', id);
      return res.status(404).json({
        success: false,
        message: "Ticket not found"
      });
    }

    if (status) {
      if (!["new", "in progress", "resolved"].includes(status)) {
        console.log('Invalid status provided:', status);
        return res.status(400).json({
          success: false,
          message: "Invalid status. Must be one of: new, in progress, resolved"
        });
      }
      tickets[ticketIndex].status = status;
    }

    if (responseMessage) {
      if (!tickets[ticketIndex].responses) {
        tickets[ticketIndex].responses = [];
      }
      tickets[ticketIndex].responses.push({
        message: responseMessage,
        createdAt: new Date().toISOString()
      });
    }

    tickets[ticketIndex].updatedAt = new Date().toISOString();

    console.log('Ticket updated successfully:', tickets[ticketIndex]);

    return res.status(200).json({
      success: true,
      data: tickets[ticketIndex]
    });
  } catch (error) {
    console.error("Error updating ticket:", {
      message: error.message,
      stack: error.stack,
      body: req.body,
      params: req.params
    });
    return res.status(500).json({
      success: false,
      message: "Server error while updating ticket"
    });
  }
};

export { createTicket, getTickets, updateTicket };
