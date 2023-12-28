import { create } from "zustand"
import { User } from "@firebase/auth"
import { OverloadedExpoContact } from "../types"
import { collection, doc, updateDoc } from "firebase/firestore"
import { db } from "../config/firebase"
import { Category } from "../utils"

type CategoryCounts = {
	[key in Category]: number
}

type State = {
	user: User | null
	binOption: string | null
	searchTerm: string | null
	contacts: OverloadedExpoContact[] | null
	binnedContacts: OverloadedExpoContact[] | null
	showSearchBox: boolean | null
	sidebarVisible: boolean | null
	showAccountDeleteModal: boolean | null
	categoryCounts: CategoryCounts
	groupLimits: CategoryCounts
	loading: boolean | null
	showIntroSlider: boolean | null
	toggleIntroSlider: () => void
	setUser: (user: User | null) => void
	setBin: (bin: string) => void
	setSearchTerm: (searchTerm: string) => void
	setContacts: (contacts: OverloadedExpoContact[]) => void
	setBinnedContacts: () => void
	updateContact: (contactId: string, bin: string) => void
	toggleShowSearchBox: () => void
	toggleSidebar: () => void
	toggleAccountDeleteModal: () => void
	initializeCategoryCounts: (initialCounts: CategoryCounts) => void
}

const useStore = create<State>((set) => ({
	loading: false,
	user: null,
	binOption: "Close Intimates",
	searchTerm: null,
	contacts: null,
	binnedContacts: null,
	sidebarVisible: false,
	showSearchBox: false,
	showAccountDeleteModal: false,
	showIntroSlider: false,
	groupLimits: {
		[Category.INTIMATE]: 5,
		[Category.BEST_FRIENDS]: 15,
		[Category.GOOD_FRIENDS]: 50,
		[Category.CASUAL_FRIENDS]: 150,
		[Category.ACQUAINTANCES]: 500,
		[Category.RECOGNIZABLE]: 1500,
	},
	categoryCounts: {
		[Category.INTIMATE]: 0,
		[Category.BEST_FRIENDS]: 0,
		[Category.GOOD_FRIENDS]: 0,
		[Category.CASUAL_FRIENDS]: 0,
		[Category.ACQUAINTANCES]: 0,
		[Category.RECOGNIZABLE]: 0,
	},
	toggleIntroSlider: (show?: boolean) => {
		set((state) => {
			console.log("Current showIntroSlider state:", state.showIntroSlider);
			return { showIntroSlider: !state.showIntroSlider };
		});
	},
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
		const sortedContacts = contacts.sort(sortContactsAlphabetically)
		set({ contacts: sortedContacts })
		set({ binnedContacts: sortedContacts })
	},
	setBinnedContacts: () => {
		console.log("setting filtered contacts to state")
		// Get the current bin from the Zustand store
		set({ binnedContacts: null })
		const { binOption, contacts } = useStore.getState()

		set({
			binnedContacts:
				contacts !== null
					? contacts.filter((contact) => contact.bin === binOption)
					: contacts,
		})
	},

	initializeCategoryCounts: (initialCounts: CategoryCounts) => {
		set({ categoryCounts: initialCounts })
	},
	toggleShowSearchBox: () =>
		set((state) => ({ showSearchBox: !state.showSearchBox })),
	toggleSidebar: () =>
		set((state) => ({ sidebarVisible: !state.sidebarVisible })),
	toggleAccountDeleteModal: () =>
		set((state) => ({
			showAccountDeleteModal: !state.showAccountDeleteModal,
		})),
	updateContact: (contactId, newBin) => {
		set((state) => {
			const updatedContacts = (state.contacts || []).map((contact) =>
				contact.id === contactId ? { ...contact, bin: newBin } : contact
			)
			const oldContact = (state.contacts || []).find(
				(contact) => contact.id === contactId
			)
			const oldBin = oldContact ? oldContact.bin : null
			// Initialize categoryCounts if it doesn't exist
			const updatedCategoryCounts: CategoryCounts = state.categoryCounts || {}
			// Decrement count for old bin if applicable
			if (oldBin) {
				updatedCategoryCounts[oldBin as Category] =
					(updatedCategoryCounts[oldBin as Category] || 1) - 1
			}
			// Increment count for new bin
			updatedCategoryCounts[newBin as Category] =
				(updatedCategoryCounts[newBin as Category] || 0) + 1
			return {
				contacts: updatedContacts,
				filteredContacts: null,
				categoryCounts: updatedCategoryCounts,
			}
		})
		// Re-filter the contacts
		useStore.getState().setBinnedContacts()
		// Update firebase
		updateContactInFirebase(contactId, newBin)
	},
}))

// Other Functions

const updateContactInFirebase = (contactId: string, bin: string) => {
	// Assuming you have a "contacts" collection in Firestore
	const userId = useStore.getState().user?.uid
	const userContactsRef = collection(db, "users", userId ?? "", "contacts")
	const contactRef = doc(userContactsRef, contactId)

	// Update the "bin" field of the contact document
	updateDoc(contactRef, { bin: bin })
		.then(() => {
			console.log("Contact updated in Firebase successfully.")
		})
		.catch((error) => {
			console.error("Error updating contact in Firebase:", error)
		})
}

const sortContactsAlphabetically = (
	a: OverloadedExpoContact,
	b: OverloadedExpoContact
) => {
	const nameA = `${a.firstName ?? ""} ${a.lastName ?? ""}`.trim().toLowerCase()
	const nameB = `${b.firstName ?? ""} ${b.lastName ?? ""}`.trim().toLowerCase()

	if (nameA < nameB) return -1
	if (nameA > nameB) return 1
	return 0
}

export default useStore
