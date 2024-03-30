import { NavBar } from "@/components/header/navbar";
import Result from "@/components/result/result";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Sidebar } from "../components/sidebar/Sidebar";
import { Editor } from "@/components/editor/editor";

export default function Home() {
  return (
    <div className="flex flex-col h-screen">
      <div className="border-b w-full  mx-auto bg-background">
        <NavBar />
      </div>
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col gap-4 p-4 bg-background">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={200} className="p-1">
              <Editor></Editor>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={500} className="mt-5">
              <Result></Result>
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
}
