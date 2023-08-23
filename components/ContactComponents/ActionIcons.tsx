import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

type ActionIconsProps = {
	onCall: () => void
	onText: () => void
	onEmail: () => void
	callDisabled: boolean
	emailDisabled: boolean
	textDisabled: boolean
}

const ActionIcons: React.FC<ActionIconsProps> = ({
	onCall,
	onText,
	onEmail,
	callDisabled,
	emailDisabled,
	textDisabled,
}) => {
	return (
		<View className='flex flex-row'>
			{!callDisabled && (
				<TouchableOpacity onPress={onCall}>
					<MaterialIcons name='call' size={24} color='black' />
				</TouchableOpacity>
			)}
			{!textDisabled && (
				<TouchableOpacity onPress={onText}>
					<MaterialIcons name='message' size={24} color='black' />
				</TouchableOpacity>
			)}
			{!emailDisabled && (
				<TouchableOpacity onPress={onEmail}>
					<MaterialIcons name='email' size={24} color='black' />
				</TouchableOpacity>
			)}
		</View>
	)
}

export default ActionIcons
