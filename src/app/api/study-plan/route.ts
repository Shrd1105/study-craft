import {  NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const EXPRESS_BACKEND_URL = process.env.EXPRESS_BACKEND_URL || 'http://localhost:5000';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const url = `${EXPRESS_BACKEND_URL}/generate-plan/${session.user.id}`;
    console.log('Making request to:', url);

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store'
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend error response:', errorText);
      throw new Error(`Backend request failed: ${errorText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in study-plan route:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch study plans", 
        details: (error as Error).message,
        backendUrl: EXPRESS_BACKEND_URL // This helps debug production issues
      },
      { status: 500 }
    );
  }
} 