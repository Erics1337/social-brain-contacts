import React, { useState } from "react"
import { Text, View, TouchableOpacity } from "react-native"
import Avatar from "./Avatar"
import ActionIcons from "./ActionIcons"
import { OverloadedExpoContact } from "../../types"
import { openURL } from "expo-linking"
import { CategoriesModal } from "./CategoriesModal"

type ContactProps = {
	contact: OverloadedExpoContact
}

const Contact = React.memo(({ contact }: ContactProps) => {
	const firstName = contact.firstName ?? ""
	const lastName = contact.lastName ?? ""

	const getFullName = (firstName?: string, lastName?: string) => {
		return [firstName, lastName].filter(Boolean).join(" ")
	}

	const fullName = getFullName(contact.firstName, contact.lastName)

	const getInitials = (firstName?: string, lastName?: string) => {
		let initials = ""
		if (firstName && firstName.length > 0) {
			initials += firstName[0].toUpperCase()
		}
		if (lastName && lastName.length > 0) {
			initials += lastName[0].toUpperCase()
		}
		return initials
	}

	const initials = getInitials(firstName, lastName)

	const [isModalVisible, setIsModalVisible] = useState(false)
	const [iconsExpanded, setIconsExpanded] = useState(false)

	// Handlers
	const handleCall = () => {
		if (contact?.phoneNumbers?.[0]?.number) {
			openURL(`tel://+1${contact.phoneNumbers[0].number}`).catch((error) => {
				console.log(error)
			})
		}
	}

	const handleText = () => {
		if (contact?.phoneNumbers?.[0]?.number) {
			openURL(`sms://+1${contact.phoneNumbers[0].number}`).catch((error) => {
				console.log(error)
			})
		}
	}

	const handleEmail = () => {
		if (contact?.emails?.[0]?.email) {
			const email = contact.emails[0].email
			console.log("Email:", email) // Log the email
			openURL(`mailto:${email}`).catch((error) => {
				console.log(error)
			})
		} else console.log("no contact email found")
	}

	const handleLongPress = () => {
		setIsModalVisible(true) // Open modal for this specific contact
	}

	const handleCloseModal = () => {
		setIsModalVisible(false)
	}

	const toggleIcons = () => setIconsExpanded(!iconsExpanded)

	return (
		<TouchableOpacity activeOpacity={0.5} onLongPress={handleLongPress}>
			<View className="flex flex-row items-center justify-between p-4 border-b border-gray-200">
				<Avatar initials={initials} />
				<View className={`flex-1 mx-3 ${iconsExpanded ? "mr-2" : ""}`}>
					<Text className="text-lg font-bold ml-4">{fullName}</Text>
				</View>
				<ActionIcons
					onCall={handleCall}
					onText={handleText}
					onEmail={handleEmail}
					callDisabled={false}
					emailDisabled={!contact?.emails?.length}
					textDisabled={false}
					toggleIcons={toggleIcons}
					iconsExpanded={iconsExpanded}
				/>
				{isModalVisible && (
					<CategoriesModal contact={contact} onClose={handleCloseModal} />
				)}
			</View>
		</TouchableOpacity>
	)
})

export default Contact
