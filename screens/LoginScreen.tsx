import { StackNavigationProp } from '@react-navigation/stack'
import React, { useState } from 'react'
import { Text } from 'react-native'
import { Formik, FormikProps } from 'formik'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { View, TextInput, Logo, Button, FormErrorMessage } from '../components'
import { Images, Colors, auth } from '../config'
import { useTogglePasswordVisibility } from '../hooks/useTogglePasswordVisibility'
import { AuthStackParamList } from '../types'
import { loginValidationSchema } from '../utils'


interface FormValues {
	email: string
	password: string
}

type Props = {
	navigation: StackNavigationProp<AuthStackParamList, 'Login'>
}

const LoginScreen: React.FC<Props> = ({ navigation }: Props) => {
	const [errorState, setErrorState] = useState('')
	const { passwordVisibility, handlePasswordVisibility, rightIcon } =
		useTogglePasswordVisibility()

	const handleLogin = (values: FormValues) => {
		const { email, password } = values
		signInWithEmailAndPassword(auth, email, password).catch((error) =>
			setErrorState(error.message)
		)
	}

	return (
		<React.Fragment>
			<View className='flex-1 bg-white'>
				<KeyboardAwareScrollView enableOnAndroid={true}>
					{/* LogoContainer: consists app logo and screen title */}
					<View className='items-center'>
						<Logo uri={Images.logo} />
						<Text className='text-4xl font-bold text-black pt-5'>
							Welcome back!
						</Text>
					</View>
					<Formik
						initialValues={{
							email: '',
							password: '',
						}}
						validationSchema={loginValidationSchema}
						onSubmit={handleLogin}>
						{({
							values,
							touched,
							errors,
							handleChange,
							handleSubmit,
							handleBlur,
						}: FormikProps<FormValues>) => (
							<React.Fragment>
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
									textContentType='password'
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
								{/* Display Screen Error Messages */}
								{errorState !== '' && (
									<FormErrorMessage
										error={errorState}
										visible={true}
									/>
								)}
								{/* Login button */}
								<Button
									style={{ backgroundColor: Colors.primary }}
									className='w-full justify-center items-center mt-2 p-4 rounded'
									onPress={handleSubmit}>
									<Text className='text-white text-lg font-bold'>
										Login
									</Text>
								</Button>
							</React.Fragment>
						)}
					</Formik>
					{/* Button to navigate to SignupScreen to create a new account */}
					<Button
						className='mt-4 items-center justify-center'
						borderless
						title={'Create a new account?'}
						onPress={() => navigation.navigate('Signup')}
					/>
					<Button
						className='mt-4 items-center justify-center'
						borderless
						title={'Forgot Password'}
						onPress={() => navigation.navigate('ForgotPassword')}
					/>
				</KeyboardAwareScrollView>
			</View>
		</React.Fragment>
	)
}

export default LoginScreen
