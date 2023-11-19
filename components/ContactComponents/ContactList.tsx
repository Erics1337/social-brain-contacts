import React, { useEffect, useMemo } from "react"
import {
	SafeAreaView,
	FlatList,
	View,
	Text,
	TouchableOpacity,
	KeyboardAvoidingView,
} from "react-native"
import { useNavigation } from "@react-navigation/native"
import useStore from "../../store"
import { LoadingIndicator } from "../LoadingIndicator"
import Contact from "./Contact"

interface ContactType {
	id: string
	firstName?: string
	lastName?: string
	bin?: string
}

interface ContactListProps {
	filterByBin?: boolean
	showUngrouped?: boolean
}

const ContactList: React.FC<ContactListProps> = ({
	copilot,
	filterByBin = false,
	showUngrouped = false,
}) => {
	const navigation = useNavigation()
	const { contacts, binnedContacts, loading, searchTerm } = useStore(
		(state) => ({
			contacts: state.contacts,
			binnedContacts: state.binnedContacts,
			loading: state.loading,
			searchTerm: state.searchTerm,
		})
	)

	const getContactDisplayName = (contact: ContactType) => {
		const parts = []
		if (contact.firstName && contact.firstName !== "undefined")
			parts.push(contact.firstName)
		if (contact.lastName && contact.lastName !== "undefined")
			parts.push(contact.lastName)
		return parts.length > 0 ? parts.join(" ") : null
	}

	const filteredContacts = useMemo(() => {
		let sourceContacts = filterByBin ? binnedContacts : contacts

		if (!sourceContacts) return []

		if (showUngrouped) {
			sourceContacts = sourceContacts.filter((contact) => !contact.bin)
		}

		sourceContacts = sourceContacts.filter(
			(contact) => getContactDisplayName(contact) !== null
		)

		if (!searchTerm || searchTerm === "") {
			return sourceContacts
		}

		const searchTerms = searchTerm.split(" ").map((term) => term.toLowerCase())

		return sourceContacts.filter((contact) => {
			const displayName = getContactDisplayName(contact)
			return (
				displayName &&
				searchTerms.every((term) => displayName.toLowerCase().includes(term))
			)
		})
	}, [contacts, binnedContacts, searchTerm, filterByBin, showUngrouped])

	const showLoadingIndicator = useMemo(() => {
		return loading || contacts === null
	}, [loading, contacts])

	return (
		<View {...copilot} className="flex-1 bg-white">
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
				<View className="flex-1 justify-center bg-gray-100 py-5">
					<Text className="text-center text-xl text-gray-500">
						No Contacts in this group yet.
					</Text>
					<TouchableOpacity onPress={() => navigation.navigate("Sort")}>
						<Text className="text-center text-primary underline text-xl my-4">
							Sort contacts into groups
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	)
}

export default ContactList
