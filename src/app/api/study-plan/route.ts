import {NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectMongoDB } from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import StudyPlan from "@/models/studyPlan";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();

    const plans = await StudyPlan.find({
      userId: session.user.id,
      isActive: true,
    }).sort({ createdAt: -1 });

    return NextResponse.json({ plans });
  } catch (error) {
    console.error("Error fetching study plans:", error);
    return NextResponse.json(
      { error: "Failed to fetch study plans" },
      { status: 500 }
    );
  }
} 