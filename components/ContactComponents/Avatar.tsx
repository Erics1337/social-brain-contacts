import React from 'react'
import { Text, View } from 'react-native'

type AvatarProps = {
	initials: string
}

const Avatar: React.FC<AvatarProps> = ({ initials }) => {
	return (
		<View className='bg-gray-300 rounded-full w-12 h-12 flex items-center justify-center'>
			<Text className='text-lg font-bold'>{initials}</Text>
		</View>
	)
}
export default Avatar;