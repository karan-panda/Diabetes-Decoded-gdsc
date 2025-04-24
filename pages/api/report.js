import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { NextResponse } from "next/server"

export async function POST(request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file")

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Convert file to base64
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64 = buffer.toString("base64")

    // Generate analysis using AI
    const { text } = await generateText({
      model: openai("gpt-4o"),
      prompt: `
      You are a medical assistant specializing in diabetes analysis.
      
      Analyze the following medical report text for diabetes risk factors and provide a structured response with:
      1. Key health metrics identified in the report
      2. Diabetes risk assessment (Low, Moderate, High)
      3. Recommendations based on the findings
      
      Medical report content (extracted from PDF):
      ${base64.substring(0, 200)}... [Content truncated for prompt size]
      
      Format your response as JSON with the following structure:
      {
        "metrics": { key health metrics as key-value pairs },
        "riskLevel": "Low/Moderate/High",
        "analysis": "Brief paragraph analyzing findings",
        "recommendations": ["recommendation1", "recommendation2", ...]
      }
      `,
      temperature: 0.5,
      maxTokens: 1000,
    })

    // Parse the response text as JSON
    let jsonResponse
    try {
      jsonResponse = JSON.parse(text)
    } catch (e) {
      // Fallback if the AI didn't respond with proper JSON
      jsonResponse = {
        metrics: {
          "Blood Glucose": "Unknown",
          "Blood Pressure": "Unknown",
          BMI: "Unknown",
          Age: "Unknown",
        },
        riskLevel: "Unknown",
        analysis: "Could not properly analyze the report. Please try again or consult a healthcare professional.",
        recommendations: ["Consult with your healthcare provider for a proper analysis of your medical report."],
      }
    }

    return NextResponse.json(jsonResponse)
  } catch (error) {
    console.error("Error analyzing report:", error)
    return NextResponse.json({ error: "Failed to analyze report" }, { status: 500 })
  }
}