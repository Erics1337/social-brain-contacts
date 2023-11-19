import { NavigationContainer } from '@react-navigation/native'
import React, { useContext, useEffect, useState } from 'react'

import AppStack from './AppStack'
import AuthStack from './AuthStack'
import useStore from '../store'
import { LoadingIndicator } from '../components'
import { auth } from '../config'
import navigationTheme from './navigationTheme'
import { syncContacts } from '../services/contactService'
import { onAuthStateChanged } from 'firebase/auth'
import AppIntroSliderScreen from '../components/AppIntroSlider'
import { CopilotProvider } from 'react-native-copilot'

const Routes: React.FC = () => {
	const { user, setUser, showIntroSlider, toggleIntroSlider } = useStore()
	const [isLoading, setIsLoading] = useState(true)
	const [appIntroDone, setAppIntroDone] = useState(true)

	useEffect(() => {
		const unsubscribeAuthStateChanged = onAuthStateChanged(
			auth,
			(authenticatedUser) => {
				authenticatedUser ? setUser(authenticatedUser) : setUser(null)
				setIsLoading(false)
			}
		)

		// Cleanup function
		return unsubscribeAuthStateChanged
	}, [])

	useEffect(() => {
		const syncPhoneContacts = async (userId: string) => {
			// On user authentication, sync phone contacts to the Firestore database
			await syncContacts(userId)
		}

		if (user) {
			syncPhoneContacts(user.uid)
		}
	}, [user])

	const style = {
		backgroundColor: '#9FA8DA',
		borderRadius: 10,
		paddingTop: 5,
	}

	const onAppIntroDone = () => {
		toggleIntroSlider()
		setAppIntroDone(true)
	}

	if (isLoading) {
		return <LoadingIndicator />
	}

	return (
		<NavigationContainer theme={navigationTheme}>
			{user ? (
				showIntroSlider ? (
					<AppIntroSliderScreen onDone={onAppIntroDone} />
				) : (
					<CopilotProvider overlay='svg' tooltipStyle={style}>
						<AppStack appIntroIsDone={appIntroDone} />
					</CopilotProvider>
				)
			) : (
				<AuthStack />
			)}
		</NavigationContainer>
	)
}

export default Routes
