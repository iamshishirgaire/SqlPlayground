import { Button } from "../ui/button";
import { Input } from "../ui/input";

function DrawerChat() {
  return (
    <div className="flex flex-col  w-full ">
      <div className="border-b p-4">
        <h2 className="font-semibold text-lg">Assistant</h2>
      </div>
      <div className="flex-1 overflow-auto p-4">
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
              Hi! How can I help you today?
            </div>
          </div>
          <div className="flex items-end gap-2">
            <div className="rounded-lg bg-gray-100 p-3 dark:bg-gray-800">
              I need help with a query
            </div>
          </div>
        </div>
      </div>
      <div className="border-t p-4">
        <form className="flex gap-2">
          <Input
            className="flex-1"
            placeholder="Type a message..."
            type="text"
          />
          <Button type="submit">Send</Button>
        </form>
      </div>
    </div>
  );
}

export default DrawerChat;
