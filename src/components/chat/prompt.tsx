import { Textarea, TextareaProps } from "../ui/textarea";
import { Button } from "../ui/button";
import { PaperPlaneIcon } from "@radix-ui/react-icons";

export const Prompt = (props: TextareaProps) => {
  return (
    <div className="flex items-center space-x-2">
      <Textarea
        autoFocus
        rows={1}
        className="w-full resize-none focus:ring-0  focus:ring-offset-0"
        placeholder="Ask AI a question"
        {...props}
      />
      <Button type="submit" size="icon">
        <PaperPlaneIcon />
      </Button>
    </div>
  );
};
