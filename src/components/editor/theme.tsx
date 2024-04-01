import { oneDark } from "@codemirror/theme-one-dark";
import { EditorView } from "@codemirror/view";
import { githubLight } from "@uiw/codemirror-theme-github";

export const theme = {
  light: githubLight,
  dark: oneDark,
};

export const editorTheme = EditorView.theme({
  "&.cm-focused": {
    outline: "none",
  },
  "&": {
    fontSize: "11pt",
  },
  ".cm-content": {
    fontFamily: "Menlo, Monaco, Lucida Console, monospace",
    minHeight: "200px",
  },
  ".cm-tooltip": {
    borderRadius: "0.25rem",
    padding: "0.5rem",
    margin: "0.5rem",
    border: "1px solid var(--border)",
  },

  ".cm-tooltip .cm-tooltip-autocomplete": {
    backgroundColor: "var(--bg-primary)",
    color: "var(--text-primary)",
  },
});
