"use client";
import { useResultModeStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const ToggleButtonGroup = () => {
  const { mode, setMode } = useResultModeStore((state) => state);
  const options = [
    { id: "JSON", label: "Json" },
    { id: "TABLE", label: "Table" },
  ] as const;

  const handleOptionClick = (optionId: "JSON" | "TABLE") => {
    setMode(optionId);
  };

  return (
    <div className="flex rounded-md border-2  ">
      <button
        onClick={() => handleOptionClick(options[0].id)}
        className={cn(
          "rounded-l-md px-3 py-1 focus:outline-none",
          mode === options[0].id
            ? "bg-hoverColor "
            : "bg-background hover:bg-hoverColor",
        )}
      >
        {options[0].label}
      </button>
      <button
        onClick={() => handleOptionClick(options[1].id)}
        className={cn(
          "rounded-r-md px-3  py-1 focus:outline-none",
          mode === options[1].id
            ? "bg-hoverColor"
            : "bg-background hover:bg-hoverColor",
        )}
      >
        {options[1].label}
      </button>
    </div>
  );
};

export default ToggleButtonGroup;
