"use client";
import { useConnectionStore } from "@/lib/store";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function DbConnection() {
  const connectionUrl = useConnectionStore((state) => state.connectionUrl);
  const setConnectionUrl = useConnectionStore(
    (state) => state.setConnectionUrl,
  );
  const setHasConnection = useConnectionStore(
    (state) => state.setHasConnection,
  );

  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            className="size-10 rounded-full"
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
          <div className="mb-6 flex gap-2">
            <Input
              value={connectionUrl}
              placeholder="postgres://user:password@localhost:5432/dbname"
              onChange={(e) => {
                setConnectionUrl(e.target.value);
                setHasConnection(true);
              }}
            ></Input>
            <Button variant={"ghost"} onClick={() => setConnectionUrl("")}>
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
