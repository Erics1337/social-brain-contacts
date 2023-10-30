import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ContactList from '../components/ContactComponents/ContactList'

const Tab = createBottomTabNavigator()

function AllContacts() {
	return <ContactList />
}

function UngroupedContacts() {
	return <ContactList showUngrouped={true} />
}

function SortScreen() {
	return (
		<Tab.Navigator
			initialRouteName='AllContacts'
			screenOptions={{
				tabBarActiveTintColor: '#e91e63',
			}}>
			<Tab.Screen
				name='AllContacts'
				component={AllContacts}
				options={{
					tabBarLabel: 'All Contacts',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='account-multiple'
							color={color}
							size={size}
						/>
					),
					headerShown: false,
				}}
			/>
			<Tab.Screen
				name='UngroupedContacts'
				component={UngroupedContacts}
				options={{
					tabBarLabel: 'Ungrouped',
					tabBarIcon: ({ color, size }) => (
						<MaterialCommunityIcons
							name='account-off'
							color={color}
							size={size}
						/>
					),
					headerShown: false,
				}}
			/>
		</Tab.Navigator>
	)
}

export default SortScreen
