import React from 'react'
import { Text } from 'react-native'

import { Colors } from '../config'

export const FormErrorMessage = ({ error, visible }) => {
	if (!error || !visible) {
		return null
	}

	return (
		<Text className='ml-4 text-red-500 text-lg my-2 font-semibold'>
			{error}
		</Text>
	)
}
