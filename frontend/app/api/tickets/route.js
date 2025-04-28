import { NextResponse } from 'next/server';
import axios from 'axios';

// Use the environment variable, fallback to Render URL for production
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'https://ticket-system-backend.onrender.com';

export async function GET() {
  try {
    const response = await axios.get(`${BACKEND_URL}/api/tickets`);
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error fetching tickets:', error);
    return NextResponse.json(
      { error: 'Failed to fetch tickets', details: error.response?.data },
      { status: error.response?.status || 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Validate request body
    if (!body.name || !body.email || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields', details: {
          name: !body.name ? 'Name is required' : null,
          email: !body.email ? 'Email is required' : null,
          description: !body.description ? 'Description is required' : null
        }},
        { status: 400 }
      );
    }

    const response = await axios.post(`${BACKEND_URL}/api/tickets`, body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return NextResponse.json(response.data);
  } catch (error) {
    console.error('Error creating ticket:', error);
    return NextResponse.json(
      { error: 'Failed to create ticket' },
      { status: 500 }
    );
  }
}