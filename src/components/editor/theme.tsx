import { EditorView } from "@codemirror/view";
import { githubLight } from "@uiw/codemirror-theme-github";
import { tokyoNight } from "@uiw/codemirror-theme-tokyo-night";

export const theme = {
  light: githubLight,
  dark: tokyoNight,
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
    paddingTop: "1rem",
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
