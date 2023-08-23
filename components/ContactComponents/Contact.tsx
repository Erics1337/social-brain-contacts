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
import useStore from '../../store'
import { openURL } from 'expo-linking'
import { CategoriesModal } from './CategoriesModal'

type ContactProps = {
	contact: OverloadedExpoContact
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
	const firstName = contact.firstName ?? ''
	const lastName = contact.lastName ?? ''
	const initials = firstName[0] + lastName[0]

	const [showModal, setShowModal] = useState(false)

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
		setShowModal(true)
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
					callDisabled={false}
					emailDisabled={!contact?.emails?.length}
					textDisabled={false}
				/>
				{showModal && (
					<CategoriesModal
						contact={contact}
						showModal={showModal}
						setShowModal={setShowModal}
					/>
				)}
			</View>
		</TouchableWithoutFeedback>
	)
}

export default Contact
