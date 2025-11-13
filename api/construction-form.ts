import type { VercelRequest, VercelResponse } from '@vercel/node';

const BACKEND_URL = process.env.VITE_BACKEND_URL || 'https://nova-styles-backend.onrender.com';

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Enable CORS
  response.setHeader('Access-Control-Allow-Credentials', 'true');
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  response.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
  );

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    response.status(200).end();
    return;
  }

  if (request.method !== 'POST') {
    response.status(405).json({ success: false, message: 'Method not allowed' });
    return;
  }

  try {
    const url = `${BACKEND_URL}/api/v1/content/construction-form`;
    
    const backendResponse = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request.body),
    });

    const data = await backendResponse.json();

    // Forward the status code and data
    response.status(backendResponse.status).json(data);
  } catch (error: any) {
    console.error('Proxy error:', error);
    response.status(500).json({
      success: false,
      message: 'Failed to submit form',
      error: error.message,
    });
  }
}

