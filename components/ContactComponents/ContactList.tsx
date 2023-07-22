import React, { useEffect, useState } from 'react'
import { FlatList, SafeAreaView, Text, TextInput, View } from 'react-native'
import Contact from './Contact'
import useStore from '../../store'
import { LoadingIndicator } from '../LoadingIndicator'

interface SearchBoxProps {
	onChange: (text: string) => void
}

const SearchBox: React.FC<SearchBoxProps> = ({ onChange }) => (
	<TextInput
		style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
		onChangeText={onChange}
		placeholder='Search Contact'
	/>
)

const ContactList: React.FC = () => {
	const { binnedContacts, setBinnedContacts } = useStore()
	const [searchTerm, setSearchTerm] = useState('')
	const [filteredContacts, setFilteredContacts] = useState(binnedContacts)

	useEffect(() => {
		if (!binnedContacts) return

		setFilteredContacts(
			searchTerm === ''
				? binnedContacts
				: binnedContacts.filter((contact) =>
						contact.name.includes(searchTerm)
				  )
		)
	}, [binnedContacts, searchTerm])

	if (filteredContacts === null) {
		return <LoadingIndicator />
	}

	return (
		<SafeAreaView className='flex bg-white'>
			<SearchBox onChange={setSearchTerm} />
			{filteredContacts.length > 0 ? (
				<FlatList
					data={filteredContacts}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <Contact contact={item} />}
				/>
			) : (
				<View className='bg-gray-100 py-5'>
					<Text className='flex-1 m-auto text-xl'>
						No Contacts in this group yet
					</Text>
				</View>
			)}
		</SafeAreaView>
	)
}

export default ContactList
