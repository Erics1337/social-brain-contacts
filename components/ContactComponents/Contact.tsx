import React, { useState } from 'react'
import {
	Text,
	View,
	TouchableWithoutFeedback,
	Platform,
	UIManager,
	LayoutAnimation,
} from 'react-native'
import Avatar from './Avatar'
import ActionIcons from './ActionIcons'
import { OverloadedExpoContact } from '../../types'

type ContactProps = {
	contact: OverloadedExpoContact
}

const Contact: React.FC<ContactProps> = ({ contact }) => {
	const firstName = contact.firstName ?? ''
	const lastName = contact.lastName ?? ''
	const initials = firstName[0] + lastName[0]

	const [showContextMenu, setShowContextMenu] = useState(false)

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
		if (Platform.OS === 'android') {
			UIManager.setLayoutAnimationEnabledExperimental &&
				UIManager.setLayoutAnimationEnabledExperimental(true)
			LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
		}
		setShowContextMenu(true)
	}

	const handleContextMenuClose = () => {
		if (Platform.OS === 'android') {
			UIManager.setLayoutAnimationEnabledExperimental &&
				UIManager.setLayoutAnimationEnabledExperimental(true)
			LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
		}
		setShowContextMenu(false)
	}

	return (
		<TouchableWithoutFeedback onLongPress={handleLongPress}>
			<View className='flex flex-row items-center justify-between p-4 border-b border-gray-200'>
				<Avatar initials={initials} />
				<Text className='text-lg font-bold ml-4'>{`${contact.firstName} ${contact.lastName}`}</Text>
				{showContextMenu && (
					<View className='absolute top-0 right-0 bg-white p-4 rounded shadow'>
						<ActionIcons
							onCall={handleCall}
							onText={handleText}
							onEmail={handleEmail}
							onClose={handleContextMenuClose}
						/>
					</View>
				)}
			</View>
		</TouchableWithoutFeedback>
	)
}

export default Contact
