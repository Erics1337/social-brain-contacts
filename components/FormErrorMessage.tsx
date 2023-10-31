import React, { FC } from 'react'
import { Text } from 'react-native'

import { Colors } from '../config'

interface FormErrorMessageProps {
	error?: any
	visible: boolean
}

const getFriendlyErrorMessage = (error: any): string => {
	// If the error is a string (from Yup validation), return it directly
	if (typeof error === 'string') {
		return error
	}

	// Else, assume it's a Firebase error object and extract the friendly message
	switch (error.code) {
		case 'auth/user-not-found':
			return 'User Not Found'
		case 'auth/wrong-password':
			return 'Incorrect Password'
		case 'auth/email-already-in-use':
			return 'Email Already in Use'
		// ... add more cases as needed
		default:
			return error.message // If the error code is not mapped, return the original message
	}
}

export const FormErrorMessage: FC<FormErrorMessageProps> = ({
	error,
	visible,
}) => {
	if (!error || !visible) {
		return null
	}

	const friendlyMessage = getFriendlyErrorMessage(error)

	return (
		<Text
			style={{ color: Colors.red }}
			className='ml-4 text-lg my-2 font-semibold'>
			{friendlyMessage}
		</Text>
	)
}
