import React, { useState } from 'react'
import {
	Text,
	View,
	TouchableWithoutFeedback,
	Modal,
	TouchableOpacity,
	Pressable,
} from 'react-native'
import Avatar from './Avatar'
import ActionIcons from './ActionIcons'
import { OverloadedExpoContact } from '../../types'
import useStore from '../../store'
import { openURL, canOpenURL } from 'expo-linking'

type ContactProps = {
	contact: OverloadedExpoContact
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
	const firstName = contact.firstName ?? ''
	const lastName = contact.lastName ?? ''
	const initials = firstName[0] + lastName[0]

	const [showModal, setShowModal] = useState(false)
	const [selectedLabel, setSelectedLabel] = useState('')

	const { updateContact } = useStore()

	const [canOpenEmail, setCanOpenEmail] = useState(false)
	const [canOpenTelephone, setCanOpenTelephone] = useState(false)
	const [canOpenSMS, setCanOpenSMS] = useState(false)

	canOpenURL('mailto: chelsea@tripwiretech.com').then((canOpen) => {
		setCanOpenEmail(canOpen)
	})

	// Check for valid contact info on load
	if (contact?.phoneNumbers?.[0]?.number) {
		canOpenURL(`tel://+1${contact.phoneNumbers[0].number}`).then(
			(canOpen) => {
				setCanOpenTelephone(canOpen)
				setCanOpenSMS(canOpen)
			}
		)
	}
	if (contact?.emails?.[0]?.email) {
		canOpenURL(`tel://+1${contact.emails[0].email}`).then((canOpen) => {
			setCanOpenEmail(canOpen)
		})
	}

	// Handlers
	const handleCall = () => {
		if (contact?.phoneNumbers?.[0]?.number) {
			openURL(`tel://+1${contact.phoneNumbers[0].number}`)
		}
	}

	const handleText = () => {
		if (contact?.phoneNumbers?.[0]?.number) {
			openURL(`sms://+1${contact.phoneNumbers[0].number}`)
		}
	}

	const handleEmail = () => {
		if (contact?.emails?.[0]?.email) {
			openURL(`mailto:${contact.emails[0].email}`)
		}
	}

	const handleLongPress = () => {
		setShowModal(true)
	}

	const handleModalClose = () => {
		setShowModal(false)
	}

	const handleOptionSelect = (value: string) => {
		setSelectedLabel(value)
		updateContact(contact.id, value) // Call the update function from your Zustand store to update contact state and Firebase
		setShowModal(false)
	}

	return (
		<TouchableWithoutFeedback onLongPress={handleLongPress}>
			<View className='flex flex-row items-center justify-between p-4 border-b border-gray-200'>
				<Avatar initials={initials} />
				<Text className='text-lg font-bold ml-4'>{`${contact.firstName} ${contact.lastName}`}</Text>
				<ActionIcons
					onCall={handleCall}
					onText={handleText}
					onEmail={handleEmail}
					callDisabled={canOpenTelephone}
					emailDisabled={canOpenEmail}
					textDisabled={canOpenSMS}
				/>
				{showModal && (
					<Modal
						visible={showModal}
						transparent={true}
						animationType='fade'>
						<TouchableWithoutFeedback onPress={handleModalClose}>
							<View className='flex-1 justify-center items-center bg-opacity-50 bg-black'>
								<Pressable>
									<View className='bg-white p-4 rounded shadow'>
										<Text className='text-lg font-bold mb-4'>
											Select Option
										</Text>
										<TouchableOpacity
											className='p-2'
											onPress={() =>
												handleOptionSelect('Everyone')
											}>
											<Text className='text-base'>
												Everyone
											</Text>
										</TouchableOpacity>
										<TouchableOpacity
											className='p-2'
											onPress={() =>
												handleOptionSelect('Loved')
											}>
											<Text className='text-base'>
												Loved
											</Text>
										</TouchableOpacity>
										<TouchableOpacity
											className='p-2'
											onPress={() =>
												handleOptionSelect('Family')
											}>
											<Text className='text-base'>
												Family
											</Text>
										</TouchableOpacity>
										<TouchableOpacity
											className='p-2'
											onPress={() =>
												handleOptionSelect('Friends')
											}>
											<Text className='text-base'>
												Friends
											</Text>
										</TouchableOpacity>
										<TouchableOpacity
											className='p-2'
											onPress={() =>
												handleOptionSelect(
													'Acquaintances'
												)
											}>
											<Text className='text-base'>
												Acquaintances
											</Text>
										</TouchableOpacity>
										<TouchableOpacity
											className='p-2'
											onPress={() =>
												handleOptionSelect(
													'Recognizable'
												)
											}>
											<Text className='text-base'>
												Recognizable
											</Text>
										</TouchableOpacity>
										<TouchableOpacity
											className='p-2'
											onPress={handleModalClose}>
											<Text className='text-base text-red-500'>
												Cancel
											</Text>
										</TouchableOpacity>
									</View>
								</Pressable>
							</View>
						</TouchableWithoutFeedback>
					</Modal>
				)}
			</View>
		</TouchableWithoutFeedback>
	)
}

export default Contact
