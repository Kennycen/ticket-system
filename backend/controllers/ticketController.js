import ticketModel from "../models/ticketModel.js";

const createTicket = async (req, res) => {
  try {
    const { name, email, description } = req.body;

    if (!name || !email || !description) {
      return res.json({ success: false, message: "Missing Details" });
    }

    const ticketData = {
      name,
      email,
      description,
    };

    const newTicket = new ticketModel(ticketData);
    const ticket = await newTicket.save();

    return res.status(201).json({ success: true, data: ticket });
  } catch (error) {
    console.error("Error creating ticket:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while creating ticket.",
    });
  }
};

const getTickets = async (req, res) => {
  try {
    const tickets = await ticketModel.find().sort({ createdAt: -1 }); // ✅ FIXED
    return res.status(200).json({
      success: true,
      data: tickets,
    });
  } catch (error) {
    console.error("Error fetching tickets:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching tickets",
    });
  }
};

const updateTicket = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log("Update request received:", {
      id,
      status,
    });

    if (!status) {
      return res.status(400).json({
        success: false,
        message: "Status field is required",
      });
    }

    if (!["new", "in progress", "resolved"].includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status. Must be one of: new, in progress, resolved",
      });
    }

    // Find ticket by id and update
    const updatedTicket = await ticketModel.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    ); 

    if (!updatedTicket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found",
      });
    }

    console.log("Ticket updated:", updatedTicket);

    return res.status(200).json({
      success: true,
      data: updatedTicket,
    });
  } catch (error) {
    console.error("Error updating ticket:", error.message);
    return res.status(500).json({
      success: false,
      message: "Server error while updating ticket",
    });
  }
};

export { createTicket, getTickets, updateTicket };
