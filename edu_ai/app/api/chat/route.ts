import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    // Use Gemini 1.5 Flash (fast & cheap) or Pro (better reasoning)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(message);
    const response = result.response.text();

    return NextResponse.json({ reply: response });
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { reply: "⚠️ Sorry, something went wrong while contacting Gemini." },
      { status: 500 }
    );
  }
}
