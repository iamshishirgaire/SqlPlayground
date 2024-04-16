import { cn } from "@/lib/utils";
import { X } from "lucide-react";

function TabsList() {
  return (
    <div className="h-[40px] w-[80vw] whitespace-nowrap  border bg-background transition-colors duration-300 lg:w-[80vw]">
      <div className="flex  overflow-x-hidden overflow-y-hidden hover:scroll-m-3 hover:overflow-x-scroll">
        <Tab active={true}></Tab>
        <Tab></Tab>
      </div>
    </div>
  );
}

export default TabsList;

function Tab({
  edited = false,
  dirty = false,
  active = false,
}: {
  edited?: boolean;
  dirty?: boolean;
  active?: boolean;
}) {
  return (
    <div
      className={cn(
        "group flex h-full  items-center justify-between gap-10 border-r-2 border-t-2 border-border/35 px-2 py-2 hover:bg-hoverColor",
        edited && "",
        active && "border-t-blue-500 bg-gray-100 px-1 dark:bg-gray-700 ",
      )}
    >
      <p className="max-w-24 overflow-clip text-ellipsis text-sm hover:cursor-pointer">
        filterquerytab
      </p>
      <X
        onClick={() => {
          console.log("clicked");
        }}
        className={cn(
          "size-3 text-primary/40 group-hover:text-primary",
          active && "text-primary",
        )}
      ></X>
    </div>
  );
}
