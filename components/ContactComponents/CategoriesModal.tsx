import React, { useState } from 'react'
import {
	Modal,
	Pressable,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import useStore from '../../store'
import { OverloadedExpoContact } from '../../types'

export const CategoriesModal = (props: { contact: OverloadedExpoContact, showModal: boolean, setShowModal: (show: boolean) => void }) => {
	const { contact, showModal, setShowModal } = props	
	const { updateContact } = useStore()
	const [selectedLabel, setSelectedLabel] = useState('')

	const handleModalClose = () => {
		setShowModal(false)
	}

	const handleOptionSelect = (value: string) => {
		setSelectedLabel(value)
		updateContact(contact.id, value) // Call the update function from your Zustand store to update contact state and Firebase
		setShowModal(false)
	}

	return (
		<Modal visible={showModal} transparent={true} animationType='fade'>
			<TouchableWithoutFeedback onPress={handleModalClose}>
				<View className='flex-1 justify-center items-center bg-opacity-50 bg-black'>
					<Pressable>
						<View className='bg-white p-4 rounded shadow'>
							<Text className='text-lg font-bold mb-4'>Select Option</Text>
							<TouchableOpacity
								className='p-2'
								onPress={() => handleOptionSelect('Everyone')}>
								<Text className='text-base'>Everyone</Text>
							</TouchableOpacity>
							<TouchableOpacity
								className='p-2'
								onPress={() => handleOptionSelect('Loved')}>
								<Text className='text-base'>Loved</Text>
							</TouchableOpacity>
							<TouchableOpacity
								className='p-2'
								onPress={() => handleOptionSelect('Family')}>
								<Text className='text-base'>Family</Text>
							</TouchableOpacity>
							<TouchableOpacity
								className='p-2'
								onPress={() => handleOptionSelect('Friends')}>
								<Text className='text-base'>Friends</Text>
							</TouchableOpacity>
							<TouchableOpacity
								className='p-2'
								onPress={() => handleOptionSelect('Acquaintances')}>
								<Text className='text-base'>Acquaintances</Text>
							</TouchableOpacity>
							<TouchableOpacity
								className='p-2'
								onPress={() => handleOptionSelect('Recognizable')}>
								<Text className='text-base'>Recognizable</Text>
							</TouchableOpacity>
							<TouchableOpacity
								className='p-2'
								onPress={handleModalClose}>
								<Text className='text-base text-red-500'>Cancel</Text>
							</TouchableOpacity>
						</View>
					</Pressable>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	)
}
