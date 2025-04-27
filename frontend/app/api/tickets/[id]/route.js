import { NextResponse } from 'next/server';
import axios from 'axios';

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5000';

// Handle OPTIONS requests for CORS preflight
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, Accept',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export async function PATCH(request) {
  try {
    const id = request.url.split('/').pop();
    const body = await request.json();

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json({ error: 'Request body is required' }, { 
        status: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    console.log('Sending PATCH request to backend:', {
      url: `${BACKEND_URL}/api/tickets/${id}`,
      body,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    const response = await axios({
      method: 'patch',
      url: `${BACKEND_URL}/api/tickets/${id}`,
      data: body,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    return NextResponse.json(response.data, {
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
  } catch (error) {
    console.error('Error updating ticket:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      config: error.config
    });
    
    if (error.response) {
      return NextResponse.json(
        { error: error.response.data?.error || 'Failed to update ticket' },
        { 
          status: error.response.status,
          headers: {
            'Access-Control-Allow-Origin': '*',
          }
        }
      );
    }
    
    return NextResponse.json({ error: 'Failed to update ticket' }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}