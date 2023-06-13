import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import {
	Text,
	View,
	Image,
	StyleSheet,
	SafeAreaView,
	TouchableOpacity,
	ScrollView,
} from 'react-native'
import tw  from 'tailwind-rn'
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

import Communications from 'react-native-communications'

import * as Contacts from 'expo-contacts'
import ContactCard from '../components/ContactCard';

function Home() {
	const { user, logout } = useAuth()
	const [profiles, setProfiles] = useState([])
	const navigation = useNavigation()
	const swipeRef = useRef(null)
	
	let [error, setError] = useState(undefined)
	let [contacts, setContacts] = useState(undefined)
		
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
					setContacts(data)
				} else {
					setError('No contacts found')
				}
			} else {
				setError('Permission to access contacts denied.')
			}
		})()
	}, [])

	// let ContactCard = (phone) => {
	// 	console.log('phone', phone)
	// 	return (
	// 		<View style={tw('flex-1 relative')}>
	// 			<Text style={styles.text}>Make phone call</Text>

	// 			{/* Phone */}
	// 			<TouchableOpacity
	// 				onPress={() =>
	// 					Communications.phonecall(String(phone.phone), true)
	// 				}>
	// 				<View style={styles.holder}>
	// 					<Text style={styles.text}>Make phone call</Text>
	// 				</View>
	// 			</TouchableOpacity>

	// 			{/* Text */}
	// 			<TouchableOpacity
	// 				onPress={() => Communications.text(phone.phone)}>
	// 				<View style={styles.holder}>
	// 					<Text style={styles.text}>Send a text/iMessage</Text>
	// 				</View>
	// 			</TouchableOpacity>
	// 		</View>
	// 	)
	// }

	// let getContactData = (data, property) => {
	// 	if (data) {
	// 		return data.map((data, index) => {
	// 			return (
	// 				<View key={index}>
	// 					<Text>
	// 						{data.label}: {data[property]}
	// 					</Text>
	// 				</View>
	// 			)
	// 		})
	// 	}
	// }

	let getContactRows = () => {
		console.log(contacts);
		if (contacts !== undefined) {
			return contacts.map((contact, index) => {
				return (
					// <ContactCard
					// 	key={index}
					// 	phone={contact.phoneNumbers[0].digits}
					// 	email={contact.email}
					// 	web={contact.web}
					// />
					<ContactCard contact={contact} key={index}/>
				)
			})
		} else {
			return <Text>Awaiting contacts...</Text>
		}
	}

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
				<View
					style={tw(
						'flex-1 bg-white mt-24 items-center justify-center'
					)}>
					<ScrollView>{getContactRows()}</ScrollView>
					<Text>{error}</Text>
					<StatusBar style='auto' />
				</View>
			</View>

			<StatusBar style='auto' />
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	contact: {
		marginVertical: 8,
	},
	container: {
		flex: 1,
		alignItems: 'center',
		backgroundColor: 'rgb(253,253,253)',
	},
	holder: {
		flex: 0.25,
		justifyContent: 'center',
	},
	text: {
		fontSize: 32,
	},
})

export default Home
