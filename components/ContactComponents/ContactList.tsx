import React, { useEffect, useState, useMemo } from 'react'
import {
	FlatList,
	SafeAreaView,
	Text,
	TextInput,
	View,
	Button,
} from 'react-native'
import Contact from './Contact'
import useStore from '../../store'
import { LoadingIndicator } from '../LoadingIndicator'

interface SearchBoxProps {
	onChange: (text: string) => void
}

const SearchBox: React.FC<SearchBoxProps> = ({ onChange }) => (
	<TextInput
		className='h-10 border-b border-gray-400'
		onChangeText={onChange}
		placeholder='Search Contact'
	/>
)

const ContactList: React.FC = () => {
	const { binnedContacts, showSearchBox } = useStore()
	const [searchTerm, setSearchTerm] = useState('')

	const filteredContacts = useMemo(() => {
		if (!binnedContacts) return []

		return searchTerm === ''
			? binnedContacts
			: binnedContacts.filter((contact) =>
					contact.name.includes(searchTerm)
			  )
	}, [binnedContacts, searchTerm])

	if (!binnedContacts) {
		return <LoadingIndicator />
	}

	return (
		<SafeAreaView className='flex-1 bg-white'>
			{showSearchBox && <SearchBox onChange={setSearchTerm} />}
			{filteredContacts.length > 0 ? (
				<FlatList
					data={filteredContacts}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <Contact contact={item} />}
					showsVerticalScrollIndicator={true}
				/>
			) : (
				<View className='bg-gray-100 py-5 flex-1 justify-center'>
					<Text className='text-center text-xl'>
						No Contacts in this group yet
					</Text>
				</View>
			)}
		</SafeAreaView>
	)
}

export default ContactList
