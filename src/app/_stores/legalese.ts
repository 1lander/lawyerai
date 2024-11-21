import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useLegaleseStore = create(
  persist<{
    legalese: Array<{text: string, timestamp: string}>;
    add: (text: string) => void;
    remove: (index: number) => void;
    get: () => Array<string>;
  }>(
    (set, get) => ({
      legalese: [],
      add: (text: string) => set((state) => ({ 
        legalese: [...state.legalese, {text, timestamp: new Date().toISOString()}] 
      })),
      remove: (index: number) => set((state) => ({ 
        legalese: state.legalese.filter((_, i) => i !== index) 
      })),
      get: () => get().legalese.map(item => item.text),
    }),
    {
      name: 'legalese-storage',
    }
  )
)