import React from 'react'
import {Picker} from '@react-native-picker/picker';
import useStore from '../store';

const CategoryPicker: React.FC = () => {
	const { binName, setBinName, setBinnedContacts } = useStore()

	const handlePickerOptionChange = (option: string) => {
		setBinName(option)
		setBinnedContacts()
	}

	return (
		<Picker
			selectedValue={binName ?? undefined}
			onValueChange={handlePickerOptionChange}>
			<Picker.Item label='Everyone' value='Everyone' />
			<Picker.Item label='Loved' value='Loved' />
			<Picker.Item label='Family' value='Family' />
			<Picker.Item label='Friends' value='Friends' />
			<Picker.Item label='Acquaintances' value='Acquaintances' />
			<Picker.Item label='Recognizable' value='Recognizable' />
		</Picker>
	)
}

export default CategoryPicker
