import { generateText } from "ai";
import { openai } from "@ai-sdk/openai";
import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { prompt, max_tokens } = await req.json();

    // Call generateText with your prompt. The model is instructed to output JSON.
    const result = await generateText({
      model: openai("gpt-4o-mini"),
      system:
        "You are an expert art consultant. Your role is to analyze the buyer's ideas, image URLs, and descriptive tags to create a structured creative brief. Advise an artist on what to create based on the buyer's vision by considering art styles, techniques, mood, and suitable color palettes. Provide clear, concise recommendations in a structured JSON format.",
      prompt,
      maxTokens: max_tokens,
    });

    // Return the text from the model as JSON.
    return new Response(JSON.stringify({ text: result.text }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Error in generate-art-brief endpoint:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Internal Server Error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}