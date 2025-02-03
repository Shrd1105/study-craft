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

    const response = await fetch(`${EXPRESS_BACKEND_URL}/api/generate-plan/${session.user.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Express backend error:', error);
      throw new Error('Failed to fetch study plans');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in study-plan route:", error);
    return NextResponse.json(
      { error: "Failed to fetch study plans", details: (error as Error).message },
      { status: 500 }
    );
  }
} 