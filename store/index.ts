import { create } from 'zustand'

// import { syncContacts } from '../utilities'

type State = {
	user: object | null
	binName: string | null
	contacts: object | null
	setUser: (user: object) => void
	setBinName: (binName: string) => void
	setContacts: (contacts: object) => void
}

const useStore = create<State>((set) => ({
	user: null,
	binName: null,
	contacts: null,
	setUser: (user) => set({ user }),
	setBinName: (binName: string) => set(() => ({ binName})),
	setContacts: (contacts: object) => {
		set({ contacts })
		// syncContacts()
	},
}))

export default useStore