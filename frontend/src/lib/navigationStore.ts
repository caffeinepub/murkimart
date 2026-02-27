import { create } from 'zustand';

interface NavigationStore {
  navigateTo: ((page: string) => void) | null;
  setNavigateTo: (fn: (page: string) => void) => void;
}

export const useNavigationStore = create<NavigationStore>()((set) => ({
  navigateTo: null,
  setNavigateTo: (fn) => set({ navigateTo: fn }),
}));
