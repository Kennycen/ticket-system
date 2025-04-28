import { NextResponse } from 'next/server';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

export async function PATCH(request, { params }) {
  try {
    const { id } = params; 
    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        { error: "Request body is required" },
        {
          status: 400,
        }
      );
    }

    const response = await axios.patch(
      `${BACKEND_URL}/api/tickets/${id}`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    return NextResponse.json(response.data);
  } catch (error) {
    console.error(
      "Error updating ticket:",
      error.response?.data || error.message
    );

    if (error.response) {
      return NextResponse.json(
        { error: error.response.data?.error || "Failed to update ticket" },
        { status: error.response.status }
      );
    }

    return NextResponse.json(
      { error: "Failed to update ticket" },
      { status: 500 }
    );
  }
}