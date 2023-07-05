import React from 'react'
import { Image } from 'react-native'

import { Images } from '../config'

export const Logo = ({ uri }) => {
	return <Image source={uri} className='w-48 h-48' />
}
