import { NavigationContainer } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'

import AppStack from './AppStack'
import AuthStack from './AuthStack'
import { LoadingIndicator } from '../components'
import navigationTheme from './navigationTheme'
import { Text } from 'react-native'

const Routes: React.FC = () => {
	const [isLoading, setIsLoading] = useState(false)



	if (isLoading) {
		return <LoadingIndicator />
	}

	return (
		<NavigationContainer theme={navigationTheme}>
			<Text>Hello</Text>
		</NavigationContainer>
	)
}

export default Routes
