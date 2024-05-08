"use client";
import { connect } from "@/lib/connect";
import { useConnectionStore, useEditorSchemaStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Functions } from "./functions";
import { Tables } from "./tables";
import { Loader } from "lucide-react";
import { useEffect } from "react";

export const Sidebar = () => {
  const [connectionString] = useConnectionStore((state) => [
    state.connectionUrl,
  ]);

  const setSchema = useEditorSchemaStore((state) => state.setSchema);
  const setTables = useEditorSchemaStore((state) => state.setTables);
  const hasConnection = useConnectionStore((state) => state.hasConnection);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["schema"],
    queryFn: async () => {
      if (connectionString) {
        const data = await connect({
          connectionString: connectionString,
        });
        return data;
      } else {
        toast.error("Please add a connection first.");
      }
    },

    enabled: hasConnection,
  });
  useEffect(() => {
    if (isSuccess) {
      console.log(data?.editorSchema.schema);

      setSchema(data?.editorSchema.schema);
      setTables(data?.editorSchema.tables);
    }
  }, [isSuccess]);

  return (
    <div className="flex flex-1 flex-col space-y-2 overflow-y-auto border-r-2 border-border/25 pr-2 ">
      {hasConnection && isLoading ? (
        <div className="space-y-5">
          <div className="bg-element-active my-1.5 flex h-full w-full animate-pulse items-center justify-center rounded-md">
            <Loader className="size-4 animate-spin"></Loader>
          </div>
          <div className="bg-element-active w-fill my-1.5 h-4 max-w-28 animate-pulse rounded-md"></div>
        </div>
      ) : (
        <>
          {!data && (
            <div className="mt-10 text-center text-sm text-gray-400">
              No schema found.
            </div>
          )}
          {data && (
            <>
              <Tables name="tables" tables={data.tables as any} />
              <Tables name="views" tables={data.views as any} />
              <Functions data={data.functions} />
            </>
          )}
        </>
      )}
    </div>
  );
};
