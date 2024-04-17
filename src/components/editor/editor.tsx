"use client";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";
import { PostgreSQL, sql } from "@codemirror/lang-sql";
import { EditorView, keymap } from "@codemirror/view";
import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import { useTheme } from "next-themes";

import { acceptCompletion } from "@codemirror/autocomplete";
import { toast } from "sonner";
import { Button } from "../ui/button";
import TabsList from "./tabs";
import { editorTheme, theme } from "./theme";
import {
  useChatStore,
  useConnectionStore,
  useQueryStore,
  useResultStore,
} from "@/lib/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { runQuery } from "@/lib/query";
import { CopyButton } from "../copy-button";

export const Editor = () => {
  const queryClient = useQueryClient();
  const { query, setQuery } = useQueryStore((state) => state);
  const { setResult } = useResultStore((state) => state);
  const { connectionUrl, hasConnection } = useConnectionStore((state) => state);
  const { setShowChat, showChat } = useChatStore((state) => state);
  const { resolvedTheme } = useTheme();
  const hasMounted = useHasMounted();
  const { mutate, isPending } = useMutation({
    mutationFn: runQuery,
    onSuccess: (data: any) => {
      console.log(data);
      setResult(data);
      queryClient.invalidateQueries({ queryKey: ["schema"] });
    },
    onError: (error: any) => {
      console.log(error);
      toast.error(`Error: ${error.message}`);
    },
  });
  const executeQuery = () => {
    if (query.trimEnd() === "" || !connectionUrl) return;
    mutate({ query, connectionString: connectionUrl });
  };

  if (!hasMounted) {
    return <div className="relative h-[93vh] bg-background" />;
  }

  return (
    <>
      <TabsList></TabsList>
      <CodeMirror
        height="100vh"
        theme={resolvedTheme === "dark" ? theme.dark : theme.light}
        value={query}
        basicSetup={{
          defaultKeymap: false,
        }}
        placeholder="Write a SQL query..."
        onChange={(value: string) => setQuery(value)}
        extensions={[
          editorTheme,
          keymap.of([
            {
              key: "Tab",
              win: "Tab",
              run: (e) => {
                return acceptCompletion(e);
              },
            },
          ]),
          EditorView.lineWrapping,
          keymap.of([
            {
              key: "Mod-Enter",
              run: () => {
                if (hasConnection && query.trimEnd() !== "") {
                  executeQuery();
                }
                return true;
              },
            },
            {
              key: "Mod-k",
              run: () => {
                if (hasConnection) {
                  setShowChat(true);
                }
                return true;
              },
            },
          ]),
          basicSetup(),

          sql({
            dialect: PostgreSQL,
            upperCaseKeywords: true,
            // schema: editorSchema?.schema,
            // tables: editorSchema?.tables,
          }),
        ]}
      />
      <div className="sticky bottom-10 float-right mx-5">
        <Button
          size={"default"}
          disabled={isPending || query.trimEnd() === "" || !hasConnection}
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 "
          onClick={() => {
            console.log(query);
            executeQuery();
          }}
        >
          <p className="text-white">Run Query</p>
        </Button>
      </div>
    </>
  );
};
