import { create } from 'zustand'
import { OverloadedExpoContact } from '../types'


type State = {
	user: object | null
	binName: string | null
	contacts: OverloadedExpoContact[] | null
	filteredContacts: OverloadedExpoContact[] | null
	setUser: (user: object) => void
	setBinName: (binName: string) => void
	setContacts: (contacts: OverloadedExpoContact[]) => void
	setFilteredContacts: () => void
}

const useStore = create<State>((set) => ({
	user: null,
	binName: 'Everyone',
	contacts: null,
	filteredContacts: null,
	setUser: (user) => set({ user }),
	setBinName: (binName) => {
		set({ binName })
		useStore.getState().setFilteredContacts()
	},
	setContacts: (contacts) => {
		// Contacts should be sorted by name from the firebase query fired on Auth load by RootNavigator
		set({ contacts })
		set({ filteredContacts: contacts })
	},
	setFilteredContacts: () => {
		// Get the current binName from the Zustand store
		set({ filteredContacts: null })

		const { binName, contacts } = useStore.getState()

		set({
			filteredContacts:
				binName !== 'Everyone' && contacts !== null
					? contacts.filter((contact) => contact.binName === binName)
					: contacts,
		})
	},
}))

export default useStore
