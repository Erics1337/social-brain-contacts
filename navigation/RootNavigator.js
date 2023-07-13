import React, { useState, useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { onAuthStateChanged } from 'firebase/auth'

import AuthStack from './AuthStack'
import AppStack from './AppStack'
import { LoadingIndicator } from '../components'
import { auth } from '../config'
import { syncContacts } from '../services/contactService'
import useStore from '../store';

const RootNavigator = () => {
	const { user, setUser } = useStore()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		// Define your async function
		const fetchAuthStateAndSyncContacts = async () => {
			// onAuthStateChanged returns an unsubscriber
			const unsubscribeAuthStateChanged = onAuthStateChanged(
				auth,
				(authenticatedUser) => {
					authenticatedUser
						? setUser(authenticatedUser)
						: setUser(null)
            setIsLoading(false)
          }
          )
          
          // Wait until user is stored in state
          if (user) {
            // On user authentication, sync phone contacts to the Firestore database
            await syncContacts(user.uid)
          }

			// This function should return the cleanup function
			return unsubscribeAuthStateChanged
		}

		// Call your async function
		fetchAuthStateAndSyncContacts()
	}, [user]) // Or [] if effect doesn't need props or state

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