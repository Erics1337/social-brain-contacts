import { create } from 'zustand'
import { User } from '@firebase/auth'
import { OverloadedExpoContact } from '../types'
import { collection, doc, updateDoc } from 'firebase/firestore'
import { db } from '../config/firebase'

type State = {
	user: User | null
	binName: string | null
	contacts: OverloadedExpoContact[] | null
	filteredContacts: OverloadedExpoContact[] | null
	setUser: (user: User | null) => void
	setBinName: (binName: string) => void
	setContacts: (contacts: OverloadedExpoContact[]) => void
	setFilteredContacts: () => void
	updateContact: (contactId: string, binName: string) => void
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
		console.log('Setting contacts to state')
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
	updateContact: (contactId, binName) => {
		// Update binName field for the contact and reset contacts state
		set((state) => {
			const updatedContacts = (state.contacts || []).map((contact) =>
				contact.id === contactId ? { ...contact, binName } : contact
			)
			return { contacts: updatedContacts, filteredContacts: null }
		})
		// Re-filter the contacts
		useStore.getState().setFilteredContacts()
		// Update firebase
		updateContactInFirebase(contactId, binName)
	},
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
