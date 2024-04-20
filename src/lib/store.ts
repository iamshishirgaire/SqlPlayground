import { create } from "zustand";
import { persist } from "zustand/middleware";

export type QueryState = {
  query: string[];
  setQuery: (query: string, queryIndex: number) => void;
};

export const useQueryStore = create<QueryState>()(
  persist(
    (set) => ({
      query: [],
      setQuery: (query: string, queryIndex) => {
        set((state) => {
          state.query[queryIndex] = query;
          return { query: state.query };
        });
      },
    }),
    {
      name: "query-storage",
    },
  ),
);

export type ResultState = {
  rows: any[];
  rowCount: number;
  columns: string[];
  startTime: number;
  setResult: (result: ResultState) => void;
};

export const useResultStore = create<ResultState>()(
  persist(
    (set) => ({
      rows: [],
      rowCount: 0,
      columns: [],
      startTime: 0,
      setResult: (result: ResultState) => {
        set(result);
      },
    }),
    {
      name: "result-storage",
    },
  ),
);
export type ResultModeState = {
  mode: "JSON" | "TABLE";
  setMode: (mode: "JSON" | "TABLE") => void;
};

export const useResultModeStore = create<ResultModeState>()(
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

export type ConnectionState = {
  connectionUrl: string;
  hasConnection: boolean;
  setConnectionUrl: (connectionUrl: string) => void;
  setHasConnection: (hasConnection: boolean) => void;
};

export const useConnectionStore = create<ConnectionState>()(
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

export type ChatState = {
  showChat: boolean;
  setShowChat: (showChat: boolean) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  showChat: false,
  setShowChat: (showChat: boolean) => {
    set({ showChat });
  },
}));

export type EditorSchemaState = {
  schema: any;
  tables: { label: any }[];
  setSchema: (newSchema: any) => void;
  setTables: (newTables: { label: any }[]) => void;
};

export const useEditorSchemaStore = create<EditorSchemaState>((set) => ({
  schema: {},
  tables: [],
  setSchema: (newSchema: any) => set({ schema: newSchema }),
  setTables: (newTables: { label: any }[]) => set({ tables: newTables }),
}));

export type TabsState = {
  activeTabIndex: number;
  setActiveTab: (activeTab: number) => void;
  tabs: { id: number; name: string; isActive: boolean }[];
  setTab: (newTab: { name: string; isActive: boolean }) => void;
  delTab: (id: number) => void;
};

export const useTabsStore = create<TabsState>()(
  persist(
    (set) => ({
      tabs: [],
      activeTabIndex: 0,
      setActiveTab: (activeTabId: number) => {
        set((state) => {
          state.activeTabIndex = activeTabId;
          state.tabs.forEach((tab) => (tab.isActive = tab.id === activeTabId));
          return { tabs: state.tabs };
        });
      },
      setTab: (tab: { name: string; isActive: boolean }) => {
        set((state) => {
          const newTab = { id: state.tabs.length + 1, ...tab };
          state.tabs.forEach((tab) => (tab.isActive = false));
          state.activeTabIndex = newTab.id;
          return { tabs: [...state.tabs, newTab] };
        });
      },
      delTab: (id: number) => {
        set((state) => {
          if (state.tabs.length === 1) {
            state.activeTabIndex = -1;
            return { tabs: [] };
          }
          state.activeTabIndex = state.tabs[state.tabs.length - 1].id;
          const filteredTabs = state.tabs.filter((tab) => tab.id !== id);
          const lastTab = filteredTabs[filteredTabs.length - 1];
          state.setActiveTab(lastTab.id);
          return { tabs: filteredTabs };
        });
      },
    }),
    {
      name: "tabs-storage",
    },
  ),
);
