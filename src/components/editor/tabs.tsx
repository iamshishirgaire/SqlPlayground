"use client";
import { useTabsStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "../ui/context-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Input } from "../ui/input";

function TabsList() {
  const { tabs, setTab } = useTabsStore((state) => state);
  const { activeTabIndex } = useTabsStore((state) => state);
  const [hasRunEffect, setHasRunEffect] = useState(false);

  useEffect(() => {
    if (!hasRunEffect) {
      if (tabs.length === 0) {
        setTab({
          name: "Untitled",
          isActive: true,
        });
      }
      setHasRunEffect(true);
    }
  }, [hasRunEffect]);

  return (
    <div className="h-[50px] w-[80vw] whitespace-nowrap  border border-border/30 bg-background transition-colors duration-300 lg:w-[80vw]">
      <div className="flex  items-center overflow-x-hidden overflow-y-hidden hover:scroll-m-3 hover:overflow-x-scroll">
        {tabs.map((tab) => (
          <Tab key={tab.id} name={tab.name} id={tab.id} active={tab.isActive} />
        ))}
        {activeTabIndex !== -1 && (
          <div
            className="ms-2 flex size-6 items-center justify-center rounded-sm bg-hoverColor "
            onClick={() => {
              setTab({ name: `Untitled`, isActive: true });
            }}
          >
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Plus className="size-4"></Plus>
                </TooltipTrigger>
                <TooltipContent>
                  <p>New Tab</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        )}
      </div>
    </div>
  );
}

export default TabsList;

function Tab({
  active = false,
  name,
  id,
}: {
  active?: boolean;
  name: string;
  id: number;
}) {
  const delTab = useTabsStore((state) => state.delTab);
  const setActiveTab = useTabsStore((state) => state.setActiveTab);
  const setName = useTabsStore((state) => state.setName);
  const [tabName, setTabName] = useState("");
  return (
    <AlertDialog>
      <ContextMenu>
        <ContextMenuTrigger>
          <div
            onClick={() => {
              setActiveTab(id);
            }}
            className={cn(
              "group m-1 flex h-full items-center  justify-between gap-10  border-b-2 border-border/35 px-2 py-2 hover:bg-hoverColor",
              active && "border-blue-500 bg-gray-100 px-1 dark:bg-[#313131]",
            )}
          >
            <p className="max-w-24 select-none overflow-clip text-ellipsis text-sm hover:cursor-pointer">
              {name}
            </p>
            <X
              onClick={(e) => {
                e.stopPropagation(); // Prevents the setActiveTab from being called when clicking the X
                delTab(id);
              }}
              className={cn(
                "size-3 text-primary/40 group-hover:text-primary",
                active && "text-primary",
              )}
            ></X>
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <AlertDialogTrigger>
            <ContextMenuItem>Rename</ContextMenuItem>
          </AlertDialogTrigger>

          <ContextMenuItem
            onClick={() => {
              delTab(id);
            }}
          >
            Close
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Rename Tab</AlertDialogTitle>
        </AlertDialogHeader>
        <Input
          type="text"
          placeholder={name}
          onChange={(e) => {
            setTabName(e.target.value);
          }}
        />
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            disabled={tabName.length < 1}
            onClick={() => {
              setName(tabName, id);
            }}
          >
            Done
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
