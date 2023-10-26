# Social Brain Contacts 🧠

![Supports Expo iOS](https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff)
![Supports Expo Android](https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff)
[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)

'Social Brain Contacts' is a react-native expo app that utilizes research in social brain theory to provide tools to users to group their phone contacts into bins. This app aims to help users manage and understand their social relationships better.

## About Social Brain Theory

Social Brain Theory suggests that human social networks have a layered structure where each individual has around 5 intimate relationships (e.g. romantic partners, best friends), 15 best friends, 50 good friends, 150 friends, and so on. These layers, sometimes referred to as 'Dunbar's Numbers', are thought to be cognitively constrained by the size of our brains. 'Social Brain Contacts' takes this research into account to provide users with tools to sort their contacts, helping them manage and reflect upon their social relationships.

## Key Features

- Built with TypeScript for type safety and easier debugging.
- Styled with Nativewind for a flexible, Tailwind-like styling solution.
- State managed by Zustand for an easy-to-use and efficient state management.
- Based on Expo SDK `49`
- Firebase JS SDK v9 for backend email authentication
- Custom and reusable components for ease of modifications and scalability
- Call, Text and Email linking with expo linking library
- Custom hook to toggle password field visibility on a TextInput for added user convenience
- Handles server errors using Formik for robust error management
- Login, Signup & Password Reset form built using Formik & yup
- Handles Forgot Password Reset using Firebase email method for user-friendly password resets
- Uses [Expo Vector Icons](https://icons.expo.fyi/) for visually appealing UI elements
- Uses [KeyboardAwareScrollView](https://github.com/APSL/react-native-keyboard-aware-scroll-view) package to handle keyboard appearance and automatically scrolls to focused TextInput for seamless user interaction
- Uses `dotenv` and `expo-constants` packages to manage environment variables securely


## Installation

1. Create a new project using the Social Brain Contacts template.

```bash
git clone https://github.com/erics1337/social-brain-contacts
```

2. create a `.env` file with your own configuration, e.g.:

```bash
# Rename this file to ".env" before use
# Replace XXXX's with your own Firebase config keys
API_KEY=XXXX
AUTH_DOMAIN=XXXX
PROJECT_ID=XXXX
STORAGE_BUCKET=XXXX
MESSAGING_SENDER_ID=XXXX
APP_ID=XXXX
```

4. Start the project:

- `yarn ios` -- open on iOS
- `yarn android` -- open on Android
- `npx expo start` -- start expo server

<!-- ## Screens

Main screens:

- Login
- Signup
- Forgot password
- Home

[Add Screenshots of 'Social Brain Contacts' here] -->

## Related Repositories

- [Social Brain Network](https://github.com/Erics1337/social-brain-network)


<strong>🌟 Built by [Eric Swanson]('https://ericsdevportfolio.com')</strong> using [Expo-firebase-starter](https://github.com/expo-community/expo-firebase-starter)
