import { DatabaseIcon } from "lucide-react";
import Link from "next/link";
import { Chat } from "../chat/chat";
import DbConnection from "./dbConnection";
import RefreshTables from "./refresh";
import Settings from "./setting";
export function NavBar({}) {
  return (
    <div className="flex h-[60px] items-center  gap-4 px-6">
      <Link
        className="flex items-center  gap-2 text-gray-500 dark:text-gray-400"
        href="#"
      >
        <DatabaseIcon className="h-6 w-6 text-blue-500" />
        <span className="inline-block font-bold text-blue-500">Playground</span>
      </Link>
      <div className="flex w-full gap-4">
        <DbConnection></DbConnection>
        <RefreshTables></RefreshTables>
        <Settings></Settings>
        <div className="ml-auto">
          <Chat></Chat>
        </div>
      </div>
    </div>
  );
}
