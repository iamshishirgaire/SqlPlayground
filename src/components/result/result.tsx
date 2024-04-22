"use client";
import { useResultModeStore, useResultStore } from "@/lib/store";
import ToggleButtonGroup from "./btngroup";
import { ResultTable } from "./result-table";
import { ResultJson } from "./result-json";
import AutoSizer from "react-virtualized-auto-sizer";

function Result() {
  const { rowCount, startTime } = useResultStore((state) => state);
  const mode = useResultModeStore((state) => state.mode);
  return (
    <div className="mb-10 flex h-full w-full flex-col">
      <div className="mr-5 flex items-center justify-end gap-2">
        <p className="text-sm text-green-500">
          {rowCount} rows in {new Date(startTime).getMilliseconds()}ms
        </p>
        <ToggleButtonGroup></ToggleButtonGroup>
      </div>
      <hr className="my-2" />

      <AutoSizer>
        {({ height, width }) => {
          return mode === "TABLE" ? (
            <ResultTable height={height} width={width} />
          ) : (
            <ResultJson height={height} width={width} />
          );
        }}
      </AutoSizer>
    </div>
  );
}

export default Result;
