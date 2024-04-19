"use client";
import { useResultStore } from "@/lib/store";
import ReactJson from "react-json-view";

export const ResultJson = () => {
  const rows = useResultStore((state) => state.rows);

  return (
    <div className=" block h-[500px]  overflow-auto">
      {rows.length === 0 && (
        <div className="flex  items-center justify-center">
          <p className="text-gray-500">No Result</p>
        </div>
      )}
      <div className="rounded-lg bg-background p-4">
        <ReactJson
          style={{
            backgroundColor: "var(--bg-background)",
          }}
          theme={"threezerotwofour"}
          iconStyle="square"
          name={false}
          enableClipboard={false}
          displayDataTypes={false}
          displayObjectSize={false}
          src={rows}
        ></ReactJson>
      </div>
    </div>
  );
};
