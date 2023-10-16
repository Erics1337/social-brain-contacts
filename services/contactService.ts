import {
	collection,
	doc,
	getDocs,
	writeBatch,
	orderBy,
	query,
	getDoc,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import useStore from '../store'
import { requestPermissionsAsync, getContactsAsync } from 'expo-contacts'
import { Category } from '../utils'


export async function syncContacts(userId: string) {
	const { status } = await requestPermissionsAsync()
	
	if (status === 'granted') {
		const { data } = await getContactsAsync() // Contacts from phone


		// Dynamic batch size strategy
		const maxBatchSize = 5000; // Adjust based on Firestore rate limits
		const numberOfContacts = data.length;
		const batchSize = Math.min(maxBatchSize, numberOfContacts);
		
		const userContactsRef = collection(db, 'users', userId, 'contacts')
		console.log('Syncing contacts to firestore')

		// Write batch to handle updates
		const batch = writeBatch(db)
		let batchCount = 0

		// Read all documents in a batch instead of one-by-one
		const snapshot = await getDocs(userContactsRef)
		const existingContacts = snapshot.docs.map((doc) => ({
			id: doc.id,
			bin: doc.data().bin,
		}))

		for (const contact of data) {
			// Find existing contact by id
			const existingContact = existingContacts.find(
				(c) => c.id === contact.id
			)

			// If 'bin' is not already present or is an empty string, set it to ''
			if (!existingContact || !existingContact.bin) {
				const contactRef = doc(userContactsRef, contact.id)
				batch.set(contactRef, { bin: '' }, { merge: true })
				batchCount++

				// Commit batch if it reaches the limit
				if (batchCount >= batchSize) {
					await batch.commit()
					batchCount = 0
				}
			}
		}

		try {
			if (batchCount > 0) {
				await batch.commit()
			}

			// Delete batch to handle deletions
			const deleteBatch = writeBatch(db)
			const phoneContactIds = data.map((c) => c.id)
			for (const existingContact of existingContacts) {
				if (!phoneContactIds.includes(existingContact.id)) {
					const contactRef = doc(userContactsRef, existingContact.id)
					deleteBatch.delete(contactRef)
				}
			}

			await deleteBatch.commit()

			console.log('All contacts updated in firebase successfully')
		} catch (err) {
			console.log('error syncing contacts to firebase', err)
		}

		// Initialize counts object
		const initialCounts: { [key: string]: number } = {
			[Category.EVERYONE]: 0,
			[Category.INTIMATE]: 0,
			[Category.BEST_FRIENDS]: 0,
			[Category.GOOD_FRIENDS]: 0,
			[Category.CASUAL_FRIENDS]: 0,
			[Category.ACQUAINTANCES]: 0,
			[Category.RECOGNIZABLE]: 0,
		}

		// Create enrichedContacts and initialize category counts simultaneously
		const enrichedContacts = data.map((phoneContact) => {
			const associatedBin =
				existingContacts.find(
					(fbContact) => fbContact.id === phoneContact.id
				)?.bin || ''

			// Update the initialCounts
			if (initialCounts[associatedBin] !== undefined) {
				initialCounts[associatedBin]++
			}

			return {
				...phoneContact,
				bin: associatedBin,
			}
		})

		const store = useStore.getState()
		store.setContacts(enrichedContacts)

		// Directly set categoryCounts based on the counts obtained while enriching contacts
		store.initializeCategoryCounts({
			Everyone: initialCounts[Category.EVERYONE],
			'Close Intimates': initialCounts[Category.INTIMATE],
			'Best Friends': initialCounts[Category.BEST_FRIENDS],
			'Good Friends': initialCounts[Category.GOOD_FRIENDS],
			'Casual Friends': initialCounts[Category.CASUAL_FRIENDS],
			Acquaintances: initialCounts[Category.ACQUAINTANCES],
			Recognizable: initialCounts[Category.RECOGNIZABLE],
		})

		useStore.getState().setContacts(enrichedContacts)
		useStore.getState().setBinnedContacts()
	}
}
