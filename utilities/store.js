import { create } from 'zustand'

const useStore = create((set) => ({
  binName: 'loved',
  contacts: undefined,
  setBinName: (binName) => set({ binName: binName }),
  setContacts: (contacts) => set({ contacts: contacts }),
}))

export default useStore;