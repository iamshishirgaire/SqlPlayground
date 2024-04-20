"use client";
import { connect } from "@/lib/connect";
import { useConnectionStore, useEditorSchemaStore } from "@/lib/store";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Functions } from "./functions";
import { Tables } from "./tables";
import { useEffect } from "react";
import { Loader } from "lucide-react";

export const Sidebar = () => {
  const [connectionString] = useConnectionStore((state) => [
    state.connectionUrl,
  ]);

  const schema = useEditorSchemaStore((state) => state.schema);
  const setSchema = useEditorSchemaStore((state) => state.setSchema);
  const hasConnection = useConnectionStore((state) => state.hasConnection);

  useEffect(() => {
    if (schema) {
      setSchema(schema);
    }
  }, [hasConnection]);
  const { data, isLoading } = useQuery({
    queryKey: ["schema"],
    queryFn: async () => {
      if (connectionString) {
        return await connect({
          connectionString: connectionString,
        });
      } else {
        toast.error("Please add a connection first.");
      }
    },
    enabled: hasConnection,
  });

  return (
    <div className="flex flex-1 flex-col space-y-2 overflow-y-auto border-r-2 border-border/25 pr-2 ">
      {hasConnection && isLoading ? (
        <div className="space-y-5">
          <div className="bg-element-active my-1.5 flex h-full w-full animate-pulse items-center justify-center rounded-md">
            <Loader className="size-4 text-gray-600"></Loader>
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
