"use client";
import { cn } from "@/lib/utils";
import React, { useState } from "react";

const ToggleButtonGroup = () => {
  const [selectedOption, setSelectedOption] = useState<number>(1);

  const options = [
    { id: 1, label: "Json" },
    { id: 2, label: "Table" },
  ];

  const handleOptionClick = (optionId: number) => {
    setSelectedOption(optionId);
  };

  return (
    <div className="flex rounded-md border-2  ">
      <button
        onClick={() => handleOptionClick(options[0].id)}
        className={cn(
          "rounded-l-md px-3 py-1 focus:outline-none",
          selectedOption === options[0].id
            ? "bg-hoverColor "
            : "hover:bg-hoverColor bg-background",
        )}
      >
        {options[0].label}
      </button>
      <button
        onClick={() => handleOptionClick(options[1].id)}
        className={cn(
          "rounded-r-md px-3  py-1 focus:outline-none",
          selectedOption === options[1].id
            ? "bg-hoverColor"
            : "hover:bg-hoverColor bg-background",
        )}
      >
        {options[1].label}
      </button>
    </div>
  );
};

export default ToggleButtonGroup;
