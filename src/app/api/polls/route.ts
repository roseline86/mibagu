import { PrismaClient } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();
const secret = process.env.NEXTAUTH_SECRET;

// API for Admin to Add Polls
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { title, question, type, options } = await req.json();
    const newPoll = await prisma.poll.create({
      data: {
        title,
        question,
        type,
        options: type === "poll" ? options : [],
      },
    });
    return new NextResponse(JSON.stringify(newPoll));
  } catch (error) {
    return new NextResponse("Error creating poll", { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    // Get the user session to get their userId

    const token = await getToken({ req, secret });
    const id = token?.sub;

    const polls = await prisma.poll.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    // Calculate the vote results for each poll
    const pollsWithResults = polls.map((poll) => {
      const results = poll.options.map((option) => {
        const votes = poll.responses.filter(
          (response) => response === option,
        ).length;
        return {
          option,
          votes,
          percentage: (votes / poll.responses.length) * 100 || 0, // Avoid NaN for 0 votes
        };
      });

      // Find if the user has already voted and what option they chose
      const userVote = poll.responses.find(
        (response, index) => poll.voters[index] === id,
      );

      return {
        ...poll,
        results, // Add the results to each poll
        userVote: userVote || null, // If user has voted, return their choice
      };
    });

    return new NextResponse(JSON.stringify(pollsWithResults), { status: 200 });
  } catch (error) {
    console.error("Error fetching polls:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// This API will handle saving user responses:

export async function PATCH(req: NextRequest) {
  try {
    // Extract poll ID from query params
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("Poll ID is required", { status: 400 });
    }

    // Parse the request body
    const body = await req.json();
    const { response, userId } = body;

    if (!response || !userId) {
      return new NextResponse("Response and userId are required", {
        status: 400,
      });
    }

    // Fetch the existing poll
    const existingPoll = await prisma.poll.findUnique({
      where: { id },
    });

    if (!existingPoll) {
      return new NextResponse("Poll not found", { status: 404 });
    }

    // Check if the user has already voted
    const userVoteIndex = existingPoll.voters.findIndex(
      (voter) => voter === userId,
    );

    if (userVoteIndex !== -1) {
      // User has already voted, replace their previous vote
      existingPoll.responses[userVoteIndex] = response;
    } else {
      // User hasn't voted, add their vote and mark them as having voted
      existingPoll.responses.push(response);
      existingPoll.voters.push(userId);
    }

    // Update the poll with the new or replaced response
    const poll = await prisma.poll.update({
      where: { id },
      data: {
        responses: existingPoll.responses,
        voters: existingPoll.voters,
      },
    });

    return NextResponse.json(poll, { status: 200 });
  } catch (error) {
    console.error("Error updating poll:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    // Extract poll ID from query params
    const { searchParams } = req.nextUrl;
    const id = searchParams.get("id");

    if (!id) {
      return new NextResponse("Poll ID is required", { status: 400 });
    }

    // Find and delete the poll
    const poll = await prisma.poll.delete({
      where: { id },
    });

    return NextResponse.json(
      { message: "Poll deleted successfully", poll },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting poll:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
