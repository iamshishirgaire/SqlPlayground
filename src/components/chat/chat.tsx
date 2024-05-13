"use client";
import { useEnterSubmit } from "@/lib/hooks/use-enter-submit";
import { useChatStore, useEditorSchemaStore } from "@/lib/store";
import { useChat } from "ai/react";
import { MessageSquareIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Messages } from "./messages";
import { Prompt } from "./prompt";

export const Chat = () => {
  const { showChat, setShowChat } = useChatStore((state) => state);
  const { formRef, onKeyDown } = useEnterSubmit();
  const { schema } = useEditorSchemaStore((state) => state);

  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: `${process.env.NEXT_PUBLIC_BASE_URL}/api/chat`,
      onError(error: any) {
        toast.error(error?.message as string);
      },
      body: {
        schema: JSON.stringify(schema) ?? "",
      },
    });

  return (
    <Sheet open={showChat} onOpenChange={setShowChat}>
      <SheetTrigger asChild>
        <Button
          className="size-10 rounded-full"
          variant={"outline"}
          size="icon"
        >
          <MessageSquareIcon className="size-4" />
          <span className="sr-only">Refresh</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="flex min-w-[700px] flex-col space-y-5 focus:ring-0  focus:ring-offset-0"
      >
        <SheetHeader>
          <SheetTitle>Postgres AI Playground</SheetTitle>
          <SheetDescription>
            Ask questions about your schema or sql query .{" "}
          </SheetDescription>
        </SheetHeader>
        <Messages messages={messages} />
        <form ref={formRef} onSubmit={handleSubmit}>
          <Prompt
            onKeyDown={onKeyDown}
            maxLength={500}
            disabled={isLoading}
            onChange={handleInputChange}
            value={input}
          />
        </form>
      </SheetContent>
    </Sheet>
  );
};
