import React, { useState } from 'react'
import {
	Alert,
	Modal,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from 'react-native'
import {
	reauthenticateWithCredential,
	EmailAuthProvider,
	deleteUser,
} from 'firebase/auth'
import { auth } from '../config'
import { collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../config'
import useStore from '../store'

const DeleteUserModal = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const { showAccountDeleteModal, toggleAccountDeleteModal } = useStore()

	const confirmAndDelete = () => {
		Alert.alert(
			'Delete Account',
			'Are you sure you want to delete your account and all associated data?',
			[
				{
					text: 'Cancel',
					onPress: () => {},
					style: 'cancel',
				},
				{
					text: 'Confirm',
					onPress: reauthenticateUser,
				},
			]
		)
	}

	const reauthenticateUser = async () => {
		const credential = EmailAuthProvider.credential(email, password)

		try {
			await reauthenticateWithCredential(auth.currentUser!, credential)
			deleteUserAndData()
		} catch (error) {
			console.error('Error reauthenticating:', error)
		}
	}

	const deleteUserAndData = async () => {
		try {
			// Remove user associated data
			const userDoc = doc(
				collection(db, 'users'),
				auth.currentUser!.uid
			)
			await deleteDoc(userDoc)

			// Delete user account
			await deleteUser(auth.currentUser!)

			toggleAccountDeleteModal()
		} catch (error) {
			console.error('Error during user/data deletion:', error)
		}
	}

	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={showAccountDeleteModal!}
			onRequestClose={() => {
				Alert.alert('Modal has been closed.')
				toggleAccountDeleteModal()
			}}>
			<View className='flex-1 justify-center items-center'>
				<View className='m-5 bg-white rounded-lg p-9 w-4/5'>
					<Text className='mb-4 text-center'>
						To confirm the deletion of your account and associated
						data, we need you to sign in again for security reasons.
					</Text>
					<TextInput
						placeholder='Email'
						value={email}
						onChangeText={setEmail}
						className='bg-white rounded-lg flex-row p-3 my-3 w-full border border-gray-400'
					/>
					<TextInput
						placeholder='Password'
						value={password}
						onChangeText={setPassword}
						secureTextEntry={true}
						className='bg-white rounded-lg flex-row p-3 my-3 w-full border border-gray-400'
					/>
					<TouchableOpacity
						className='mt-4 bg-red-600 p-3 rounded-lg'
						onPress={confirmAndDelete}>
						<Text className='text-white text-center'>
							Confirm Deletion
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						className='mt-4 bg-blue-600 p-3 rounded-lg'
						onPress={toggleAccountDeleteModal}>
						<Text className='text-white text-center'>Cancel</Text>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	)
}

export default DeleteUserModal
