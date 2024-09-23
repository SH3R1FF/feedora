import { NextResponse } from "next/server";

export async function GET() {
  try {
    const messages = [
      { id: 1, message: "What's a hobby you've recently started?" },
      {
        id: 2,
        message:
          "If you could have dinner with any historical figure, who would it be?",
      },
      { id: 3, message: "What's a simple thing that makes you happy?" },
      { id: 4, message: "What book or movie had a significant impact on you?" },
      {
        id: 5,
        message: "If you could live in any fictional world, which would it be?",
      },
      { id: 6, message: "What's a skill you'd love to learn someday?" },
      {
        id: 7,
        message: "What's the most interesting place you've ever visited?",
      },
      {
        id: 8,
        message:
          "If you could master any musical instrument, which one would you choose?",
      },
      {
        id: 9,
        message: "What's your favorite way to unwind after a long day?",
      },
      {
        id: 10,
        message:
          "If you could have any animal as a pet, real or mythical, what would it be?",
      },
      { id: 11, message: "What's a favorite memory from your childhood?" },
      {
        id: 12,
        message: "If you could time travel to any era, where would you go?",
      },
      { id: 13, message: "What's a random fact you love sharing?" },
      { id: 14, message: "What's something new you've tried recently?" },
      {
        id: 15,
        message:
          "If you could change one thing about the world, what would it be?",
      },
      { id: 16, message: "What's your favorite quote or saying?" },
      {
        id: 17,
        message:
          "If you could swap lives with someone for a day, who would it be?",
      },
      {
        id: 18,
        message: "What's a dream you've had that you still remember vividly?",
      },
      { id: 19, message: "What's a dish you've always wanted to try cooking?" },
      {
        id: 20,
        message:
          "If you could instantly speak any language, which one would you choose?",
      },
    ];

    const randomMessage = messages[Math.floor(Math.random() * messages.length)];
    return NextResponse.json({
      success: true,
      message: "New Generated Message",
      messages: randomMessage,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Failed to generate new message",
      },
      { status: 500 }
    );
  }
}