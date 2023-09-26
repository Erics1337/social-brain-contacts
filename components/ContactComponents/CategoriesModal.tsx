import React, { useState } from 'react'
import {
	Modal,
	Pressable,
	Text,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from 'react-native'
import useStore from '../../store' // Assume this is where your Zustand store is located
import { OverloadedExpoContact } from '../../types' // Assume this is where your types are located
import Toast from 'react-native-root-toast' // Import the Toast component

export const CategoriesModal = (props: {
	contact: OverloadedExpoContact
}) => {
	const { contact } = props
	const {
		updateContact,
		categoryCounts,
		groupLimits,
		categoriesModal, // State from Zustand store
		toggleCategoriesModal, // Setter function from Zustand store
	} = useStore()

	const [selectedLabel, setSelectedLabel] = useState('')

	const handleModalClose = () => {
		toggleCategoriesModal()
	}

	const handleOptionSelect = (value: string) => {
		const safeOption = value as keyof typeof groupLimits

		if (
			groupLimits[safeOption] &&
			categoryCounts[safeOption] >= groupLimits[safeOption]
		) {
			console.log('Limit reached. Showing toast.') // Debugging log
			Toast.show(
				`The group ${value} is full. Limit size has been reached.`,
				{
					duration: Toast.durations.SHORT,
					position: Toast.positions.BOTTOM,
					shadow: true,
					animation: true,
					hideOnPress: true,
					backgroundColor: 'red',
					textColor: 'white',
				}
			)
			toggleCategoriesModal() // Close modal using Zustand store
			return
		}

		setSelectedLabel(value)
		updateContact(contact.id, value) // Update function from Zustand store to update contact state and Firebase
		toggleCategoriesModal() // Close modal using Zustand store
	}

	const CategoryOption = ({ category, handleOptionSelect }) => {
		return (
			<TouchableOpacity
				className='p-2'
				onPress={() => handleOptionSelect(category)}>
				<Text className='text-base'>{category}</Text>
			</TouchableOpacity>
		)
	}

	return (
		<Modal
			visible={categoriesModal!}
			transparent={true}
			animationType='fade'>
			<TouchableWithoutFeedback onPress={handleModalClose}>
				<View className='flex-1 justify-center items-center bg-opacity-50 bg-black'>
					<Pressable>
						<View className='bg-white p-4 rounded shadow'>
							<Text className='text-lg font-bold mb-4'>
								Select Option
							</Text>
							{Object.keys(groupLimits).map((category, index) => (
								<CategoryOption
									key={index}
									category={category}
									handleOptionSelect={handleOptionSelect}
								/>
							))}
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
	)
}
