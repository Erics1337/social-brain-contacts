import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import React from 'react'

import HomeScreen from '../screens/HomeScreen'
import { AppStackParamList } from '../types'
import { Button, Image, Text, TouchableOpacity, View } from 'react-native'

import 'react-native-gesture-handler'
import useStore from '../store'
import Sidebar from '../components/Sidebar'
import SortScreen from '../screens/SortScreen'

const Stack = createStackNavigator<AppStackParamList>()

const AppStack: React.FC = () => {
	const { sidebarVisible, toggleSidebar } = useStore()
	const navigation = useNavigation()

	const commonHeaderOptions = {
		headerLeft: () => (
			<View style={{ padding: 10, marginBottom: 10 }}>
				<TouchableOpacity onPress={() => navigation.navigate('Home')}>
					<Image
						style={{ width: 50, height: 50 }}
						source={require('../assets/logo.png')}
					/>
				</TouchableOpacity>
			</View>
		),
		headerTitle: () => null,
		headerRight: () => (
			<View style={{ flexDirection: "row", marginRight: 20 }}>
				<TouchableOpacity onPress={toggleSidebar}>
					<Text style={{ fontSize: 35 }}>☰</Text>
				</TouchableOpacity>
			</View>
		),
		headerStyle: {
			backgroundColor: '#fff',
		},
		headerTintColor: '#000',
		headerTitleStyle: {
			fontWeight: 'bold',
		},
	}

	return (
		<>
			<Sidebar />
			<Stack.Navigator screenOptions={{ headerShown: true }}>
				<Stack.Screen
					name='Home'
					component={HomeScreen}
					options={commonHeaderOptions}
				/>
				<Stack.Screen
					name='Sort'
					component={SortScreen}
					options={commonHeaderOptions}
				/>
			</Stack.Navigator>
		</>
	)
}

export default AppStack
