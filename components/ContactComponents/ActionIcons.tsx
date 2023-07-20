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
			<TouchableOpacity onPress={callDisabled ? onCall : () => {console.log('calling disabled');}}>
				<MaterialIcons name='call' size={24} color='black' />
			</TouchableOpacity>
			<TouchableOpacity onPress={textDisabled ? onText : () => {console.log('texting disabled');}}>
				<MaterialIcons name='message' size={24} color='black' />
			</TouchableOpacity>
			<TouchableOpacity onPress={emailDisabled ? onEmail : () => {console.log('email disabled')}}>
				<MaterialIcons name='email' size={24} color='black' />
			</TouchableOpacity>
		</View>
	)
}
export default ActionIcons
