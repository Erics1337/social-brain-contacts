import 'dotenv/config'

export default {
	expo: {
		name: 'Social Brain Contacts',
		slug: 'social-brain-contacts',
		privacy: 'public',
		platforms: ['ios', 'android'],
		version: '1.0.34',
		orientation: 'portrait',
		icon: './assets/icon.png',
		splash: {
			image: './assets/splash.png',
			resizeMode: 'cover',
			backgroundColor: '#68c7ac',
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		assetBundlePatterns: ['**/*'],
		web: {
			bundler: 'metro',
		},
		ios: {
			supportsTablet: true,
			bundleIdentifier: 'com.socialbrain.social-brain-contacts',
			buildNumber: '1',
		},
		android: {
			package: 'com.socialbrain.social_brain_contacts',
			versionCode: 7,
			adaptiveIcon: {
				foregroundImage: './assets/icon.png',
				backgroundColor: '#68c7ac',
			},
		},
		extra: {
			eas: {
				projectId: 'a970fc0a-a63e-4fad-b845-7ce7dd42ab06',
			},
			apiKey: process.env.API_KEY,
			authDomain: process.env.AUTH_DOMAIN,
			projectId: process.env.PROJECT_ID,
			storageBucket: process.env.STORAGE_BUCKET,
			messagingSenderId: process.env.MESSAGING_SENDER_ID,
			appId: process.env.APP_ID,
		},
		plugins: [
			[
				'expo-contacts',
				{
					contactsPermission:
						'Allow Social Brain Contacts to access your contacts to group them into categories based on social brain theory. For example, you can organize your contacts into close friends, acquaintances, and distant connections. Contacts data is not stored on our servers and will remian private. Granting the app this access is neccesary for it to work properly.',
				},
			],
		],
	},
}
