"use client";
import { PlusIcon, ShieldCloseIcon, X } from "lucide-react";
import { useState } from "react";
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
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function DbConnection() {
  const [dbUrl, setDbUrl] = useState("");
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="rounded-full size-10"
            size={"icon"}
            variant="outline"
          >
            <PlusIcon className="p-1" />
            <span className="sr-only">Add new Connection</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Database Connection</AlertDialogTitle>
          </AlertDialogHeader>
          <div className="flex gap-2 mb-6">
            <Input
              value={dbUrl}
              placeholder="postgres://user:password@localhost:5432/dbname"
              onChange={(e) => {
                setDbUrl(e.target.value);
              }}
            ></Input>
            <Button variant={"ghost"} onClick={() => setDbUrl("")}>
              Reset
            </Button>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
