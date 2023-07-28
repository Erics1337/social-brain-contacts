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

const Routes: React.FC = () => {
	const { user, setUser } = useStore()
	const [isLoading, setIsLoading] = useState(true)

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
		const syncPhoneContacts = async (userId) => {
			// On user authentication, sync phone contacts to the Firestore database
			await syncContacts(userId)
		}

		if (user) {
			syncPhoneContacts(user.uid)
		}
	}, [user])

	if (isLoading) {
		return <LoadingIndicator />
	}

	return (
		<NavigationContainer theme={navigationTheme}>
			{user ? <AppStack /> : <AuthStack />}
		</NavigationContainer>
	)
}

export default Routes
