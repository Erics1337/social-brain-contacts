import React, { useState, useMemo } from 'react'
import { FlatList, SafeAreaView, Text, View } from 'react-native'
import Contact from './Contact'
import useStore from '../../store'
import { LoadingIndicator } from '../LoadingIndicator'
import { SearchBar } from '@rneui/themed'

interface SearchBoxProps {
	onChange: (text: string) => void
}

const SearchBox: React.FC<SearchBoxProps> = ({ onChange }) => {
	const [localSearch, setLocalSearch] = useState('')

	const updateSearch = (search: string) => {
		setLocalSearch(search)
		onChange(search) // Notify parent component of change
	}

	return (
		<SearchBar
			placeholder='Search Contacts'
			placeholderTextColor='#68c7ac'
			onChangeText={updateSearch}
			value={localSearch}
			inputStyle={{ color: '#68c7ac' }}
			containerStyle={{
				backgroundColor: 'white',
				borderBottomColor: 'transparent',
				borderTopColor: 'transparent',
			}}
			inputContainerStyle={{ backgroundColor: '#f8f8f8' }}
			searchIcon={{ color: '#68c7ac' }}
			clearIcon={{ color: '#68c7ac' }}
		/>
	)
}

interface ContactListProps {
	filterByBin?: boolean
	showUngrouped?: boolean
}

const ContactList: React.FC<ContactListProps> = ({
	filterByBin = false,
	showUngrouped = false,
}) => {
	const { contacts, binnedContacts } = useStore()
	const [searchTerm, setSearchTerm] = useState('')

	const sourceContacts = filterByBin ? binnedContacts : contacts

	const filteredContacts = useMemo(() => {
		if (!sourceContacts) return []

		const ungroupedContacts = showUngrouped
			? sourceContacts.filter((contact) => !contact.bin)
			: sourceContacts

		if (searchTerm === '') {
			return ungroupedContacts
		}

		const searchTerms = searchTerm
			.split(' ')
			.map((term) => term.toLowerCase())

		return ungroupedContacts.filter((contact) =>
			searchTerms.every((term) =>
				contact.name.toLowerCase().includes(term)
			)
		)
	}, [sourceContacts, searchTerm, showUngrouped])

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<SearchBox onChange={setSearchTerm} />
			{filteredContacts.length > 0 ? (
				<FlatList
					data={filteredContacts}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <Contact contact={item} />}
					showsVerticalScrollIndicator={true}
				/>
			) : (
				<View className='flex-1 justify-center bg-gray-100 py-5'>
					<Text className='text-center text-xl text-gray-500'>
						No Contacts in this group yet
					</Text>
				</View>
			)}
		</SafeAreaView>
	)
}

export default ContactList
