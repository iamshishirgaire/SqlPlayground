"use client";
import { defaultKeymap } from "@codemirror/commands";
import { PostgreSQL, sql } from "@codemirror/lang-sql";
import { EditorView, keymap } from "@codemirror/view";
import CodeMirror from "@uiw/react-codemirror";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/lib/hooks/use-has-mounted";

import { theme } from "./theme";
import { useState } from "react";
import { Button } from "../ui/button";
import { PlayIcon } from "lucide-react";

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
        className="rounded-lg"
        height="93vh"
        theme={resolvedTheme === "dark" ? theme.dark : theme.light}
        value={query}
        basicSetup={{
          defaultKeymap: false,
        }}
        placeholder="Write your query here..."
        onChange={(value: string) => setQuery(value)}
        extensions={[
          EditorView.lineWrapping,
          keymap.of(defaultKeymap),
          sql({
            dialect: PostgreSQL,
            upperCaseKeywords: true,
            // schema: editorSchema?.schema,
            // tables: editorSchema?.tables,
          }),
        ]}
      />
      <div className="sticky bottom-10 mx-5 float-right">
        <Button onClick={() => {}}>
          <PlayIcon className="mr-1 h-4 w-4" />
        </Button>
      </div>
    </>
  );
};
