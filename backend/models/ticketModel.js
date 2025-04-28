import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, require: true},
    description: {type: String, required: true},
    status: {type: String, enum: ['new', 'in progress', 'resolved'], default: 'new'},
},
{timestamps: true}
);

const ticketModel = mongoose.models.Ticket || mongoose.model('Ticket', ticketSchema);

export default ticketModel;