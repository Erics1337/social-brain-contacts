import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import HomeScreen from '../screens/HomeScreen'
import { AppStackParamList } from '../types'
import { Button, Image, View } from 'react-native'
import { signOut } from 'firebase/auth'
import { auth } from '../config'
import 'react-native-gesture-handler'
import useStore from '../store'

const Stack = createStackNavigator<AppStackParamList>()

const handleLogout = () => {
	try {
		signOut(auth)
	} catch (error) {
		console.log('Error logging out: ', error)
	}
}

const AppStack: React.FC = () => {
	const { showSearchBox, setShowSearchBox } = useStore()

	return (
		<Stack.Navigator screenOptions={{ headerShown: true }}>
			<Stack.Screen
				name='Home'
				component={HomeScreen}
				options={{
					headerLeft: (props) => (
						<View style={{ padding: 10, marginBottom: 10 }}>
							<Image
								style={{ width: 50, height: 50 }}
								source={require('../assets/logo.png')}
							/>
						</View>
					),
					headerTitle: (props) => null,
					headerRight: () => (
						<View style={{ flexDirection: 'row', marginRight: 10 }}>
							<Button
								title='Search'
								onPress={() => setShowSearchBox(!showSearchBox)}
							/>
							<View style={{ width: 10 }} />
							{/* This provides a margin between the buttons */}
							<Button
								title='Sign Out'
								onPress={handleLogout}
								color='#000'
							/>
						</View>
					),
					headerStyle: {
						backgroundColor: '#fff',
					},
					headerTintColor: '#000',
					headerTitleStyle: {
						fontWeight: 'bold',
					},
				}}
			/>
		</Stack.Navigator>
	)
}

export default AppStack
