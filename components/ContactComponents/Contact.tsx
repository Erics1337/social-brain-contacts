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

type ContactProps = {
	contact: OverloadedExpoContact
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
	const firstName = contact.firstName ?? ''
	const lastName = contact.lastName ?? ''
	const initials = firstName[0] + lastName[0]

	const [showModal, setShowModal] = useState(false)
	const [selectedLabel, setSelectedLabel] = useState('')

	const { updateContact } = useStore() // Replace with your actual Zustand store and update function

	const handleCall = () => {
		// TODO: Implement call action
	}

	const handleText = () => {
		// TODO: Implement text action
	}

	const handleEmail = () => {
		// TODO: Implement email action
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
