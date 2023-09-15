import { create } from 'zustand'
import { User } from '@firebase/auth'
import { OverloadedExpoContact } from '../types'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

type State = {
	user: User | null
	binName: string | null
	searchTerm: string | null
	contacts: OverloadedExpoContact[] | null
	binnedContacts: OverloadedExpoContact[] | null
	showSearchBox: boolean | null
	setUser: (user: User | null) => void
	setBinName: (binName: string) => void
	setSearchTerm: (searchTerm: string) => void
	setContacts: (contacts: OverloadedExpoContact[]) => void
	setBinnedContacts: () => void
	updateContact: (contactId: string, binName: string) => void
	setShowSearchBox: (showSearchBox: boolean) => void
}

const useStore = create<State>((set) => ({
	user: null,
	binName: 'Everyone',
	searchTerm: null,
	contacts: null,
	binnedContacts: null,
	showSearchBox: false,
	setUser: (user) => set({ user }),
	setBinName: (binName) => {
		set({ binName })
		useStore.getState().setBinnedContacts()
	},
	setSearchTerm: (searchTerm) => {
		set({ searchTerm })
	},
	setContacts: (contacts) => {
		// Contacts should be sorted by name from the firebase query fired on Auth load by RootNavigator
		console.log('Setting contacts to state')
		set({ contacts })
		set({ binnedContacts: contacts })
	},
	setBinnedContacts: () => {
		console.log('setting filtered contacts to state')
		// Get the current binName from the Zustand store
		set({ binnedContacts: null })

		const { binName, contacts, searchTerm } = useStore.getState()

		set({
			binnedContacts:
				binName !== 'Everyone' && contacts !== null
					? contacts.filter((contact) => contact.binName === binName)
					: contacts,
		})
	},
	updateContact: (contactId, binName) => {
		// Update binName field for the contact and reset contacts state
		set((state) => {
			const updatedContacts = (state.contacts || []).map((contact) =>
				contact.id === contactId ? { ...contact, binName } : contact
			)
			return { contacts: updatedContacts, filteredContacts: null }
		})
		// Re-filter the contacts
		useStore.getState().setBinnedContacts()
		// Update firebase
		updateContactInFirebase(contactId, binName)
	},
	setShowSearchBox: (showSearchBox) => set({ showSearchBox }),

}))

const updateContactInFirebase = (contactId: string, binName: string) => {
	console.log('contactId: ' + contactId)
	// Assuming you have a "contacts" collection in Firestore
	const userId = useStore.getState().user?.uid
	const userContactsRef = collection(db, 'users', userId ?? '', 'contacts')
	const contactRef = doc(userContactsRef, contactId)

	// Update the "binName" field of the contact document
	updateDoc(contactRef, { bin: binName })
		.then(() => {
			console.log('Contact updated in Firebase successfully.')
		})
		.catch((error) => {
			console.error('Error updating contact in Firebase:', error)
		})
}

export default useStore
