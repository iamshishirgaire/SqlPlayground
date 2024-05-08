"use client";
import { RefreshCwIcon } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";

function RefreshTables() {
  return (
    <div>
      <Button
        className="size-10 rounded-full"
        size="icon"
        variant="outline"
        onClick={() => {
          toast.info("Updating Schemas...");
        }}
      >
        <RefreshCwIcon className="size-4" />
        <span className="sr-only">Refresh</span>
      </Button>
    </div>
  );
}

export default RefreshTables;
