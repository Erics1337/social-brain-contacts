import { create } from 'zustand'
import { User } from '@firebase/auth'
import { OverloadedExpoContact } from '../types'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

type State = {
	user: User | null
	binOption: string | null
	searchTerm: string | null
	contacts: OverloadedExpoContact[] | null
	binnedContacts: OverloadedExpoContact[] | null
	showSearchBox: boolean | null
	sidebarVisible: boolean | null
	showAccountDeleteModal: boolean | null
	setUser: (user: User | null) => void
	setBin: (bin: string) => void
	setSearchTerm: (searchTerm: string) => void
	setContacts: (contacts: OverloadedExpoContact[]) => void
	setBinnedContacts: () => void
	updateContact: (contactId: string, bin: string) => void
	toggleShowSearchBox: () => void
	toggleSidebar: () => void
	toggleAccountDeleteModal: () => void
}

const useStore = create<State>((set) => ({
	user: null,
	binOption: 'Everyone',
	searchTerm: null,
	contacts: null,
	binnedContacts: null,
	sidebarVisible: false,
	showSearchBox: false,
	showAccountDeleteModal: false,
	setUser: (user) => set({ user }),
	setBin: (binOption) => {
		set({ binOption })
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
		// Get the current bin from the Zustand store
		set({ binnedContacts: null })

		const { binOption, contacts, searchTerm } = useStore.getState()

		set({
			binnedContacts:
			binOption !== 'Everyone' && contacts !== null
					? contacts.filter((contact) => contact.bin === binOption)
					: contacts,
		})
	},
	updateContact: (contactId, bin) => {
		// Update bin field for the contact and reset contacts state
		set((state) => {
			const updatedContacts = (state.contacts || []).map((contact) =>
				contact.id === contactId ? { ...contact, bin } : contact
			)
			return { contacts: updatedContacts, filteredContacts: null }
		})
		// Re-filter the contacts
		useStore.getState().setBinnedContacts()
		// Update firebase
		updateContactInFirebase(contactId, bin)
	},
	toggleShowSearchBox: () => set(state => ({ showSearchBox: !state.showSearchBox })),
    toggleSidebar: () => set(state => ({ sidebarVisible: !state.sidebarVisible })),
    toggleAccountDeleteModal: () => set(state => ({ showAccountDeleteModal: !state.showAccountDeleteModal })),

}))

const updateContactInFirebase = (contactId: string, bin: string) => {
	console.log('contactId: ' + contactId)
	// Assuming you have a "contacts" collection in Firestore
	const userId = useStore.getState().user?.uid
	const userContactsRef = collection(db, 'users', userId ?? '', 'contacts')
	const contactRef = doc(userContactsRef, contactId)

	// Update the "bin" field of the contact document
	updateDoc(contactRef, { bin: bin })
		.then(() => {
			console.log('Contact updated in Firebase successfully.')
		})
		.catch((error) => {
			console.error('Error updating contact in Firebase:', error)
		})
}

export default useStore
