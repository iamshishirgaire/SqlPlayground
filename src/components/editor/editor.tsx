"use client";
import { PostgreSQL, sql } from "@codemirror/lang-sql";
import { EditorView, keymap } from "@codemirror/view";
import CodeMirror, { basicSetup } from "@uiw/react-codemirror";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";

import { editorTheme, theme } from "./theme";
import { useState } from "react";
import { Button } from "../ui/button";
import { PlayIcon } from "lucide-react";
import { acceptCompletion } from "@codemirror/autocomplete";

export const Editor = () => {
  const [query, setQuery] = useState("");
  const { resolvedTheme } = useTheme();
  const hasMounted = useHasMounted();

  if (!hasMounted) {
    return <div className="bg-background  h-[93vh] relative" />;
  }

  return (
    <>
      <CodeMirror
        height="60vh"
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
              run: (e) => {
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
      <div className="sticky bottom-10 mx-5 float-right">
        <Button
          size={"default"}
          className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 "
          onClick={() => {}}
        >
          <PlayIcon className="mr-1 h-4 w-4 text-white" />
        </Button>
      </div>
    </>
  );
};
