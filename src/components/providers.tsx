"use client";
import { useChatStore } from "@/lib/store";
import { useHotkeys } from "react-hotkeys-hook";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./ui/sonner";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
};

export default function Providers({ children }: Props) {
  const [showChat, setshowChat] = useChatStore((state) => [
    state.showChat,
    state.setShowChat,
  ]);

  useHotkeys("meta+c", () => setshowChat(true), [showChat]);
  const queryClient = new QueryClient();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      <Toaster position="top-right" closeButton richColors></Toaster>
    </ThemeProvider>
  );
}
