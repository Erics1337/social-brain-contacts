import React from 'react'
import { Text, View } from 'react-native'
import { Contact as ExpoContact } from 'expo-contacts'
import Avatar from './Avatar';
import ActionIcons from './ActionIcons';

type ContactProps = {
	contact: ExpoContact
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
	const firstName = contact.firstName ?? '';
	const lastName = contact.lastName ?? '';
	const initials = firstName[0] + lastName[0]

	const handleCall = () => {
		// TODO: Implement call action
	}

	const handleText = () => {
		// TODO: Implement text action
	}

	const handleEmail = () => {
		// TODO: Implement email action
	}

	return (
		<View
			className='flex
					flex-row
					items-center
					justify-between
					p-4
					border-b
					border-gray-200'>
			<Avatar initials={initials} />
			<Text className='text-lg font-bold ml-4'>{`${contact.firstName} ${contact.lastName}`}</Text>
			<ActionIcons
				onCall={handleCall}
				onText={handleText}
				onEmail={handleEmail}
			/>
		</View>
	)
}

export default Contact;