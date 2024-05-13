"use client";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";
import { PostgreSQL, sql } from "@codemirror/lang-sql";
import { EditorView, keymap } from "@codemirror/view";
import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import { useTheme } from "next-themes";

import { runQuery } from "@/lib/query";
import {
  useChatStore,
  useConnectionStore,
  useEditorSchemaStore,
  useQueryStore,
  useResultStore,
  useTabsStore,
} from "@/lib/store";
import { acceptCompletion } from "@codemirror/autocomplete";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Button } from "../ui/button";
import TabsList from "./tabs";
import { editorTheme, theme } from "./theme";
import { Loader, PlayIcon } from "lucide-react";
import { useEffect } from "react";

export const Editor = () => {
  const { schema, tables } = useEditorSchemaStore((state) => state);
  const queryClient = useQueryClient();
  const { query, setQuery } = useQueryStore((state) => state);
  const { activeTabIndex } = useTabsStore((state) => state);
  const { setTab } = useTabsStore((state) => state);
  const { setResult } = useResultStore((state) => state);
  const { connectionUrl, hasConnection } = useConnectionStore((state) => state);
  const { setShowChat } = useChatStore((state) => state);
  const { resolvedTheme } = useTheme();
  const hasMounted = useHasMounted();
  const { mutate, isPending } = useMutation({
    mutationFn: runQuery,
    onSuccess: (data: any) => {
      setResult(data);
      queryClient.invalidateQueries({ queryKey: ["schema"] });
    },
    onError: (error: any) => {
      toast.error(`Error: ${error.message}`);
    },
  });
  const executeQuery = () => {
    if (query[activeTabIndex]?.queryString?.trimEnd() === "" || !connectionUrl)
      return;
    mutate({
      query: query[activeTabIndex]?.queryString,
      connectionString: connectionUrl,
    });
  };

  if (!hasMounted) {
    return <div className="relative h-[93vh] bg-background" />;
  }

  return (
    <>
      <TabsList></TabsList>
      <div>
        {activeTabIndex !== -1 && (
          <CodeMirror
            height="100vh"
            theme={resolvedTheme === "dark" ? theme.dark : theme.light}
            value={query[activeTabIndex]?.queryString}
            basicSetup={{
              defaultKeymap: false,
            }}
            placeholder="Write a SQL query..."
            onChange={(value: string) => setQuery(value, activeTabIndex)}
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
                    if (
                      hasConnection &&
                      query[activeTabIndex]?.queryString?.trimEnd() !== ""
                    ) {
                      executeQuery();
                    }
                    return true;
                  },
                },
                {
                  key: "Mod-m",
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
                schema: schema,
                tables: tables,
              }),
            ]}
          />
        )}
        {activeTabIndex === -1 && (
          <div className="h-[93vh] bg-background">
            <div className="flex h-min  pt-20">
              <div className="flex w-full flex-col items-center justify-center gap-3">
                <p className="text-lg text-gray-400">
                  Create a new tab to start writing queries.
                </p>
                <Button
                  onClick={() => {
                    setTab({ name: `Untitled`, isActive: true });
                  }}
                  className=""
                  variant={"default"}
                >
                  Add Tab
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="sticky bottom-10 float-right mx-5">
        <Button
          size={"default"}
          disabled={
            isPending ||
            query[activeTabIndex]?.queryString?.trimEnd() === "" ||
            !hasConnection
          }
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 "
          onClick={() => {
            executeQuery();
          }}
        >
          <p className="text-white">
            {isPending ? (
              <Loader className="size-4 animate-spin"></Loader>
            ) : (
              <PlayIcon className="size-4"></PlayIcon>
            )}
          </p>
        </Button>
      </div>
    </>
  );
};
