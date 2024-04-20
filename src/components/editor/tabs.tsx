"use client";
import { useTabsStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Plus, X } from "lucide-react";
import { useEffect, useState } from "react";

function TabsList() {
  const { tabs, setTab } = useTabsStore((state) => state);
  useEffect(() => {
    if (tabs.length === 0) {
      setTab({
        name: "Untitled",
        isActive: true,
      });
    }
  }, []);
  return (
    <div className="h-[40px] w-[80vw] whitespace-nowrap  border bg-background transition-colors duration-300 lg:w-[80vw]">
      <div className="flex  items-center overflow-x-hidden overflow-y-hidden hover:scroll-m-3 hover:overflow-x-scroll">
        {tabs.map((tab) => (
          <Tab key={tab.id} name={tab.name} id={tab.id} active={tab.isActive} />
        ))}
        <div
          className="ms-2 flex size-6 items-center justify-center rounded-sm bg-hoverColor "
          onClick={() => {
            setTab({ name: `Untitled`, isActive: true });
          }}
        >
          <Plus className="size-4"></Plus>
        </div>
      </div>
    </div>
  );
}

export default TabsList;

function Tab({
  active = false,
  name,
  id,
  onClick,
}: {
  active?: boolean;
  name: string;
  id: number;
  onClick?: () => void;
}) {
  const delTab = useTabsStore((state) => state.delTab);
  const setActiveTab = useTabsStore((state) => state.setActiveTab);
  return (
    <div
      onClick={() => {
        setActiveTab(id);
      }}
      className={cn(
        "group flex h-full  items-center justify-between gap-10 border-r-2 border-t-2 border-border/35 px-2 py-2 hover:bg-hoverColor",
        active && "border-t-blue-500 bg-gray-100 px-1 dark:bg-gray-700 ",
      )}
    >
      <p className="max-w-24 overflow-clip text-ellipsis text-sm hover:cursor-pointer">
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
  );
}
