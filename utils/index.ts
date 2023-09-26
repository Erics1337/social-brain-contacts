import * as Yup from 'yup'

// Yup Validation Schemas
export const loginValidationSchema = Yup.object().shape({
	email: Yup.string().required().email().label('Email'),
	password: Yup.string().required().min(6).label('Password'),
})

export const signupValidationSchema = Yup.object().shape({
	email: Yup.string().required().email().label('Email'),
	password: Yup.string().required().min(6).label('Password'),
	confirmPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Confirm Password must match password.')
		.required('Confirm Password is required.'),
})

export const passwordResetSchema = Yup.object().shape({
	email: Yup.string()
		.required('Please enter a registered email')
		.label('Email')
		.email('Enter a valid email'),
})

// Enums
export enum Category {
	EVERYONE = 'Everyone',
	INTIMATE = 'Close Intimates',
	BEST_FRIENDS = 'Best Friends',
	GOOD_FRIENDS = 'Good Friends',
	CASUAL_FRIENDS = 'Casual Friends',
	ACQUAINTANCES = 'Acquaintances',
	RECOGNIZABLE = 'Recognizable',
}
