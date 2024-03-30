"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  LanguagesIcon,
  LucideIcon,
  RotateCcw,
  SettingsIcon,
  SunMoon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Settings() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="rounded-full size-10"
            size={"icon"}
            variant="outline"
          >
            <SettingsIcon className="p-1" />
            <span className="sr-only">Add new table</span>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Settings</DialogTitle>
          </DialogHeader>
          <hr />
          <div className="flex  flex-col mt-2">
            <SettingComponent
              icon={<SunMoon className="size-5"></SunMoon>}
              title="Theme"
            >
              <ModeToggle></ModeToggle>
            </SettingComponent>
            <SettingComponent
              icon={<LanguagesIcon className="size-5"></LanguagesIcon>}
              title="Language"
            >
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost" className="rounded-md">
                    English
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>English </DropdownMenuItem>
                  <DropdownMenuSeparator></DropdownMenuSeparator>
                  <DropdownMenuItem>हिन्दी</DropdownMenuItem>
                  <DropdownMenuSeparator></DropdownMenuSeparator>
                  <DropdownMenuItem>नेपाली</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SettingComponent>
            <SettingComponent
              icon={<RotateCcw className="size-5"></RotateCcw>}
              title="Reset Playground"
            >
              <Button variant="ghost" className="rounded-md">
                Reset
              </Button>
            </SettingComponent>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

import React, { ReactElement } from "react";
import { ModeToggle } from "../theme-toggle";

function SettingComponent({
  title,
  icon,
  children,
}: {
  title: string;
  icon: ReactElement;
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full justify-between items-center border-b-2 border-border/20 py-1">
      <div className="flex gap-3">
        {icon}
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {title}
        </p>
      </div>
      <div>{children}</div>
    </div>
  );
}
