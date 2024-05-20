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
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={20}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle />

        <ResizablePanel defaultSize={80}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={60} className="p-0">
              <Editor></Editor>
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={40} className="mt-5">
              <Result></Result>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
