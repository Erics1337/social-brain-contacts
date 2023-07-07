import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import * as Contacts from 'expo-contacts'
import { Contact as ExpoContact } from 'expo-contacts'
import Contact from './Contact'

const ContactList = () => {
	const [contacts, setContacts] = useState<ExpoContact[]>([])

	useEffect(() => {
		;(async () => {
			const { status } = await Contacts.requestPermissionsAsync()
			if (status === 'granted') {
				const { data } = await Contacts.getContactsAsync()
				setContacts(data)
			}
		})()
	}, [])

	return (
		<SafeAreaView className='flex bg-white'>
			<FlatList
				data={contacts}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <Contact contact={item} />}
			/>
		</SafeAreaView>
	)
}

export default ContactList;