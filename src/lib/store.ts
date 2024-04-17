import { create } from "zustand";

export type Query = {
  query: string;
};
export type QueryActions = {
  setQuery: (query: string) => void;
};
export const useQueryStore = create<Query & QueryActions>((set) => ({
  query: "SELECT * FROM person_table;",
  setQuery: (query: string) => {
    set({ query });
  },
}));

export type Result = {
  rows: any[];
  rowCount: number;
  columns: string[];
  startTime: number;
};
export type ResultActions = {
  setResult: (result: Result) => void;
};

export const useResultStore = create<Result & ResultActions>((set) => ({
  rows: [],
  rowCount: 0,
  columns: [],
  startTime: 0,
  setResult: (result) => {
    set(result);
  },
}));

export type Connection = {
  connectionUrl: string;
  hasConnection: boolean;
};
export type ConnectionActions = {
  setConnectionUrl: (connectionUrl: string) => void;
  setHasConnection: (hasConnection: boolean) => void;
};

export const useConnectionStore = create<Connection & ConnectionActions>(
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
