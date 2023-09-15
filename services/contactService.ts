import * as Contacts from 'expo-contacts'
import {
	collection,
	doc,
	getDocs,
	writeBatch,
	orderBy,
	query,
} from 'firebase/firestore'
import { db } from '../config/firebase'
import useStore from '../store'

export async function syncContacts(userId: string) {
	const { status } = await Contacts.requestPermissionsAsync()

	if (status === 'granted') {
		const { data } = await Contacts.getContactsAsync()

		const userContactsRef = collection(db, 'users', userId, 'contacts')
		console.log('Adding contacts to firestore')

		const batch = writeBatch(db)

		data.forEach((contact) => {
			const contactRef = doc(userContactsRef, contact.id)
			const sanitizedContact = {
				contactType: contact.contactType || 'defaultContactType',
				emails:
					contact.emails && contact.emails.length > 0
						? contact.emails
						: [],
				firstName: contact.firstName || '',
				imageAvailable: contact.imageAvailable || false,
				lastName: contact.lastName || '',
				name: contact.name || 'Unknown Name',
				phoneNumbers:
					contact.phoneNumbers && contact.phoneNumbers.length > 0
						? contact.phoneNumbers
						: [],
			}

			batch.set(contactRef, sanitizedContact, { merge: true })
		})

		try {
			await batch.commit()
			console.log('All contacts updated in firebase successfully')
		} catch (err) {
			console.log('error syncing contacts to firebase', err)
		}

		try {
			const q = query(userContactsRef, orderBy('name'))
			const snapshot = await getDocs(q)

			const firebaseContacts = snapshot.docs.map((doc) => {
				const data = doc.data()
				return {
					id: doc.id,
					binName: data.bin,
					contactType: data.contactType,
					emails:
						data.emails && data.emails.length > 0
							? data.emails
							: [],
					firstName: data.firstName,
					imageAvailable: data.imageAvailable,
					lastName: data.lastName,
					name: data.name,
					phoneNumbers:
						data.phoneNumbers && data.phoneNumbers.length > 0
							? data.phoneNumbers
							: [],
				}
			})

			const deleteBatch = writeBatch(db)

			const phoneContactIds = data.map((c) => c.id)
			snapshot.docs.forEach((doc) => {
				if (!phoneContactIds.includes(doc.id)) {
					deleteBatch.delete(doc.ref)
				}
			})

			await deleteBatch.commit()

			const updatedSnapshot = await getDocs(userContactsRef)
			const updatedFirebaseContacts = updatedSnapshot.docs.map((doc) => {
				const data = doc.data()
				return {
					id: doc.id,
					binName: data.bin,
					contactType: data.contactType,
					emails:
						data.emails && data.emails.length > 0
							? data.emails
							: [],
					firstName: data.firstName,
					imageAvailable: data.imageAvailable,
					lastName: data.lastName,
					name: data.name,
					phoneNumbers:
						data.phoneNumbers && data.phoneNumbers.length > 0
							? data.phoneNumbers
							: [],
				}
			})

			useStore.getState().setContacts(updatedFirebaseContacts)
		} catch (error) {
			console.log('error getting contacts from firebase', error)
		}
	}
}
