import React from 'react'
import { View, Text, Image } from 'react-native'
import AppIntroSlider from 'react-native-app-intro-slider'
import useStore from '../store'
import { SlideGraphics } from '../config/images'

type Slide = {
	key: string
	title: string | null
	text: string
	backgroundColor: string
	graphic: any
}

const slides: Slide[] = [
	{
		key: 'slide1',
		title: 'Welcome to Social Brain Contacts!',
		text: 'Your solution for managing the complex web of social relations in your life.',
		backgroundColor: '#59b2ab',
		graphic: SlideGraphics.welcome, // Update path to actual graphic file
	},
	{
		key: 'slide2',
		title: 'Science-Based Social Networking.',
		text: 'Use science to make social media work with your biology, not against it.',
		backgroundColor: '#4332de',
		graphic: SlideGraphics.science, // Update path to actual graphic file
	},
	{
		key: 'slide3',
		title: 'What is Social Brain theory?',
		text: 'Social Brain Theory suggests that human social networks have a layered structure where each individual has around 5 intimate relationships (e.g. romantic partners, best friends), 15 best friends, 50 good friends, 150 friends, and so on.',
		backgroundColor: '#4caf50',
		graphic: SlideGraphics.theory, // Update path to actual graphic file
	},
	{
		key: 'slide4',
		title: null,
		text: "These layers, sometimes referred to as 'Dunbar's Numbers', are thought to be cognitively constrained by the size of our brains. 'Social Brain Contacts' takes this research into account to provide you with tools to sort your contacts, helping you manage and reflect upon your social relationships.",
		backgroundColor: '#4caf50',
		graphic: SlideGraphics.theory2, // Update path to actual graphic file
	},
	{
		key: 'slide5',
		title: 'Ready to get started?',
		text: "Let's take a look at how to navigate the app and get started managing your social relationships the way nature intended.",
		backgroundColor: '#824caf',
		graphic: SlideGraphics.letsgo, // Update path to actual graphic file
	},
]

const AppIntroSliderScreen = () => {
	const { toggleIntroSlider } = useStore()

	const renderItem = ({ item }: { item: Slide }) => (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: item.backgroundColor,
			}}>
			{item.graphic && (
				<Image source={item.graphic} className='w-40 h-40 p-2 m-5' />
			)}
			{item.title && (
				<Text className='text-white text-2xl font-bold text-center mb-4 p-2'>
					{item.title}
				</Text>
			)}
			<Text className='text-white text-base text-center px-2'>
				{item.text}
			</Text>
		</View>
	)

	const renderDoneButton = () => (
		<View className='bg-primary rounded-full px-4 py-2'>
			<Text className='text-white font-bold' onPress={toggleIntroSlider}>
				Done
			</Text>
		</View>
	)

	const renderNextButton = () => (
		<View className='bg-primary rounded-full px-4 py-2'>
			<Text className='text-white font-bold'>Next</Text>
		</View>
	)

	const renderPrevButton = () => (
		<View className='bg-primary rounded-full px-4 py-2'>
			<Text className='text-white font-bold'>Prev</Text>
		</View>
	)

	return (
		<AppIntroSlider
			data={slides}
			renderItem={renderItem}
			renderDoneButton={renderDoneButton}
			renderNextButton={renderNextButton}
			renderPrevButton={renderPrevButton}
		/>
	)
}

export default AppIntroSliderScreen
