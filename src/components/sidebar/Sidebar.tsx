import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";

export function Sidebar({}) {
  return (
    <div className="hidden w-[400px] border-r lg:block bg-background">
      <div className="flex h-full flex-col gap-2">
        <div className="p-4 border-b">
          <h2 className="font-semibold text-lg">Tables</h2>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <ul className="grid gap-2">
            <li>
              <Link
                className="flex items-center gap-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <ChevronRightIcon className="h-4 w-4" />
                Customers
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <ChevronRightIcon className="h-4 w-4" />
                Orders
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <ChevronRightIcon className="h-4 w-4" />
                Products
              </Link>
            </li>
            <li>
              <Link
                className="flex items-center gap-2 text-gray-500 transition-all hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                href="#"
              >
                <ChevronRightIcon className="h-4 w-4" />
                Users
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
