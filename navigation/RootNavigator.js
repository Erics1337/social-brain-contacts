import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { onAuthStateChanged } from 'firebase/auth'

import AuthStack from './AuthStack'
import AppStack from './AppStack'
import { LoadingIndicator } from '../components'
import { auth } from '../config'
import { syncContacts } from '../services/contactService'
import useStore from '../store'

const RootNavigator = () => {
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
			if (user) {
				// On user authentication, sync phone contacts to the Firestore database
				await syncContacts(userId)
			}
		}

		if (user) {
			syncPhoneContacts(user.uid)
		}
	}, [user])

	if (isLoading) {
		return <LoadingIndicator />
	}

	return (
		<NavigationContainer>
			{user ? <AppStack /> : <AuthStack />}
		</NavigationContainer>
	)
}

export default RootNavigator
