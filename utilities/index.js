import {
	getDoc,
	doc,
	onSnapshot,
	query,
	collection,
	where,
	limit,
} from '@firebase/firestore'

import { db, auth } from '../firebase'

import useStore from '../store'

// Need a function that checks if list size of contacts on phone is different from list size of contacts in database.
// If there are any more or less contacts on the phone, it will update the database accordingly
// Then load application state from database
const syncContacts = () => {
	console.log('syncing contacts...')

	const [user] = useStore((state) => [state.user])
	console.log('user object is loaded...', user)

	if (user != null) {
		db.listCollections()
			.then((collections) => {
				// Iterate over the collections
				collections.forEach((collection) => {
					console.log('Collection ID:', collection.id)
				})
			})
			.catch((error) => {
				console.error('Error getting collections:', error)
			})
	} else {
		console.log('user object is not loaded yet')
	}
}

export {syncContacts}