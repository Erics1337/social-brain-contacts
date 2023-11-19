import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'

import HomeScreen from '../screens/HomeScreen'
import { AppStackParamList } from '../types'
import { Button, Image, TouchableOpacity, View } from 'react-native'

import 'react-native-gesture-handler'
import useStore from '../store'
import Sidebar from '../components/Sidebar'
import SortScreen from '../screens/SortScreen'
import { useCopilot } from 'react-native-copilot'

const Stack = createStackNavigator<AppStackParamList>()

interface AppStackProps {
	appIntroIsDone: boolean
}

const AppStack: React.FC<AppStackProps> = ({ appIntroIsDone }) => {
	const { start } = useCopilot()
	const { sidebarVisible, toggleSidebar, showIntroSlider } = useStore()

	const navigation = useNavigation()

	const commonHeaderOptions = {
		headerLeft: () => (
			<View style={{ padding: 10, marginBottom: 10 }}>
				{/* @ts-ignore */}
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
			<View style={{ flexDirection: 'row', marginRight: 10 }}>
				<Button title='☰' onPress={toggleSidebar} />
				<View style={{ width: 10 }} />
			</View>
		),
		headerStyle: {
			backgroundColor: '#fff',
		},
		headerTintColor: '#000',
		headerTitleStyle: {
			fontWeight: 'bold' as const,
		},
	}

	useEffect(() => {
		if (appIntroIsDone) {
			setTimeout(() => {
				start()
				console.log('App intro is done! Starting tour.')
			}, 500)
		}
	}, [])

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
