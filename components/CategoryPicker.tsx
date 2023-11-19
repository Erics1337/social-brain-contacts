import React from 'react'
import { Picker } from '@react-native-picker/picker'
import useStore from '../store'
import { Category as categories } from '../utils'
import { walkthroughable } from 'react-native-copilot'
import { View, SafeAreaView } from 'react-native'

const WalkthroughablePicker = walkthroughable(Picker) // Making Picker walkthroughable

const CategoryPicker: React.FC<{}> = ({ copilot }) => {
	const { binOption, setBin, setBinnedContacts } = useStore()

	const handlePickerOptionChange = (option: string) => {
		setBin(option)
		setBinnedContacts()
	}

	return (
		<SafeAreaView {...copilot}>
			<Picker
				selectedValue={binOption ?? undefined}
				onValueChange={handlePickerOptionChange}>
				{Object.entries(categories).map(([key, value]) => (
					<Picker.Item key={key} label={value} value={value} />
				))}
			</Picker>
		</SafeAreaView>
	)
}

export default CategoryPicker
