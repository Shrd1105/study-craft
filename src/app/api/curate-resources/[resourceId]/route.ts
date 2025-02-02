import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { connectMongoDB } from "@/lib/mongodb";
import { authOptions } from "@/lib/auth";
import CuratedResource from "@/models/curatedResource";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { resourceId: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectMongoDB();

    const resource = await CuratedResource.findOneAndDelete({
      _id: params.resourceId,
      userId: session.user.id,
    });

    if (!resource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Resources deleted successfully" });
  } catch (error) {
    console.error("Error deleting resources:", error);
    return NextResponse.json(
      { error: "Failed to delete resources" },
      { status: 500 }
    );
  }
} 