import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack'

import React, { useState } from 'react'
import { Text } from 'react-native'
import { Formik } from 'formik'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { View, TextInput, Logo, Button, FormErrorMessage } from '../components'
import { Images, Colors, auth } from '../config'
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility'
import { signupValidationSchema } from '../utils'

import { AuthStackParamList } from '../types'
import { db } from '../config/firebase'
import { doc, setDoc } from 'firebase/firestore'
import { ActivityIndicator } from 'react-native'

type Props = {
	navigation: StackNavigationProp<AuthStackParamList, 'Signup'>
} & StackScreenProps<AuthStackParamList, 'Signup'>

const SignupScreen: React.FC<Props> = ({ navigation }: Props) => {
	const [errorState, setErrorState] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const {
		passwordVisibility,
		handlePasswordVisibility,
		rightIcon,
		handleConfirmPasswordVisibility,
		confirmPasswordIcon,
		confirmPasswordVisibility,
	} = useTogglePasswordVisibility()

	const handleSignup = async (values: {
		email: any
		password: any
		confirmPassword?: string
	}) => {
		const { email, password } = values
		setIsLoading(true) // Start loading
		try {
			const { user } = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			)
			if (user) {
				const userDoc = doc(db, 'users', user.uid)
				await setDoc(userDoc, {
					email,
				})
			}
		} catch (error: any) {
			setErrorState(error.message)
		} finally {
			setIsLoading(false) // Stop loading
		}
	}

	return (
		<View isSafe className='flex-1 bg-white px-3'>
			<KeyboardAwareScrollView enableOnAndroid={true}>
				{/* LogoContainer: consits app logo and screen title */}
				<View className='items-center'>
					<Logo uri={Images.logo} />
					<Text className='text-2xl font-bold text-black pt-5'>
						Create a new account!
					</Text>
				</View>
				{/* Formik Wrapper */}
				<Formik
					initialValues={{
						email: '',
						password: '',
						confirmPassword: '',
					}}
					validationSchema={signupValidationSchema}
					onSubmit={(values) => handleSignup(values)}>
					{({
						values,
						touched,
						errors,
						handleChange,
						handleSubmit,
						handleBlur,
					}) => (
						<>
							{/* Input fields */}
							<TextInput
								name='email'
								leftIconName='email'
								placeholder='Enter email'
								autoCapitalize='none'
								keyboardType='email-address'
								textContentType='emailAddress'
								autoFocus={true}
								value={values.email}
								onChangeText={handleChange('email')}
								onBlur={handleBlur('email')}
								rightIcon={undefined}
								handlePasswordVisibility={undefined}
							/>
							<FormErrorMessage
								error={errors.email}
								visible={touched.email}
							/>
							<TextInput
								name='password'
								leftIconName='key-variant'
								placeholder='Enter password'
								autoCapitalize='none'
								autoCorrect={false}
								secureTextEntry={passwordVisibility}
								textContentType='newPassword'
								rightIcon={rightIcon}
								handlePasswordVisibility={
									handlePasswordVisibility
								}
								value={values.password}
								onChangeText={handleChange('password')}
								onBlur={handleBlur('password')}
							/>
							<FormErrorMessage
								error={errors.password}
								visible={touched.password}
							/>
							<TextInput
								name='confirmPassword'
								leftIconName='key-variant'
								placeholder='Enter password'
								autoCapitalize='none'
								autoCorrect={false}
								secureTextEntry={confirmPasswordVisibility}
								textContentType='password'
								rightIcon={confirmPasswordIcon}
								handlePasswordVisibility={
									handleConfirmPasswordVisibility
								}
								value={values.confirmPassword}
								onChangeText={handleChange('confirmPassword')}
								onBlur={handleBlur('confirmPassword')}
							/>
							<FormErrorMessage
								error={errors.confirmPassword}
								visible={touched.confirmPassword}
							/>
							{/* Display Screen Error Mesages */}
							{errorState !== '' ? (
								<FormErrorMessage
									error={errorState}
									visible={true}
								/>
							) : null}
							{/* Signup button */}
							<Button
								className='w-full items-center justify-center mt-2 py-2 rounded-lg'
								style={{ backgroundColor: Colors.primary }}
								onPress={handleSubmit}
								disabled={isLoading} // Disable button while loading
							>
								{isLoading ? (
									<ActivityIndicator
										size='small'
										color='#FFF'
									/>
								) : (
									<Text className='text-lg text-white font-bold'>
										Signup
									</Text>
								)}
							</Button>
						</>
					)}
				</Formik>
				{/* Button to navigate to Login screen */}
				<Button
					className='mt-4 items-center justify-center'
					borderless
					title={'Already have an account?'}
					onPress={() => navigation.navigate('Login')}
				/>
			</KeyboardAwareScrollView>
		</View>
	)
}

export default SignupScreen
