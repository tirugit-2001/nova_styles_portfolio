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

  try {
    const url = `${BACKEND_URL}/api/v1/portfolioContent/portfolio`;
    
    const backendResponse = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await backendResponse.json();

    // Forward the status code and data
    response.status(backendResponse.status).json(data);
  } catch (error: any) {
    console.error('Proxy error:', error);
    response.status(500).json({
      success: false,
      message: 'Failed to fetch portfolio data',
      error: error.message,
    });
  }
}

