import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

const axiosInstance = axios.create({
    baseURL: BACKEND_URL + '/api',
});

const createTicket = async (ticketData) => {
    const response = await axiosInstance.post('/tickets', ticketData)
    return response.data;
};

const getTickets = async () => {
    const response = await axiosInstance.get('/tickets');
    return response.data;
};

const updateTicket = async (id, status, responseMessage) => {
    const body = {};
    if (status) body.status = status;
    if (responseMessage) body.responseMessage = responseMessage;

    const response = await axiosInstance.patch(`/tickets/${id}`, body);
    return response.data;
}

export { createTicket, getTickets, updateTicket }