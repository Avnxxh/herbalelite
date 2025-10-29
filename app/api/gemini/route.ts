import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from 'next/server';

// Define types for the request body
interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface RequestBody {
  messages: ChatMessage[];
  district?: string;
}

interface Choice {
  message: {
    content: string;
  };
}

interface ResponseData {
  choices?: Choice[];
  error?: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();
    const { messages, district } = body;
    
    // Validate API key
    if (!process.env.GEMINI_API_KEY) {
      throw new Error('Missing GEMINI_API_KEY environment variable');
    }
    
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024
      }
    });

    // Filter out system messages and ensure proper alternation between user and model
    const filteredMessages = messages.filter(msg => msg.role !== 'system');
    
    // Check if we have any user messages
    const userMessages = filteredMessages.filter(m => m.role === 'user');
    if (userMessages.length === 0) {
      throw new Error('No user messages found');
    }

    // Get the last user message
    const lastUserMessage = userMessages[userMessages.length - 1];
    
    if (!lastUserMessage.content.trim()) {
      throw new Error('No valid user message found');
    }

    // For Gemini, we need to create a proper history
    // Let's create a simple prompt that includes the conversation context
    let prompt = "You are Nisarg AI, a helpful assistant specialized in herbal plants. ";
    prompt += "Please respond to the following question about herbal plants:\n\n";
    
    // Add conversation context
    filteredMessages.forEach(msg => {
      prompt += `${msg.role}: ${msg.content}\n`;
    });
    
    prompt += `assistant: `;

    // Use generateContent instead of startChat for simpler implementation
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return NextResponse.json({
      choices: [{
        message: {
          content: text
        }
      }]
    });
    
  } catch (error) {
    console.error('Gemini API error:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}