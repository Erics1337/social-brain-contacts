import React, { FC } from 'react'
import { Text } from 'react-native'

import { Colors } from '../config'

interface FormErrorMessageProps {
	error?: string
	visible: boolean
}

export const FormErrorMessage: FC<FormErrorMessageProps> = ({ error, visible }) => {
	if (!error || !visible) {
		return null
	}

	return (
		<Text
			style={{ color: Colors.red }}
			className='ml-4 text-lg my-2 font-semibold'>
			{error}
		</Text>
	)
}