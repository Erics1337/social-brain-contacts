import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
	Text,
	View,
	Image,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
	Picker,
} from 'react-native'
import tw from 'tailwind-rn'
import useAuth from '../hooks/useAuth'
import { StatusBar } from 'expo-status-bar'
import { useNavigation } from '@react-navigation/core'
import { AntDesign, Entypo, Ionicons } from '@expo/vector-icons'
import {
	collection,
	doc,
	getDoc,
	getDocs,
	onSnapshot,
	orderBy,
	query,
	serverTimestamp,
	setDoc,
	where,
} from '@firebase/firestore'
import { db } from '../firebase'

import * as Contacts from 'expo-contacts'
import ContactCard from '../components/ContactCard'

import useStore from '../store'

function Home() {
	const { user, logout } = useAuth()
	const [profiles, setProfiles] = useState([])
	const navigation = useNavigation()
	const swipeRef = useRef(null)

	let [error, setError] = useState(undefined)
	// let [contacts, setContacts] = useState(undefined)

	// const [selectedValue, setSelectedValue] = useState('family')
	// const state = useStore()
	const [setUser, binName, setBinName, contacts, setContacts] = useStore(
		(state) => [
			state.setUser,
			state.binName,
			state.setBinName,
			state.contacts,
			state.setContacts,
		]
	)

	useLayoutEffect(() => {
		navigation.setOptions({
			headerShown: false,
		})
	}, [])

	useEffect(() => {
		;(async () => {
			const { status } = await Contacts.requestPermissionsAsync()
			if (status === 'granted') {
				const { data } = await Contacts.getContactsAsync({
					fields: [
						Contacts.Fields.Birthday,
						Contacts.Fields.Emails,
						Contacts.Fields.FirstName,
						Contacts.Fields.LastName,
						Contacts.Fields.PhoneNumbers,
					],
				})

				if (data.length > 0) {
					// sync contact id's and bins with firestore
					// Set contacts to state
					setUser(user)
					setContacts(data)
				} else {
					setError('No contacts found')
				}
			} else {
				setError('Permission to access contacts denied.')
			}
		})()
	}, [])

	let getContactRows = () => {
		if (contacts) {
			return contacts.map((contact, index) => {
				return <ContactCard contact={contact} key={index} />
			})
		} else {
			return <Text>Awaiting contacts...</Text>
		}
	}

	console.log('user', user)

	return (
		<SafeAreaView style={tw('flex-1 relative')}>
			<View style={tw('items-center relative')}>
				{user && (
					<TouchableOpacity
						onPress={logout}
						style={tw('absolute left-5 top-3')}>
						<Image
							style={tw('h-10 w-10 rounded-full')}
							source={{ uri: user.photoUrl }}
						/>
					</TouchableOpacity>
				)}
			</View>
			<View style={tw('flex-1 -mt-6')}>
				<View>
					<Picker
						selectedValue={binName}
						style={{ height: 80 }}
						onValueChange={(itemValue, itemIndex) =>
							setBinName(itemValue)
						}>
						<Picker.Item label='Loved' value='loved' />
						<Picker.Item label='Family' value='family' />
						<Picker.Item label='Friends' value='friends' />
						<Picker.Item
							label='Acquaintances'
							value='acquaintances'
						/>
						<Picker.Item
							label='Recognizable'
							value='recognizable'
						/>
					</Picker>
				</View>
				<View
					style={tw(
						'flex-1 bg-white mt-24 items-center justify-center'
					)}>
					<Text>{binName}</Text>
					<ScrollView>{getContactRows()}</ScrollView>
					<Text>{error}</Text>
					<StatusBar style='auto' />
				</View>
			</View>

			<StatusBar style='auto' />
		</SafeAreaView>
	)
}

export default Home
