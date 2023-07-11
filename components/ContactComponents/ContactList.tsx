import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import Contact from './Contact'
import useStore from '../../store'
import { LoadingIndicator } from '../LoadingIndicator'

const ContactList = () => {
	const contacts = useStore((state) => state.contacts)

	if (contacts === null) {
		return <LoadingIndicator />
	}
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

export default ContactList
