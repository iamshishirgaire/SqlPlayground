"use client";
import { useResultModeStore, useResultStore } from "@/lib/store";
import ToggleButtonGroup from "./btngroup";
import { ResultTable } from "./result-table";
import { ResultJson } from "./result-json";

function Result() {
  const { rowCount, startTime } = useResultStore((state) => state);
  const mode = useResultModeStore((state) => state.mode);
  return (
    <div className="flex w-full flex-col">
      <div className="mr-5 flex items-center justify-end gap-2">
        <p className="text-sm text-green-500">
          {rowCount} rows in {new Date(startTime).getMilliseconds()}ms
        </p>
        <ToggleButtonGroup></ToggleButtonGroup>
      </div>
      <hr className="my-2" />
      {mode === "JSON" ? (
        <ResultJson></ResultJson>
      ) : (
        <ResultTable></ResultTable>
      )}
    </div>
  );
}

export default Result;
