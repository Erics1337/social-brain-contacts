import React, { useEffect, useRef, useState } from 'react'
import { View, Text, TouchableOpacity, Animated, Button } from 'react-native'
import useStore from '../store'
import { signOut } from 'firebase/auth'
import { auth } from '../config'
import DeleteUserModal from './DeleteUserModal'
import { useNavigation } from '@react-navigation/native'
import * as Application from 'expo-application'
import { Linking } from 'react-native'

const Sidebar: React.FC = () => {
	const navigation = useNavigation()

	const slideAnim = useRef(new Animated.Value(-500)).current
	const accountSlideAnim = useRef(new Animated.Value(-500)).current
	const aboutSlideAnim = useRef(new Animated.Value(-500)).current

	const {
		sidebarVisible,
		toggleSidebar,
		toggleShowSearchBox,
		toggleAccountDeleteModal,
	} = useStore()
	const [showAccountSidebar, setShowAccountSidebar] = useState(false)
	const [showAboutSidebar, setShowAboutSidebar] = useState(false)

	const handleLogout = () => {
		try {
			signOut(auth)
		} catch (error) {
			console.log('Error logging out: ', error)
		}
	}

	useEffect(() => {
		Animated.spring(slideAnim, {
			toValue: sidebarVisible && !showAccountSidebar ? 0 : -500,
			tension: 50,
			friction: 7,
			useNativeDriver: false,
		}).start()
	}, [sidebarVisible, showAccountSidebar])

	useEffect(() => {
		Animated.spring(accountSlideAnim, {
			toValue: showAccountSidebar ? 0 : -500,
			tension: 50,
			friction: 7,
			useNativeDriver: false,
		}).start()
	}, [showAccountSidebar])

	useEffect(() => {
		Animated.spring(aboutSlideAnim, {
			toValue: showAboutSidebar ? 0 : -500,
			tension: 50,
			friction: 7,
			useNativeDriver: false,
		}).start()
	}, [showAboutSidebar])

	return (
		<>
			<DeleteUserModal />
			{/* Main Sidebar */}
			<Animated.View
				style={{
					position: 'absolute',
					right: slideAnim,
					top: 50,
					bottom: 0,
					width: '60%',
					backgroundColor: '#fff',
					padding: 10,
					zIndex: 1,
				}}>
				<TouchableOpacity onPress={toggleSidebar}>
					<Text style={{ fontSize: 24 }}>X</Text>
				</TouchableOpacity>
				<View style={{ flexDirection: 'column' }}>
					<TouchableOpacity
						className='bg-primary py-2 px-4 rounded'
						onPress={() => {
							navigation.navigate('Sort')
							toggleSidebar()
						}}>
						<Text className='text-white text-center text-xl'>
							Sort Contacts
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{ marginBottom: 10 }}
						onPress={() => setShowAccountSidebar(true)}>
						<Text className='text-primary text-center text-xl'>
							Account
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{ marginBottom: 10 }}
						onPress={() => setShowAboutSidebar(true)}>
						<Text className='text-primary text-center text-xl'>About</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={{ marginBottom: 10 }}
						onPress={() => handleLogout()}>
						<Text className='text-center text-xl'>Sign Out</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>

			{/* Account Sidebar */}
			<Animated.View
				style={{
					position: 'absolute',
					right: accountSlideAnim,
					top: 50,
					bottom: 0,
					width: '60%',
					backgroundColor: '#f5f5f5',
					padding: 10,
					zIndex: 2,
				}}>
				<TouchableOpacity onPress={() => setShowAccountSidebar(false)}>
					<Text style={{ fontSize: 24 }}>&larr;</Text>
				</TouchableOpacity>
				<View style={{ flexDirection: 'column' }}>
					<Button
						title='Delete Account'
						onPress={() => toggleAccountDeleteModal()}
					/>
					{/* <Button title='Other Option' onPress={() => console.log('Other Option')} /> */}
				</View>
			</Animated.View>

			{/* About Sidebar */}
			<Animated.View
				style={{
					position: 'absolute',
					right: aboutSlideAnim,
					top: 50,
					bottom: 0,
					width: '60%',
					backgroundColor: '#f5f5f5',
					padding: 10,
					zIndex: 2,
				}}>
				<TouchableOpacity onPress={() => setShowAboutSidebar(false)}>
					<Text className='text-2xl'>←</Text>
				</TouchableOpacity>
				<View className='flex-col'>
					<Text className='text-lg font-medium mb-1'>
						Social Brain Contacts
					</Text>
					<Text className='text-base mb-1'>
						App Name: {Application.applicationName}
					</Text>
					<Text className='text-base mb-1'>
						App Version: {Application.nativeApplicationVersion}
					</Text>
					<Text className='text-base mb-1'>
						Build Version: {Application.nativeBuildVersion}
					</Text>
					<TouchableOpacity
						onPress={() =>
							Linking.openURL(
								'https://www.socialbraincontacts.com'
							)
						}>
						<Text className='text-base text-blue-500 underline'>
							Visit Website
						</Text>
					</TouchableOpacity>
				</View>
			</Animated.View>
		</>
	)
}

export default Sidebar
