"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { LanguagesIcon, RotateCcw, SettingsIcon, SunMoon } from "lucide-react";
import React, { ReactElement } from "react";
import { ModeToggle } from "../theme-toggle";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function Settings() {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="size-10 rounded-full"
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
          <div className="mt-2  flex flex-col">
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
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost">English</Button>
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
              <Button variant="ghost">Reset</Button>
            </SettingComponent>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

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
    <div className="flex w-full items-center justify-between border-b-2 border-border/20 py-1">
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
