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
import Toast from 'react-native-root-toast'

export const CategoriesModal = (props: {
	contact: OverloadedExpoContact
	onClose: () => void
}) => {
	const { contact } = props
	const { updateContact, categoryCounts, groupLimits } = useStore()

	const handleModalClose = () => {
		props.onClose()
	}

	const [selectedLabel, setSelectedLabel] = useState('')

	const handleOptionSelect = (value: string) => {
		const safeOption = value as keyof typeof groupLimits
		// Contact already in group
		if (contact.bin === value) {
			Toast.show('Contact is already in this group!', {
				duration: Toast.durations.SHORT,
				position: Toast.positions.BOTTOM,
				shadow: true,
				animation: true,
				hideOnPress: true,
				backgroundColor: 'orange',
				textColor: 'white',
			})
			handleModalClose() // Close modal
			return
		}
		// Group population limit reached
		if (
			groupLimits[safeOption] &&
			categoryCounts[safeOption] >= groupLimits[safeOption]
		) {
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
			handleModalClose() // Close modal
			return
		}

		setSelectedLabel(value)
		updateContact(contact.id, value)
		handleModalClose()
	}

	type CategoryOptionProps = {
		category: string
		handleOptionSelect: (value: string) => void
	}

	const CategoryOption = ({
		category,
		handleOptionSelect,
	}: CategoryOptionProps) => {
		return (
			<TouchableOpacity
				className='bg-primary rounded-full my-1 p-2'
				onPress={() => handleOptionSelect(category)}>
				<Text className='text-white text-center text-lg'>
					{category}
				</Text>
			</TouchableOpacity>
		)
	}

	return (
		<Modal visible={true} transparent={true} animationType='fade'>
			<TouchableWithoutFeedback onPress={handleModalClose}>
				<View className='flex-1 justify-center items-center bg-black bg-opacity-50'>
					<Pressable className='bg-white p-4 rounded-lg shadow-lg'>
						<View className='w-full'>
							<Text className='text-3xl font-bold mb-4 text-center'>
								Move contact to group:
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
								<Text className='text-lg text-red-500 text-center'>
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

export default CategoriesModal
