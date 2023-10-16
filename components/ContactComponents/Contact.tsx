import React, { useState, useEffect } from 'react'
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
import { openURL } from 'expo-linking'
import { CategoriesModal } from './CategoriesModal'

type ContactProps = {
	contact: OverloadedExpoContact
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
	const firstName = contact.firstName ?? ''
	const lastName = contact.lastName ?? ''

	const getInitials = (firstName: string, lastName: string) => {
		let firstInitial = ''
		let lastInitial = ''
		if (
			firstName &&
			typeof firstName === 'string' &&
			firstName.length > 0
		) {
			firstInitial = firstName[0]
		}
		if (lastName && typeof lastName === 'string' && lastName.length > 0) {
			lastInitial = lastName[0]
		}
		return firstInitial + lastInitial
	}

	const initials = getInitials(firstName, lastName)

	const [isModalVisible, setIsModalVisible] = useState(false)

	// Handlers
	const handleCall = () => {
		if (contact?.phoneNumbers?.[0]?.number) {
			openURL(`tel://+1${contact.phoneNumbers[0].number}`).catch(
				(error) => {
					console.log(error)
				}
			)
		}
	}

	const handleText = () => {
		if (contact?.phoneNumbers?.[0]?.number) {
			openURL(`sms://+1${contact.phoneNumbers[0].number}`).catch(
				(error) => {
					console.log(error)
				}
			)
		}
	}

	const handleEmail = () => {
		if (contact?.emails?.[0]?.email) {
			const email = contact.emails[0].email
			console.log('Email:', email) // Log the email
			openURL(`mailto:${email}`).catch((error) => {
				console.log(error)
			})
		} else console.log('no contact email found')
	}


	const handleLongPress = () => {
		console.log('Long Press Contact Id: ', contact.id)
		setIsModalVisible(true) // Open modal for this specific contact
	}

	const handleCloseModal = () => {
		setIsModalVisible(false)
	}

	return (
		<TouchableOpacity activeOpacity={0.5} onLongPress={handleLongPress}>
			<View className='flex flex-row items-center justify-between p-4 border-b border-gray-200'>
				<Avatar initials={initials} />
				<View className='flex-1 mx-3'>
					<Text className='text-lg font-bold ml-4'>{`${contact.firstName} ${contact.lastName} ${contact.id}`}</Text>
				</View>
				<ActionIcons
					onCall={handleCall}
					onText={handleText}
					onEmail={handleEmail}
					callDisabled={false}
					emailDisabled={!contact?.emails?.length}
					textDisabled={false}
				/>
				{isModalVisible && (
					<CategoriesModal
						contact={contact}
						onClose={handleCloseModal}
					/>
				)}
			</View>
		</TouchableOpacity>
	)
}

export default Contact
