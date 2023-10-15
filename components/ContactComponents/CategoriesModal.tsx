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

export const CategoriesModal = (props: { contact: OverloadedExpoContact }) => {
	const { contact } = props
	const {
		updateContact,
		categoryCounts,
		groupLimits,
		categoriesModal,
		toggleCategoriesModal,
	} = useStore()

	const [selectedLabel, setSelectedLabel] = useState('')

	const handleModalClose = () => {
		toggleCategoriesModal()
	}

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
			toggleCategoriesModal() // Close modal
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
			toggleCategoriesModal() // Close modal
			return
		}

		setSelectedLabel(value)
		updateContact(contact.id, value)
		toggleCategoriesModal()
	}

	type CategoryOptionProps = {
		category: string;
		handleOptionSelect: (value: string) => void;
	}

	const CategoryOption = ({ category, handleOptionSelect }: CategoryOptionProps) => {
		return (
			<TouchableOpacity
				style={{ padding: 10 }} // Replaced className with inline style for demonstration purposes
				onPress={() => handleOptionSelect(category)}>
				<Text style={{ fontSize: 16 }}>{category}</Text>
			</TouchableOpacity>
		)
	}

	return (
		<Modal
			visible={categoriesModal!}
			transparent={true}
			animationType='fade'>
			<TouchableWithoutFeedback onPress={handleModalClose}>
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: 'rgba(0, 0, 0, 0.5)',
					}}>
					{/* Replaced className with inline style for demonstration purposes */}
					<Pressable>
						<View
							style={{
								backgroundColor: 'white',
								padding: 16,
								borderRadius: 8,
								shadowColor: '#000',
								shadowOffset: { width: 0, height: 2 },
								shadowOpacity: 0.25,
								shadowRadius: 3.84,
								elevation: 5,
							}}>
							{/* Replaced className with inline style for demonstration purposes */}
							<Text
								style={{
									fontSize: 24,
									fontWeight: 'bold',
									marginBottom: 16,
								}}>
								Select Option
							</Text>
							{/* Replaced className with inline style for demonstration purposes */}
							{Object.keys(groupLimits).map((category, index) => (
								<CategoryOption
									key={index}
									category={category}
									handleOptionSelect={handleOptionSelect}
								/>
							))}
							<TouchableOpacity
								style={{ padding: 10 }} // Replaced className with inline style for demonstration purposes
								onPress={handleModalClose}>
								<Text style={{ fontSize: 16, color: 'red' }}>
									Cancel
								</Text>
								{/* Replaced className with inline style for demonstration purposes */}
							</TouchableOpacity>
						</View>
					</Pressable>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	)
}
