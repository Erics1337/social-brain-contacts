import React from "react"
import { View, Button, Text } from "react-native"
import ContactList from "../components/ContactComponents/ContactList"
import CategoryPicker from "../components/CategoryPicker"
import { CopilotStep } from "react-native-copilot"
import { SearchBox } from "../components/SearchBox"

const HomeScreen: React.FC = () => {
	return (
		<View className="flex-1">
			<CopilotStep
				text="This is the category picker. You can select a category here."
				order={1}
				name="CategoryPicker"
			>
				<CategoryPicker />
			</CopilotStep>
			<CopilotStep
				text="This is the search box. Use it to search for contacts."
				order={3}
				name="SearchBox"
			>
				<SearchBox />
			</CopilotStep>
			<CopilotStep
				text="Your contacts show up here.  Go to the contact filtering screen and long press on a contact to move the contact to a group."
				order={2}
				name="ContactList"
			>
				<ContactList filterByBin={true} />
			</CopilotStep>
		</View>
	)
}

export default HomeScreen
