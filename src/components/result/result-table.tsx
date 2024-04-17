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

export const ResultTable = () => {
  const { columns, rows, rowCount, startTime } = useResultStore(
    (state) => state,
  );

  return (
    <div className=" block h-[500px]  overflow-auto">
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
        {/* <TableBody className="top-[40px]">{JSON.stringify(rows)}</TableBody> */}
      </Table>
    </div>
  );
};