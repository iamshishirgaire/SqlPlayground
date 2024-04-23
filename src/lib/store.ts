import { create } from "zustand";
import { persist } from "zustand/middleware";

export type QueryState = {
  query: {
    queryString: string;
    queryIndex: number;
  }[];
  setQuery: (query: string, queryIndex: number) => void;
};

export const useQueryStore = create<QueryState>()(
  persist(
    (set) => ({
      query: [],
      setQuery: (query: string, queryIndex) => {
        set((state) => {
          state.query[queryIndex].queryString = query;
          return { query: state.query };
        });
      },
      delQuery: (queryIndex: number) => {
        set((state) => {
          state.query.splice(queryIndex, 1);
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
  setName: (name: string, id: number) => void;
  delTab: (id: number) => void;
};

export const useTabsStore = create<TabsState>()(
  persist(
    (set) => ({
      tabs: [],
      activeTabIndex: 0,
      setName: (name: string, id: number) => {
        set((state) => {
          state.tabs.forEach((tab) => {
            if (tab.id === id) {
              tab.name = name;
            }
          });
          return { tabs: state.tabs };
        });
      },
      setActiveTab: (activeTabId: number) => {
        set((state) => {
          state.activeTabIndex = activeTabId;
          state.tabs.forEach((tab) => (tab.isActive = tab.id === activeTabId));
          return { tabs: state.tabs };
        });
      },
      setTab: (tab: { name: string; isActive: boolean }) => {
        set((state) => {
          const newTab = { id: state.tabs.length, ...tab };
          state.tabs.forEach((tab) => (tab.isActive = false));
          state.activeTabIndex = newTab.id;
          //also add the query of that id
          useQueryStore.setState((state) => {
            state.query.push({ queryString: "", queryIndex: newTab.id });
            return { query: state.query };
          });
          return { tabs: [...state.tabs, newTab] };
        });
      },
      delTab: (id: number) => {
        //also delete the query of that id

        useQueryStore.setState((state) => {
          let newQueries = state.query.filter((_, index) => index !== id);
          return { query: newQueries };
        });
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
