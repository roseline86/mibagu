import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const body = await req.json(); // Get the request body
    const { email } = body; // Extract email from the body

    // Validate email format
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Check if the email is already subscribed
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (existingSubscriber) {
      return NextResponse.json(
        { message: "This email is already subscribed!" },
        { status: 409 }, // Conflict status code for duplicate entry
      );
    }

    // Save the email in the database
    const subscriber = await prisma.subscriber.create({
      data: { email },
    });

    return NextResponse.json(
      { message: "Successfully subscribed!", subscriber },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error saving subscriber:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Extract email from the query parameters
    const url = new URL(req.url);
    const email = url.searchParams.get("mail");

    // Validate email format
    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 },
      );
    }

    // Check if the email exists in the subscribers list
    const existingSubscriber = await prisma.subscriber.findUnique({
      where: { email },
    });

    if (!existingSubscriber) {
      return NextResponse.json(
        { error: "Email not found in the subscribers list" },
        { status: 404 }, // Not found status code
      );
    }

    // Delete the email from the database
    await prisma.subscriber.delete({
      where: { email },
    });

    return NextResponse.json(
      { message: "Successfully unsubscribed!" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting subscriber:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const url = new URL(req.url);
    const email = url.searchParams.get("mail");
    const subscriber = await prisma.subscriber.findMany({
      select: {
        email: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    return new NextResponse(JSON.stringify(subscriber), { status: 200 });
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
