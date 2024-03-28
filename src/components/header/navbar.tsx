import {
  DatabaseIcon,
  Link2,
  PlusIcon,
  RefreshCwIcon,
  SettingsIcon,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import DrawerChat from "./drawerChat";
export function NavBar({}) {
  return (
    <div className="flex h-[60px] items-center  gap-4 px-6">
      <Link
        className="flex items-center  gap-2 text-gray-500 dark:text-gray-400"
        href="#"
      >
        <DatabaseIcon className="h-6 w-6" />
        <span className="font-semibold">Database</span>
      </Link>
      <div className="flex w-full gap-4">
        <Button
          className="rounded-full size-10"
          size={"icon"}
          variant="outline"
        >
          <PlusIcon className="p-1" />
          <span className="sr-only">Add new table</span>
        </Button>

        <Button className="rounded-full size-10" size="icon" variant="outline">
          <RefreshCwIcon className="size-4" />
          <span className="sr-only">Refresh</span>
        </Button>
        <Button className="rounded-full size-10" size="icon" variant="outline">
          <SettingsIcon className="size-4" />
          <span className="sr-only">Settings</span>
        </Button>
        <div className="ml-auto">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="rounded-full h-10"
                size={"icon"}
                variant={"outline"}
              >
                <Sparkles className="p-1"></Sparkles>
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[400px] sm:w-[540px]">
              <SheetHeader>
                <SheetTitle>Are you absolutely sure?</SheetTitle>
                <SheetDescription>
                  This action cannot be undone. This will permanently delete
                  your account and remove your data from our servers.
                </SheetDescription>
              </SheetHeader>
              <DrawerChat></DrawerChat>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </div>
  );
}
