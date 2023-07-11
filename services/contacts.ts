import * as Contacts from 'expo-contacts'
import { collection, doc, getDocs, setDoc, deleteDoc } from 'firebase/firestore'
import { db } from '../config/firebase'
import useStore from '../store'

export async function syncContacts(userId: any) {
	const { status } = await Contacts.requestPermissionsAsync()

	if (status === 'granted') {
		const { data } = await Contacts.getContactsAsync()

		// Assuming each user has a unique ID
		const userContactsRef = collection(db, 'users', userId, 'contacts')

		try {
			// Loop through each contact and add/update it in Firestore
			for (let contact of data) {
				// To simplify, we're using the contact's ID as the Firestore document ID
				const contactRef = doc(userContactsRef, contact.id)
				// These are fields that are available on ios
				// We check if the array is undefined and has at least one element
				await setDoc(
					contactRef,
					{
						contactType: contact.contactType,
						emails:
							contact.emails && contact.emails.length > 0
								? contact.emails
								: [],
						firstName: contact.firstName,
						imageAvailable: contact.imageAvailable,
						lastName: contact.lastName,
						name: contact.name,
						phoneNumbers:
							contact.phoneNumbers &&
							contact.phoneNumbers.length > 0
								? contact.phoneNumbers
								: [],
					},
					{ merge: true }
				).then(() => {
					console.log('contact updated successfully')
				})
			}
		} catch (err) {
			console.log('error syncing contacts to firebase')
		} finally {
			// Set contacts to state
			useStore.getState().setContacts(data)
		}

		// Deleting contacts that are not on the phone
		const phoneContactIds = data.map((c) => c.id)
		const snapshot = await getDocs(userContactsRef)
		snapshot.forEach((doc) => {
			if (!phoneContactIds.includes(doc.id)) {
				deleteDoc(doc.ref)
			}
		})
	}
}
