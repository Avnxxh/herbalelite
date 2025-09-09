// app/api/sign-cloudinary-params/route.ts
import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { paramsToSign } = body;

    // Add timestamp for signature validation
    const paramsWithTimestamp = {
      ...paramsToSign,
      timestamp: Math.round(new Date().getTime() / 1000),
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsWithTimestamp,
      process.env.CLOUDINARY_API_SECRET!
    );

    return NextResponse.json({ 
      signature,
      timestamp: paramsWithTimestamp.timestamp
    });
  } catch (error) {
    console.error('Cloudinary signature error:', error);
    return NextResponse.json(
      { error: 'Error generating signature' },
      { status: 500 }
    );
  }
}