import { create } from 'zustand'
import { Contact as ExpoContact } from 'expo-contacts'


type State = {
	user: object | null
	binName: string | null
	contacts: ExpoContact[] | null
	setUser: (user: object) => void
	setBinName: (binName: string) => void
	setContacts: (contacts: ExpoContact[]) => void
}

const useStore = create<State>((set) => ({
	user: null,
	binName: null,
	contacts: null,
	setUser: (user) => set({ user }),
	setBinName: (binName: string) => set(() => ({ binName})),
	setContacts: (contacts: ExpoContact[]) => {
		set({ contacts })
	},
}))

export default useStore