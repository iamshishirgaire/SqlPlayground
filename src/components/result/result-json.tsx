"use client";
import { useResultStore } from "@/lib/store";
import { useTheme } from "next-themes";
import { lazy } from "react";
const LazyReactJson = lazy(() => import("react-json-view"));

export const ResultJson = ({
  height,
  width,
}: {
  height: number;
  width: number;
}) => {
  const rows = useResultStore((state) => state.rows);
  const theme = useTheme();

  return (
    <div
      style={{
        height: height,
        width: width,
      }}
      className="flex flex-1 flex-col space-y-2 overflow-y-auto border-r-2 border-border/25 pb-10 pr-2 "
    >
      {rows.length === 0 && (
        <div className="flex  items-center justify-center">
          <p className="text-gray-500">No Result</p>
        </div>
      )}
      <div className="rounded-lg bg-background p-4 ">
        <LazyReactJson
          style={{
            backgroundColor: "var(--bg-background)",
            fontFamily: "monospace",
          }}
          theme={
            theme.theme === "light" ? "summerfruit:inverted" : "summerfruit"
          }
          iconStyle="square"
          name={false}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          src={rows}
        ></LazyReactJson>
      </div>
    </div>
  );
};
