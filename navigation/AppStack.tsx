import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'

import HomeScreen from '../screens/HomeScreen'
import { AppStackParamList } from '../types'
import { Button, Image, View } from 'react-native'

import 'react-native-gesture-handler'
import useStore from '../store'
import Sidebar from '../components/Sidebar';

const Stack = createStackNavigator<AppStackParamList>()



const AppStack: React.FC = () => {
    const { sidebarVisible, toggleSidebar } = useStore();

	return (
		<>
		<Sidebar />
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
								title='☰'
								onPress={toggleSidebar}
							/>
							<View style={{ width: 10 }} />
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
		</>
	)
}

export default AppStack
