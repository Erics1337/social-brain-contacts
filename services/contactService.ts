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

export async function syncContacts(userId: string) {
	const { status } = await requestPermissionsAsync()

	if (status === 'granted') {
		const { data } = await getContactsAsync() // Contacts from phone

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
				if (batchCount >= 500) {
					await batch.commit()
					batchCount = 0
				}
			}
		}

		try {
			if (batchCount > 0) {
				await batch.commit()
			}
			console.log('All contacts updated in firebase successfully')
		} catch (err) {
			console.log('error syncing contacts to firebase', err)
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

		try {
			await deleteBatch.commit()
		} catch (error) {
			console.log('error deleting contacts from firebase', error)
		}

		// Create enrichedContacts using a map for efficient lookups
		const enrichedContacts = data.map((phoneContact) => {
			const associatedBin = existingContacts.find(
				(fbContact) => fbContact.id === phoneContact.id
			)?.bin
			return {
				...phoneContact,
				bin: associatedBin || '',
			}
		})

		useStore.getState().setContacts(enrichedContacts)
		useStore.getState().setBinnedContacts()
	}
}
