import React from 'react'
import { View, Button, Text } from 'react-native'

import ContactList from '../components/ContactComponents/ContactList'
import CategoryPicker from '../components/CategoryPicker'

const HomeScreen: React.FC = () => {
	return (
		<View className='flex-1'>
			<CategoryPicker />
			<ContactList />
		</View>
	)
}

export default HomeScreen
