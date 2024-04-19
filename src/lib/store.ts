import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Query = {
  query: string;
};
export type QueryActions = {
  setQuery: (query: string) => void;
};
export const useQueryStore = create<Query & QueryActions>()(
  persist(
    (set) => ({
      query: "",
      setQuery: (query: string) => {
        set({ query });
      },
    }),
    {
      name: "query-storage",
    },
  ),
);

export type Result = {
  rows: any[];
  rowCount: number;
  columns: string[];
  startTime: number;
};
export type ResultActions = {
  setResult: (result: Result) => void;
};

export const useResultStore = create<Result & ResultActions>()(
  persist(
    (set) => ({
      rows: [],
      rowCount: 0,
      columns: [],
      startTime: 0,
      setResult: (result: Result) => {
        set(result);
      },
    }),
    {
      name: "result-storage",
    },
  ),
);
export type ResultMode = {
  mode: "JSON" | "TABLE";
};
export type ResultModeActions = {
  setMode: (mode: "JSON" | "TABLE") => void;
};
export const useResultModeStore = create<ResultMode & ResultModeActions>()(
  persist(
    (set) => ({
      mode: "TABLE",
      setMode: (mode: "JSON" | "TABLE") => {
        set({ mode });
      },
    }),
    {
      name: "result-mode-storage",
    },
  ),
);

export type Connection = {
  connectionUrl: string;
  hasConnection: boolean;
};
export type ConnectionActions = {
  setConnectionUrl: (connectionUrl: string) => void;
  setHasConnection: (hasConnection: boolean) => void;
};

export const useConnectionStore = create<Connection & ConnectionActions>()(
  persist(
    (set) => ({
      connectionUrl: "",
      hasConnection: false,
      setConnectionUrl: (connectionUrl: string) => {
        set({ connectionUrl });
      },
      setHasConnection: (hasConnection: boolean) => {
        set({ hasConnection });
      },
    }),
    {
      name: "connection-storage",
    },
  ),
);

export type Chat = {
  showChat: boolean;
};
export type ChatActions = {
  setShowChat: (showChat: boolean) => void;
};
export const useChatStore = create<Chat & ChatActions>((set) => ({
  showChat: false,
  setShowChat: (showChat: boolean) => {
    set({ showChat });
  },
}));

interface EditorSchemaState {
  schema: any;
  tables: { label: any }[];
  setSchema: (newSchema: any) => void;
  setTables: (newTables: { label: any }[]) => void;
}

export const useEditorSchemaStore = create<EditorSchemaState>((set) => ({
  schema: {},
  tables: [],
  setSchema: (newSchema: any) => set({ schema: newSchema }),
  setTables: (newTables: { label: any }[]) => set({ tables: newTables }),
}));
