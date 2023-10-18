import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

import React, { useState } from 'react'
import { Text } from 'react-native'
import { Formik, FormikValues } from 'formik'

import { sendPasswordResetEmail } from 'firebase/auth'

import { passwordResetSchema } from '../utils'
import { Colors, auth } from '../config'
import { View, TextInput, Button, FormErrorMessage } from '../components'

type AuthStackParamList = {
	Welcome: undefined
	Login: undefined
	Register: undefined
	ForgotPassword: undefined
}

type Props = {
	navigation: StackNavigationProp<AuthStackParamList, 'ForgotPassword'>
} & StackScreenProps<AuthStackParamList, 'ForgotPassword'>

const ForgotPasswordScreen: React.FC<Props> = ({ navigation }: Props) => {
	const [errorState, setErrorState] = useState('')

	const handleSendPasswordResetEmail = (values: FormikValues) => {
		const { email } = values

		sendPasswordResetEmail(auth, email)
			.then(() => {
				console.log('Success: Password Reset Email sent.')
				navigation.navigate('Login')
			})
			.catch((error) => setErrorState(error.message))
	}

	return (
		<View isSafe className='flex-1 bg-white px-3'>
			<View className='items-center'>
				<Text className='text-2xl font-bold text-black pt-5'>
					Reset your password
				</Text>
			</View>
			<Formik
				initialValues={{ email: '' }}
				validationSchema={passwordResetSchema}
				onSubmit={(values) => handleSendPasswordResetEmail(values)}>
				{({
					values,
					touched,
					errors,
					handleChange,
					handleSubmit,
					handleBlur,
				}) => (
					<>
						{/* Email input field */}
						<TextInput
							leftIconName='email'
							placeholder='Enter email'
							autoCapitalize='none'
							keyboardType='email-address'
							textContentType='emailAddress'
							value={values.email}
							onBlur={handleBlur('email')}
							rightIcon={undefined}
							handlePasswordVisibility={undefined}
							onChangeText={handleChange('email')}
						/>
						<FormErrorMessage
							error={errors.email}
							visible={touched.email}
						/>
						{/* Display Screen Error Mesages */}
						{errorState !== '' ? (
							<FormErrorMessage
								error={errorState}
								visible={true}
							/>
						) : null}
						{/* Password Reset Send Email  button */}
						<Button
							style={{ backgroundColor: Colors.primary }}
							className='w-full items-center justify-center mt-2 py-2 rounded-lg'
							onPress={handleSubmit}>
							<Text className='text-lg text-white font-bold'>
								Send Reset Email
							</Text>
						</Button>
					</>
				)}
			</Formik>
			{/* Button to navigate to Login screen */}
			<Button
				className='mt-4 items-center justify-center'
				borderless
				title={'Go back to Login'}
				onPress={() => navigation.navigate('Login')}
			/>
		</View>
	)
}

export default ForgotPasswordScreen
