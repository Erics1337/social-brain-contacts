const { Colors } = require('./config/theme.tsx')

module.exports = {
	content: [
		'./App.{js,jsx,ts,tsx}',
		'./screens/**/*.{js,jsx,ts,tsx}',
		'./components/**/*.{js,jsx,ts,tsx}',
	],
	theme: {
		extend: {
			colors: {
				primary: Colors.primary,
				secondary: Colors.secondary,
				black: Colors.black,
				white: Colors.white,
				ghostWhite: Colors.ghostWhite,
				lightGrey: Colors.lightGrey,
				mediumGrey: Colors.mediumGrey,
				red: Colors.red,
			},
		},
	},
	plugins: [],
}
