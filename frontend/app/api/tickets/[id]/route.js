import { NextResponse } from 'next/server';
import axios from 'axios';

const BACKEND_URL = process.env.BACKEND_URL; // e.g., https://your-backend.onrender.com

export async function PATCH(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();

    const response = await axios.patch(`${BACKEND_URL}/api/tickets/${id}`, body);

    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error updating ticket:', error);
    return NextResponse.json({ error: 'Failed to update ticket' }, { status: 500 });
  }
}