"use client";
import { useResultStore } from "@/lib/store";
import { FixedSizeList } from "react-window";
export const ResultTable = ({
  height,
  width,
}: {
  height: number;
  width: number;
}) => {
  const { columns, rows } = useResultStore((state) => state);

  return (
    <div
      style={{
        height: height,
        width: width,
      }}
      className="flex  flex-col space-y-2 overflow-y-auto border-r-2 border-border/25 pb-10 pr-2"
    >
      {rows.length === 0 && (
        <div className="flex  items-center justify-center">
          <p className="text-gray-500">No Result</p>
        </div>
      )}

      <div
        className="bg-hoverColor/15"
        style={{
          display: "flex",

          flexDirection: "row",
          paddingRight: "20px",
          height: "60px",
          paddingLeft: "20px",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {columns.map((column, i) => (
          <div
            style={{
              width: `${width / columns.length}px`,
            }}
            key={i}
          >
            {column}
          </div>
        ))}
      </div>
      <FixedSizeList
        height={height}
        itemCount={rows.length}
        itemSize={50}
        width={width - 20}
      >
        {({ index, style }) => {
          const row = rows[index];
          return (
            <div
              className="hover:bg-hoverColor/15"
              style={{
                ...style,
                display: "flex",
                flexDirection: "row",
                paddingRight: "20px",
                paddingLeft: "20px",
                alignItems: "center",
                justifyContent: "space-between",
              }}
              key={index}
            >
              {columns.map((column, i) => (
                <div
                  style={{
                    width: `${width / columns.length}px`,
                  }}
                  key={i}
                >
                  {
                    //check if the row is an object and is date
                    typeof row[column] === "object" && row[column] !== null
                      ? row[column].toString()
                      : row[column]
                  }
                </div>
              ))}
            </div>
          );
        }}
      </FixedSizeList>
    </div>
  );
};
