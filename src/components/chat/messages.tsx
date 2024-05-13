import type { Message } from "ai";
import { useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";
import { Code } from "./code";

type Props = {
  messages: Message[];
};

export const Messages = ({ messages }: Props) => {
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    listRef.current?.lastElementChild?.scrollIntoView();
  }, [messages]);

  return (
    <>
      <ScrollArea className="flex-grow">
        {messages.length === 0 ? (
          <div className="bg-primary-element text-muted-high-contrast rounded-md border p-5">
            <p>
              You can start a conversation here and experiment with different
              prompts depending on your schema. Here are a few examples:
            </p>
            <ul className="ml-8 mt-3 list-disc space-y-2">
              <li>Create a database schema for a podcast app</li>
              <li>Get me employees whose salary is less than 50000</li>
              <li>Total amount of orders for each customer </li>
            </ul>
          </div>
        ) : (
          messages.map((message) => (
            <ul
              ref={listRef}
              key={message.id}
              className={cn(
                "",
                message.role === "user"
                  ? "bg-primary-element text-muted-high-contrast overflow mb-3 ml-auto max-w-max rounded-md px-3 py-1.5"
                  : "bg-muted-element",
              )}
            >
              <li>
                {message.role === "user"
                  ? message.content
                  : message.role === "assistant" && (
                      <Code response={message.content} />
                    )}
              </li>
            </ul>
          ))
        )}
      </ScrollArea>
    </>
  );
};
