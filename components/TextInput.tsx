import React, { FC } from 'react'
import {
	TextInput as RNTextInput,
	TextInputProps as RNTextInputProps,
} from 'react-native'

import { View } from './View'
import { Icon } from './Icon'
import { Button } from './Button'
import { Colors } from '../config'

interface TextInputProps extends RNTextInputProps {
	width?: string
	leftIconName?: string
	rightIcon?: string
	handlePasswordVisibility?: () => void
}

export const TextInput: FC<TextInputProps> = ({
	width = '100%',
	leftIconName,
	rightIcon,
	handlePasswordVisibility,
	...otherProps
}) => {
	return (
		<View className='bg-white rounded-lg flex-row p-3 my-3 w-full border border-gray-400'>
			{leftIconName ? (
				<Icon
					name={leftIconName}
					size={22}
					color={Colors.mediumGray}
					className='mr-2.5 mt-2'
				/>
			) : null}
			<RNTextInput
				className='flex-grow w-full text-lg text-black'
				placeholderTextColor={Colors.mediumGray}
				{...otherProps}
			/>
			{rightIcon ? (
				<Button onPress={handlePasswordVisibility}>
					<Icon
						name={rightIcon}
						size={22}
						color={Colors.mediumGray}
						className='mr-2.5'
					/>
				</Button>
			) : null}
		</View>
	)
}

