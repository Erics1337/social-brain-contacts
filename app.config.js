import 'dotenv/config'

export default {
	expo: {
		name: 'Social Brain Contacts',
		slug: 'social-brain-contacts',
		privacy: 'public',
		platforms: ['ios', 'android'],
		version: '1.0.0',
		orientation: 'portrait',
		icon: './assets/logo.png',
		splash: {
			image: './assets/splash.png',
			resizeMode: 'cover',
			backgroundColor: '#68c7ac',
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		assetBundlePatterns: ['**/*'],
		ios: {
			supportsTablet: true,
      bundleIdentifier: 'com.socialbrain.social-brain-contacts',
      buildNumber: '1'
		},
		extra: {
			eas: {
				projectId: '2adf681e-1e41-46b9-86c0-99a551bd1eb8',
			},
			apiKey: process.env.API_KEY,
			authDomain: process.env.AUTH_DOMAIN,
			projectId: process.env.PROJECT_ID,
			storageBucket: process.env.STORAGE_BUCKET,
			messagingSenderId: process.env.MESSAGING_SENDER_ID,
			appId: process.env.APP_ID,
		},
	},
}
