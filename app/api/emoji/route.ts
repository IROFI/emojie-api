import { type NextRequest, NextResponse } from "next/server"
import { generateText } from "ai"
import { groq } from "@ai-sdk/groq"

export async function POST(request: NextRequest) {
  try {
    // Check API key
    const apiKey = request.headers.get("X-API-KEY")

    if (!apiKey || apiKey !== process.env.API_KEY) {
      return NextResponse.json({ error: "Invalid or missing API key" }, { status: 401 })
    }

    // Parse the request body
    const body = await request.json()
    const { text } = body

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 })
    }

    // Prepare the prompt for Groq
    const prompt = `With the sentence: '${text}', give an emoji relative to the situation. I need only one emoji, no phrase, no explanation, and no more than one emoji.`

    // Call the Groq API
    const { text: emojiResponse } = await generateText({
      model: groq("llama-3.1-8b-instant"),
      prompt,
      maxTokens: 10, // Limit tokens since we only need one emoji
    })

    // Extract just the emoji from the response
    const emojiMatch = emojiResponse.match(/[\p{Emoji}]/u)
    const emoji = emojiMatch ? emojiMatch[0] : "❓"

    // Return the emoji in the specified format
    return NextResponse.json({ emoji })
  } catch (error) {
    console.error("API error:", error)
    return NextResponse.json({ error: "Failed to process request" }, { status: 500 })
  }
}
