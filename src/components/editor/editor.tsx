"use client";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";
import { PostgreSQL, sql } from "@codemirror/lang-sql";
import { EditorView, keymap } from "@codemirror/view";
import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import { useTheme } from "next-themes";

import { acceptCompletion } from "@codemirror/autocomplete";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import TabsList from "./tabs";
import { editorTheme, theme } from "./theme";

export const Editor = () => {
  const [query, setQuery] = useState("");
  const { resolvedTheme } = useTheme();
  const hasMounted = useHasMounted();

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
              key: "Ctrl-Enter",
              run: () => {
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
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 "
          onClick={() => {
            console.log(query);
            toast.info(query);
          }}
        >
          <p className="text-white">Run Query</p>
        </Button>
      </div>
    </>
  );
};
