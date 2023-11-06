import React, { useState, useMemo } from 'react'
import {
	FlatList,
	SafeAreaView,
	Text,
	TouchableOpacity,
	View,
} from 'react-native'
import Contact from './Contact'
import useStore from '../../store'
import { LoadingIndicator } from '../LoadingIndicator'
import { SearchBar } from '@rneui/themed'
import { useNavigation } from '@react-navigation/native'

interface SearchBoxProps {
	onChange: (text: string) => void
}

interface ContactType {
	id: string
	firstName?: string // Optional because it could be undefined
	lastName?: string // Optional because it could be undefined
	bin?: string
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
	const navigation = useNavigation()

	const getContactDisplayName = (contact: ContactType) => {
		const parts = []
		if (contact.firstName && contact.firstName !== 'undefined')
			parts.push(contact.firstName)
		if (contact.lastName && contact.lastName !== 'undefined')
			parts.push(contact.lastName)
		return parts.length > 0 ? parts.join(' ') : null
	}

	const { contacts, binnedContacts, loading } = useStore((state) => ({
		contacts: state.contacts,
		binnedContacts: state.binnedContacts,
		loading: state.loading, // Assuming you have a 'loading' boolean in your store
	}))

	const [searchTerm, setSearchTerm] = useState('')

	const filteredContacts = useMemo(() => {
		let sourceContacts = filterByBin ? binnedContacts : contacts

		if (!sourceContacts) return []

		if (showUngrouped) {
			sourceContacts = sourceContacts.filter((contact) => !contact.bin)
		}

		// Filter out contacts with no name defined at all
		sourceContacts = sourceContacts.filter(
			(contact) => getContactDisplayName(contact) !== null
		)

		if (searchTerm === '') {
			return sourceContacts
		}

		const searchTerms = searchTerm
			.split(' ')
			.map((term) => term.toLowerCase())

		// Finally, filter by search term
		return sourceContacts.filter((contact) => {
			const displayName = getContactDisplayName(contact)
			return (
				displayName &&
				searchTerms.every((term) =>
					displayName.toLowerCase().includes(term)
				)
			)
		})
	}, [contacts, binnedContacts, searchTerm, filterByBin, showUngrouped])

	// Determine if the loading indicator should be shown
	const showLoadingIndicator = useMemo(() => {
		return loading || contacts === null
	}, [loading, contacts])

	return (
		<SafeAreaView className='flex-1 bg-white'>
			<SearchBox onChange={setSearchTerm} />
			{showLoadingIndicator ? (
				<LoadingIndicator />
			) : filteredContacts.length > 0 ? (
				<FlatList
					data={filteredContacts}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => <Contact contact={item} />}
					showsVerticalScrollIndicator={true}
				/>
			) : (
				<View className='flex-1 justify-center bg-gray-100 py-5'>
					<Text className='text-center text-xl text-gray-500'>
						No Contacts in this group yet.
					</Text>
					<TouchableOpacity
						onPress={() => navigation.navigate('Sort')}>
						<Text className='text-center text-primary underline text-xl my-4'>
							Sort contacts into groups
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</SafeAreaView>
	)
}

export default ContactList
