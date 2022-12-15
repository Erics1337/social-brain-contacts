import React, {
	createContext,
	useContext,
	useEffect,
	useMemo,
	useState,
} from 'react'
import * as Google from 'expo-google-app-auth'

import { auth } from '../firebase'
import {
	GoogleAuthProvider,
	onAuthStateChanged,
	signInWithCredential,
	signOut,
} from '@firebase/auth'
import * as RootNavigation from '../RootNavigation'

const AuthContext = createContext({})

const config = {
	androidClientId:
		'444431416975-qbtph9v7805ut6rpmi412a4ri11id08o.apps.googleusercontent.com',
	iosClientId:
		// hidestream
		'444431416975-pqp6v01eh8o8j9l575kqi7ukbln1afvv.apps.googleusercontent.com',
	scopes: ['profile', 'email'],
	permissions: ['public_profile', 'email', 'gender', 'location'],
}

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null)
	const [error, setError] = useState()
	const [loading, setLoading] = useState(false)
	const [loadingInitial, setLoadingInitial] = useState(true)

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth,  (user) => {
			console.log('user', user)
			// if (user) {
			// 	setUser(user)
			// } else {
			// 	setUser(null)
			// }
			setLoadingInitial(false)
		})
    return unsubscribe
	}, [])

	const signInWithGoogle = async () => {
		setLoading(true)

		await Google.logInAsync(config)
			.then(async (logInResult) => {
				if (logInResult.type === 'success') {
					const { idToken, accessToken } = logInResult
					const credential = GoogleAuthProvider.credential(
						idToken,
						accessToken
					)

					console.log('logInResult', logInResult.user)
					setUser(logInResult.user)
					await signInWithCredential(auth, credential)
				}
				return Promise.reject() // Or handle user cancelation separatedly
			})
			.catch((error) => setError(error))
			.finally(() => setLoading(false))
	}

	const logout = async () => {
		setLoading(true)

		await signOut(auth)
			.catch((error) => setError(error))
			.finally(() => {
				setLoading(false)
			})
	}

	// Make the provider update only when it should.
	// We only want to force re-renders if the user,
	// loading or error states change.
	//
	// Whenever the `value` passed into a provider changes,
	// the whole tree under the provider re-renders, and
	// that can be very costly! Even in this case, where
	// you only get re-renders when logging in and out
	// we want to keep things very performant.
	const memoedValue = useMemo(
		() => ({
			user,
			loading,
			error,
			signInWithGoogle,
			logout,
		}),
		[user, loading, error]
	)

	return (
		<AuthContext.Provider value={memoedValue}>
			{!loadingInitial && children}
		</AuthContext.Provider>
	)
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
	return useContext(AuthContext)
}
