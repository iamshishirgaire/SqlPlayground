"use client";
import { useResultStore } from "@/lib/store";
import ToggleButtonGroup from "./btngroup";
import { ResultTable } from "./result-table";

function Result() {
  const { rowCount, startTime } = useResultStore((state) => state);
  return (
    <div className="flex w-full flex-col">
      <div className="mr-5 flex items-center justify-end gap-2">
        <p className="text-sm text-green-500">
          {rowCount} rows in {new Date(startTime).getMilliseconds()}ms
        </p>
        <ToggleButtonGroup></ToggleButtonGroup>
      </div>
      <hr className="my-2" />
      <ResultTable></ResultTable>
    </div>
  );
}

export default Result;
