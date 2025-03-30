# Social Brain Contacts 🧠

![Supports Expo iOS](https://img.shields.io/badge/iOS-4630EB.svg?style=flat-square&logo=APPLE&labelColor=999999&logoColor=fff)
![Supports Expo Android](https://img.shields.io/badge/Android-4630EB.svg?style=flat-square&logo=ANDROID&labelColor=A4C639&logoColor=fff)
[![runs with Expo Go](https://img.shields.io/badge/Runs%20with%20Expo%20Go-4630EB.svg?style=flat-square&logo=EXPO&labelColor=f3f3f3&logoColor=000)](https://expo.dev/client)

![alt text](assets/b97486ff-f3a0-42e3-8676-cccf2b783ae0.webp)


'Social Brain Contacts' is a react-native expo app that utilizes research in social brain theory to provide tools to users to group their phone contacts into bins. This app aims to help users manage and understand their social relationships better.

[Visit the product landing page](https://socialbraincontacts.com)

## Key Features

-   Built with TypeScript for type safety and easier debugging.
-   Styled with Nativewind for a flexible, Tailwind-like styling solution.
-   State managed by Zustand for an easy-to-use and efficient state management.
-   Based on Expo SDK `49`.
-   Firebase JS SDK v9 for backend email authentication.
-   Custom and reusable components for ease of modifications and scalability.
-   Call, Text, and Email linking with expo linking library.
-   Custom hook to toggle password field visibility on a TextInput for added user convenience.
-   Handles server errors using Formik for robust error management.
-   Login, Signup & Password Reset form built using Formik & yup.
-   Handles Forgot Password Reset using Firebase email method for user-friendly password resets.
-   Uses [Expo Vector Icons](https://icons.expo.fyi/) for visually appealing UI elements.
-   Uses components from [React Native Elements UI Library](https://reactnativeelements.com/)
-   Uses [KeyboardAwareScrollView](https://github.com/APSL/react-native-keyboard-aware-scroll-view) package to handle keyboard appearance and automatically scrolls to focused TextInput for seamless user interaction.
-   Uses [react-native-app-intro-slider](https://github.com/skv-headless/react-native-app-intro-slider) package for a beautiful intro screen.
-   Uses `dotenv` and `expo-constants` packages to manage environment variables securely.

## Installation

1. Create a new project using the Social Brain Contacts template.

```bash
git clone https://github.com/erics1337/social-brain-contacts
```

2. Create a `.env` file with your own configuration, e.g.:

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

3. Start the project:

-   `yarn ios` -- open on iOS.
-   `yarn android` -- open on Android.
-   `npx expo start` -- start expo server.

## 👏 Contributing
I would love your help! Contribute by forking the repo and opening pull requests. Please ensure that your code passes the existing tests and linting, and write tests to test your changes if applicable.

All pull requests should be submitted to the main branch.

## Design

Check out the design prototype for 'Social Brain Contacts' on Figma:
[Social Brain Contacts App Prototype Design](https://www.figma.com/file/UZaw6Vam45Rs8bSPh6yWyU/Social-Brain-Contacts-App-Prototype-Design?type=whiteboard&node-id=0%3A1&t=Z7ppYn1gaq09U1dT-1)

## Related Repositories

-   [Social Brain Network](https://github.com/Erics1337/social-brain-network)

<strong>🌟 Built by [Eric Swanson](https://ericsdevportfolio.com) using [Expo-firebase-starter](https://github.com/expo-community/expo-firebase-starter)</strong>
