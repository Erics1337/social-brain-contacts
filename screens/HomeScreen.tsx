import React from 'react'
import { View, Button, Text } from 'react-native'
import { signOut } from 'firebase/auth'

import { auth } from '../config'
import ContactList from '../components/ContactComponents/ContactList'

const HomeScreen: React.FC = () => {
	const handleLogout = () => {
		signOut(auth).catch((error) =>
			console.log('Error logging out: ', error)
		)
	}
	return (
		<View className='flex-1'>
			<ContactList />
			<Button title='Sign Out' onPress={handleLogout} />
		</View>
	)
}

export default HomeScreen
