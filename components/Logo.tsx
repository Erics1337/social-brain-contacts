import React, { FC } from 'react'
import { Image, ImageSourcePropType } from 'react-native'

import { Images } from '../config'

interface LogoProps {
	uri: ImageSourcePropType
}

export const Logo: FC<LogoProps> = ({ uri }) => {
	return <Image source={uri} style={{ width: 48, height: 48 }} />
}