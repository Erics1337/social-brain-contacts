import { Contact as ExpoContact } from 'expo-contacts'

export type AppStackParamList = {
	Home: undefined
	Sort: undefined
}

export type AuthStackParamList = {
	Welcome: undefined
	Login: undefined
	Signup: undefined
	ForgotPassword: undefined
}

export interface OverloadedExpoContact extends ExpoContact {
	bin?: string
}
