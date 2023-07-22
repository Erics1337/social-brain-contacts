import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
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
				ListEmptyComponent={() => (
					<View className='bg-gray-100 py-5'>
						<Text className='flex-1 m-auto text-xl '>
							No Contacts in this group yet
						</Text>
					</View>
				)}
			/>
		</SafeAreaView>
	)
}

export default ContactList
