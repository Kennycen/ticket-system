import { NextResponse } from 'next/server';
import axios from 'axios';

// Use the environment variable, fallback to localhost for development
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

export async function GET() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/tickets`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json({ error: 'Failed to fetch tickets' }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const response = await axios.post(`${BACKEND_URL}/api/tickets`, body);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json({ error: 'Failed to create ticket' }, { status: 500 });
  }
}