import { tags as t } from "@lezer/highlight";
import { githubLight } from "@uiw/codemirror-theme-github";
import createTheme from "@uiw/codemirror-themes";

export const darkTheme = createTheme({
  theme: "dark",
  settings: {
    background: "#151718",
    foreground: "#c9d1d9",
    caret: "#c9d1d9",
    selection: "#003d73",
    selectionMatch: "#003d73",
    lineHighlight: "#36334280",

    gutterBackground: "transparent",
    gutterForeground: "rgb(155, 161, 166,0.6)",
  },
  styles: [
    { tag: [t.standard(t.tagName), t.tagName], color: "#7ee787" },
    { tag: [t.comment, t.bracket], color: "#8b949e" },
    { tag: [t.className, t.propertyName], color: "#d2a8ff" },
    {
      tag: [t.variableName, t.attributeName, t.number, t.operator],
      color: "#79c0ff",
    },
    {
      tag: [t.keyword, t.typeName, t.typeOperator, t.typeName],
      color: "#ff7b72",
    },
    { tag: [t.string, t.meta, t.regexp], color: "#a5d6ff" },
    { tag: [t.name, t.quote], color: "#7ee787" },
    { tag: [t.heading], color: "#d2a8ff", fontWeight: "bold" },
    { tag: [t.emphasis], color: "#d2a8ff", fontStyle: "italic" },
    { tag: [t.deleted], color: "#ffdcd7", backgroundColor: "ffeef0" },
    { tag: [t.atom, t.bool, t.special(t.variableName)], color: "#ffab70" },
    { tag: t.link, textDecoration: "underline" },
    { tag: t.strikethrough, textDecoration: "line-through" },
    { tag: t.invalid, color: "#f97583" },
  ],
});

export const theme = {
  light: githubLight,
  dark: darkTheme,
};
