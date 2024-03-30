import React from "react";
import { Button } from "../ui/button";
import { RefreshCwIcon } from "lucide-react";

function RefreshTables() {
  return (
    <div>
      <Button className="rounded-full size-10" size="icon" variant="outline">
        <RefreshCwIcon className="size-4" />
        <span className="sr-only">Refresh</span>
      </Button>
    </div>
  );
}

export default RefreshTables;
