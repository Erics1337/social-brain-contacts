import React from "react"
import { View, TouchableOpacity } from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

type ActionIconsProps = {
	onCall: () => void
	onText: () => void
	onEmail: () => void
	callDisabled: boolean
	emailDisabled: boolean
	textDisabled: boolean
	toggleIcons: () => void
	iconsExpanded: boolean
}

const ActionIcons: React.FC<ActionIconsProps> = ({
	onCall,
	onText,
	onEmail,
	callDisabled,
	emailDisabled,
	textDisabled,
	toggleIcons,
	iconsExpanded,
}) => {
	return (
		<View className="flex-row items-center">
			{iconsExpanded && (
				<>
					{!callDisabled && (
						<TouchableOpacity
							onPress={onCall}
							className="p-1 m-1 rounded-full border border-gray-300"
							activeOpacity={0.7}
						>
							<MaterialIcons name="call" size={24} color="black" />
						</TouchableOpacity>
					)}
					{!textDisabled && (
						<TouchableOpacity
							onPress={onText}
							className="p-1 m-1 rounded-full border border-gray-300"
							activeOpacity={0.7}
						>
							<MaterialIcons name="message" size={24} color="black" />
						</TouchableOpacity>
					)}
					{!emailDisabled && (
						<TouchableOpacity
							onPress={onEmail}
							className="p-1 m-1 rounded-full border border-gray-300"
							activeOpacity={0.7}
						>
							<MaterialIcons name="email" size={24} color="black" />
						</TouchableOpacity>
					)}
				</>
			)}
			<TouchableOpacity
				onPress={toggleIcons}
				className="p-1 m-1 rounded border border-gray-300"
				activeOpacity={0.7}
			>
				<MaterialIcons name="menu" size={24} color="black" />
			</TouchableOpacity>
		</View>
	)
}

export default ActionIcons
