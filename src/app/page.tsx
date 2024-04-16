import { Editor } from "@/components/editor/editor";
import { NavBar } from "@/components/header/navbar";
import Result from "@/components/result/result";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";
import { Sidebar } from "../components/sidebar/Sidebar";

export default function Home() {
  return (
    <div className="flex h-screen flex-col pl-4">
      <div className="mx-auto w-full  border-b bg-background">
        <NavBar />
      </div>
      <div className="flex flex-1">
        <Sidebar />

        <div className="flex flex-1 flex-col gap-4 bg-background p-4">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={40} className="p-1">
              <Editor></Editor>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={60} className="mt-5">
              <Result></Result>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
}
