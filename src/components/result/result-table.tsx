"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { useResultStore } from "@/lib/store";

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
      className="flex flex-col  space-y-2 overflow-y-auto border-r-2 border-border/25 pb-10 pr-2 "
    >
      {rows.length === 0 && (
        <div className="flex  items-center justify-center">
          <p className="text-gray-500">No Result</p>
        </div>
      )}
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column}>{column}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow key={index}>
              {Object.keys(row).map((key) => (
                <TableCell key={key}>{row[key].toString()}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
