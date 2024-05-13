import { useChatStore, useQueryStore, useTabsStore } from "@/lib/store";
import { PostgreSQL, sql } from "@codemirror/lang-sql";
import { EditorView } from "@codemirror/view";

import { githubDark, githubLight } from "@uiw/codemirror-theme-github";

import CodeMirror from "@uiw/react-codemirror";
import { useTheme } from "next-themes";
import useClipboard from "react-use-clipboard";
import { CopyButton } from "../copy-button";
import { Button } from "../ui/button";

export const Code = ({ response }: { response: string }) => {
  const { resolvedTheme } = useTheme();
  const { query, setQuery } = useQueryStore((state) => state);
  const activeTabIndex = useTabsStore((state) => state.activeTabIndex);
  const [isCopied, setCopied] = useClipboard(response, {
    successDuration: 1000,
  });

  const setShowChat = useChatStore((state) => state.setShowChat);

  return (
    <div className="mb-10 space-y-5">
      <CodeMirror
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
          highlightActiveLine: false,
        }}
        theme={resolvedTheme === "dark" ? githubDark : githubLight}
        extensions={[
          EditorView.lineWrapping,
          sql({
            dialect: PostgreSQL,
            upperCaseKeywords: true,
          }),
        ]}
        editable={false}
        className="prose-sm editor max-h-96 overflow-auto rounded-md border border-muted"
        value={response}
      />

      <div className="flex justify-end space-x-2">
        <CopyButton text={response} />
        <Button
          variant="outline"
          onClick={() => {
            setQuery(query + response, activeTabIndex);
            setShowChat(false);
          }}
        >
          Append result
        </Button>
        <Button
          onClick={() => {
            setQuery(response, activeTabIndex);
            setShowChat(false);
          }}
        >
          Replace code
        </Button>
      </div>
    </div>
  );
};
