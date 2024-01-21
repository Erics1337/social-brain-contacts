import { createStackNavigator } from '@react-navigation/stack'
import { useNavigation, useRoute } from "@react-navigation/native"
import React, { useEffect, useState } from 'react'

import HomeScreen from "../screens/HomeScreen"
import { AppStackParamList } from "../types"
import { Button, Image, Text, TouchableOpacity, View } from "react-native"

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

	const commonHeaderOptions = (route: String) => {
		// const route = useRoute()
		// const getNavigationTarget = () => {
		// 	// Toggle between 'Home' and 'Sort' based on the current route
		// 	return route.name === "Home" ? "Sort" : "Home"
		// }
		return {
			headerLeft: () => (
				<View style={{ padding: 10, marginBottom: 10 }}>
					<TouchableOpacity
						// @ts-ignore
						onPress={() => navigation.navigate(route)}
					>
						<Image
							style={{ width: 50, height: 50 }}
							source={require("../assets/logo.png")}
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
				backgroundColor: "#fff",
			},
			headerTintColor: "#000",
			headerTitleStyle: {
				fontWeight: "bold" as const,
			},
		}
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
					name="Home"
					component={HomeScreen}
					options={commonHeaderOptions("Sort")}
				/>
				<Stack.Screen
					name="Sort"
					component={SortScreen}
					options={commonHeaderOptions("Home")}
				/>
			</Stack.Navigator>
		</>
	)
}

export default AppStack
