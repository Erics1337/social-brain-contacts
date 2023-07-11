import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView } from 'react-native'
import Contact from './Contact'
import useStore from '../../store'
import { LoadingIndicator } from '../LoadingIndicator'

const ContactList = () => {
	const { binName, setBinName, filteredContacts, contacts } = useStore()

	if (filteredContacts === null) {
		return <LoadingIndicator />
	}
	return (
		<SafeAreaView className='flex bg-white'>
			<FlatList
				data={filteredContacts}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <Contact contact={item} />}
			/>
		</SafeAreaView>
	)
}

export default ContactList
