import React from "react"
import { SearchBar } from "@rneui/themed"
import useStore from "../store"
import { SafeAreaView } from "react-native"

export const SearchBox: React.FC = ({ copilot }) => {
	const { searchTerm, setSearchTerm } = useStore((state) => ({
		searchTerm: state.searchTerm,
		setSearchTerm: state.setSearchTerm,
	}))

	const updateSearch = (search: string) => {
		setSearchTerm(search)
	}

	return (
		<SafeAreaView {...copilot}>
			<SearchBar
				placeholder="Search Contacts"
				placeholderTextColor="#68c7ac"
				onChangeText={updateSearch}
				value={searchTerm ?? ""}
				inputStyle={{ color: "#68c7ac" }}
				containerStyle={{
					backgroundColor: "white",
					borderBottomColor: "transparent",
					borderTopColor: "transparent",
				}}
				inputContainerStyle={{ backgroundColor: "#f8f8f8" }}
				searchIcon={{ color: "#68c7ac" }}
				clearIcon={{ color: "#68c7ac" }}
			/>
		</SafeAreaView>
	)
}
