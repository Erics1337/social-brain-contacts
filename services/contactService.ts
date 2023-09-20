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

		const batch = writeBatch(db)

		for (const contact of data) {
			const contactRef = doc(userContactsRef, contact.id)
			const currentDoc = await getDoc(contactRef)

			// If 'bin' is not already present or is an empty string, set it to ''
			if (!currentDoc.exists() || !currentDoc.data().bin) {
				batch.set(contactRef, { bin: '' }, { merge: true })
			}
		}

		try {
			await batch.commit()
			console.log('All contacts updated in firebase successfully')
		} catch (err) {
			console.log('error syncing contacts to firebase', err)
		}

		try {
			const snapshot = await getDocs(userContactsRef)

			const firebaseIdsWithBins = snapshot.docs.map((doc) => ({
				id: doc.id,
				bin: doc.data().bin,
			}))

			const deleteBatch = writeBatch(db)

			const phoneContactIds = data.map((c) => c.id)
			snapshot.docs.forEach((doc) => {
				if (!phoneContactIds.includes(doc.id)) {
					deleteBatch.delete(doc.ref)
				}
			})

			await deleteBatch.commit()

			const enrichedContacts = data.map((phoneContact) => {
				const associatedBin = firebaseIdsWithBins.find(
					(fbContact) => fbContact.id === phoneContact.id
				)?.bin
				return {
					...phoneContact,
					bin: associatedBin || '',
				}
			})

			useStore.getState().setContacts(enrichedContacts)
			useStore.getState().setBinnedContacts()
		} catch (error) {
			console.log('error getting contacts from firebase', error)
		}
	}
}
