import storage from "@/utils/firebaseConfig";
import { PrismaClient } from "@prisma/client";
import { deleteObject, ref } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const { searchParams } = req.nextUrl;
    const ads = await prisma.ads.findMany();
    return new NextResponse(JSON.stringify(ads), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const adId = searchParams.get("adId");

    if (!adId) {
      return new NextResponse("Ad ID is required", { status: 400 });
    }

    // Check if the user exists
    const existingUser = await prisma.ads.findUnique({
      where: { id: adId },
    });

    if (!existingUser) {
      return new NextResponse("User not found", { status: 404 });
    }

    // Delete the previous cover image if it exists
    if (existingUser.coverImage) {
      const storageRefToDelete = ref(storage, existingUser.coverImage);
      await deleteObject(storageRefToDelete);
    }

    // Delete the ad from the database
    await prisma.ads.delete({
      where: {
        id: adId,
      },
    });

    return new NextResponse("Ad deleted successfully", { status: 200 });
  } catch (error) {
    console.error("Error deleting ad:", error);
    return new NextResponse("Failed to delete ad", { status: 500 });
  }
}
