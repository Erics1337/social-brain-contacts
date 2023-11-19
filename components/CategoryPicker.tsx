// CategoryPicker.tsx
import React from "react"
import { Picker } from "@react-native-picker/picker"
import useStore from "../store"
import { Category as categories } from "../utils"

const CategoryPicker: React.FC<{}> = () => {
	const { binOption, setBin, setBinnedContacts, categoryCounts, groupLimits } =
		useStore()

	const handlePickerOptionChange = (option: string) => {
		setBin(option)
		setBinnedContacts()
	}

	return (
		<Picker
			selectedValue={binOption ?? undefined}
			onValueChange={handlePickerOptionChange}
		>
			{Object.entries(categories).map(([key, value]) => (
				<Picker.Item
					label={`${value} ${categoryCounts[value]}/${groupLimits[value]}`}
					value={value}
				/>
			))}
		</Picker>
	)
}

export default CategoryPicker
