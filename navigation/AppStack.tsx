import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import HomeScreen from '../screens/HomeScreen'
import { AppStackParamList } from '../types'
import { Button, Image, View } from 'react-native'

import 'react-native-gesture-handler';


const Stack = createStackNavigator<AppStackParamList>()

const handleLogout = () => {
	try {
	} catch (error) {
		console.log('Error logging out: ', error)
	}
}

const AppStack: React.FC = () => {
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
								source={require('../assets/logo.png')} // Replace './path-to-your-logo.png' with the path to your logo
							/>
						</View>
					),
					headerTitle: (props) => null,
					headerRight: () => (
						<Button
							title='Sign Out'
							onPress={handleLogout}
							color='#000'
						/>
					),
					headerStyle: {
						backgroundColor: '#fff', // This is equivalent to 'bg-white'
					},
					headerTintColor: '#000', // This is equivalent to 'text-black'
					headerTitleStyle: {
						fontWeight: 'bold', // This is equivalent to 'font-bold'
					},
				}}
			/>
		</Stack.Navigator>
	)
}

export default AppStack
