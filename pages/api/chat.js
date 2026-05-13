import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth/[...nextauth]";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "Method not allowed" });

  const session = await getServerSession(req, res, authOptions);
  if (!session)
    return res.status(401).json({ message: "You must be logged in to use AI chat" });

  const { message, history = [] } = req.body;
  if (!message)
    return res.status(400).json({ message: "Message is required" });

  try {
    await prisma.message.create({
      data: { content: message, role: "user", userId: session.user.id },
    });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-opus-4-5",
        max_tokens: 1024,
        system: `You are a helpful AI assistant on Rocky Chowdhury's personal website. Be friendly and helpful. Current user: ${session.user.name || session.user.email}`,
        messages: [...history, { role: "user", content: message }],
      }),
    });

    if (!response.ok) throw new Error("Anthropic API error");

    const data = await response.json();
    const aiMessage = data.content[0].text;

    await prisma.message.create({
      data: { content: aiMessage, role: "assistant", userId: session.user.id },
    });

    return res.status(200).json({ message: aiMessage });
  } catch (error) {
    console.error("Chat error:", error);
    return res.status(500).json({ message: "AI service error. Check your API key." });
  }
}
