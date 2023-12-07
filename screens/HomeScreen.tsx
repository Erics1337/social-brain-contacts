import React from "react"
import { View, Button, Text } from "react-native"

import ContactList from "../components/ContactComponents/ContactList"
import CategoryPicker from "../components/CategoryPicker"
import { SearchBox } from "../components/SearchBox"

const HomeScreen: React.FC = () => {
	return (
		<View className="flex-1">
			<CategoryPicker />
			<SearchBox />
			<ContactList filterByBin={true} />
		</View>
	)
}

export default HomeScreen
