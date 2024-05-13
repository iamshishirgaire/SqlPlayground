import { openai } from "@/lib/openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

type Message = {
  role: "system" | "user" | "assistant" | "function";
  content: string | null;
};

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const data = await req.json();
  const bodySchema = z.object({
    messages: z.array(
      z.object({
        role: z.enum(["system", "user", "assistant", "function"]),
        content: z.string().nullable(),
      }),
    ),
    schema: z.string(),
  });

  const validated = bodySchema.safeParse(data);

  if (!validated.success) {
    return NextResponse.json(validated.error, { status: 400 });
  }

  const { schema, messages } = validated.data;

  const prompt = messages[messages.length - 1];

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "Only answer questions about PostgreSQL and the user provided database schema if any. Return only SQL code with no explanation.If user asks for explanation explicitly, explain in short and sweet answer.",
      },
      {
        role: "user",
        content: `database schema: ${schema}`,
      },
      prompt as any,
    ],

    stream: true,
  });

  const stream = OpenAIStream(response);

  return new StreamingTextResponse(stream);
}
