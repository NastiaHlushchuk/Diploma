import { Dimensions } from 'react-native';

let screenHeight = Math.round(Dimensions.get('window').height);
let screenWidth = Math.round(Dimensions.get('window').width);

export const theme = {
	views: {
		common:
		{
			paddingTop: 20,
			height: "100%",
			width: "100%",
			backgroundColor: "#4f748e",
		},
		header: {
			paddingTop: 0,
			height: 50,
			backgroundColor: "#4f748e",
		},
		container: {
		},
		successMessage: {
			width: "100%",
			height: 40,
			backgroundColor: "#a3c80c",
			position: "absolute",
			borderRadius: 5,
			bottom: 0,
			left: 0,
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "center"
		},
		errorMessage: {
			width: "100%",
			height: 40,
			backgroundColor: "#a94442",
			position: "absolute",
			borderRadius: 5,
			bottom: 0,
			left: 0,
			alignItems: "center",
			flexDirection: "row",
			justifyContent: "center"
		},

		authCommon:
		{
			height: screenHeight-25,
			width: screenWidth,
			backgroundColor: "#fff",
		},
		authLogo: {
			height: 200,
			justifyContent: "center"
		},
		authForm: {
			height: screenHeight * 0.7,
			width: screenWidth * 0.9,
			alignSelf: 'center',
			flex: 1,
		},
		registerForm: {
			height: screenHeight * 0.8,
			width: screenWidth * 0.8,
			alignSelf: 'center',
			flex: 1,
		},
		titleField: {
			// marginTop: 10,
			height: 50,
		},
		inputField: {
			height: 70,
			width: "100%",
		},
		textField: {
			height: 120,
			width: "100%",
		},
		buttonsField: {
			height: 40,
			width: "100%",
			paddingHorizontal: 10,
		},
		flexed: {
			flex: 1,
			height: "100%",
			padding: 5,
		},
		tabs: {
			minHeight: screenHeight * 0.8
		},
		filters: {
			borderRadius: 0,
			height: screenHeight * 0.075,
			width: screenWidth,
			flexDirection: "row",
		},
		filter: {
			width: "50%",
			padding: 0,
		},
		total: {
			width: "70%",
			flexDirection: "row",
			justifyContent: "space-between",
			paddingHorizontal: 5,
			paddingVertical: 5,
			backgroundColor: "#a3c80c",
			borderRadius: 0,
		},
		weekButtons: {
			width: "15%",
		},
		hours: {
			paddingHorizontal: 10,
			paddingVertical: 5,
			backgroundColor: "#a3c80c",
			borderRadius: 5,
		},
		row: {
			flexDirection: "row",
			paddingHorizontal: 10,
			paddingVertical: 5,
			width: "100%",
		},
		menuItem: {
			height: 40,
			paddingVertical: 10
		},
		taskItem: {
			flexDirection: "row",
			paddingVertical: 10,
		},
		commonPadding: {
			paddingHorizontal: 10,
		},
		spaceBetween: {
			flexDirection: "row",
			justifyContent: "space-between",
		},
		space: {
			flexDirection: "row",
		},
		single: {
			paddingBottom: 5,
			paddingHorizontal: 15,
			borderBottomWidth: 1,
			borderColor: "#fac025",
		},
		noPadding: {
			paddingHorizontal: 0,
			paddingVertical: 0,
		},
		menuBlock: {
			height: "100%",
			width: "100%",
			backgroundColor: "#2e4453",
		},
		userBlock: {
			height: screenHeight * 0.15,
			borderBottomWidth: 1,
			borderColor: "#748494",
			alignItems: "center",
		},
		clockBlock: {
			height: screenHeight * 0.15,
			borderBottomWidth: 1,
			borderColor: "#748494",
		},
		buttonsBlock: {
			height: screenHeight * 0.7,
		},
		col2: {
			width: "16.6%",
		},
		col4: {
			width: "33.3%",
		},
		col6: {
			width: "50%",
		},
		col8: {
			width: "66.6%",
		},
		col10: {
			width: "83.3%",
		},
		rounded: {
			width: 50,
			height: 50,
			borderRadius: 50,
			backgroundColor: "green"
		},
		centered: {
			alignItems: "center",
			justifyContent: "center",
		},
		checkdays: {
			width: screenWidth / 7,
			height: 40,
		},
		customerRow: {
			borderBottomWidth: 1,
			borderColor: "#748494",
			padding: 5,
			flexDirection: "row",
		}
	},
	buttons: {
		signIn: {
			width: screenWidth * 0.35,
			backgroundColor: "#5a648a",
			height: 40,
			paddingHorizontal: 0,
		},
		forgotPassword: {
			backgroundColor: 'transparent',
			width: screenWidth * 0.4,
			height: 40,
			paddingHorizontal: 0,
			borderWidth:1,
		},
		start: {
			backgroundColor: "#a3c80c",
			paddingVertical: 5,
			paddingHorizontal: 5,
		},
		stop: {
			backgroundColor: "#f66254",
			paddingVertical: 5,
			paddingHorizontal: 5,
		},
		menuButton: {
			width: "100%",
			paddingHorizontal: 0,
		},
		settingsButton: {
			width: screenWidth * 0.25,
			marginLeft: 10,
			backgroundColor: "transparent",
			borderWidth: 1,
			borderColor: "#4caf50"
		},
		stageButton: {
			minWidth: screenWidth * 0.35,
			marginLeft: 10,
			backgroundColor: "transparent",
			borderWidth: 1,
			borderColor: "#748494",
		},
		saveButton: {
			backgroundColor: "#4f748e",
			borderColor: "#4f748e",
		},
	},
	icons: {
		signIn: {
			paddingHorizontal: 5,
		},
		eye: {
			paddingHorizontal: 0,
			paddingVertical: 0,
			margin:0
		},
		menuIcons: {
			paddingHorizontal: 5,
			color: "white",
		},
		stagesIcon: {
			paddingHorizontal: 10,
			color: "#748494",
			fontSize: 24,
		},
		linesIcon: {
			paddingHorizontal: 5,
			color: "#9bbe0c",
			fontSize: 14,
		}
	},
	titles: {
		successMessage: {
			height: 20,
			textAlign: "center",
			color: "#fff",
			fontSize: 14
		},
		labels: {
			color: "#748494",
			paddingHorizontal: 10,
			fontSize: 14,
		},
		customerTitle: {
			color: "#748494",
			fontSize: 16,
		},
		cancelTitle: {
			color: "#748494",
		},
		label: {
			padding: 0,
			fontSize: 14,
		},
		signIn: {
			textAlign: "center",
			color: "#748494",
		},
		tabs: {
			fontSize: 10,
			padding: 0,
			paddingHorizontal: 0,
			paddingVertical: 0,
			color: "black",
			backgroundColor: "#4f748e"
		},
		selectedTab: {
			fontSize: 16,
			padding: 0,
			paddingHorizontal: 0,
			color: "white",
			textAlign: "center"
		},
		tab_hours: {
			fontSize: 10,
			padding: 0,
			color: "yellow",
		},
		hours: {
			color: "white",
			fontSize: 16,
		},
		total: {
			color: "white",
			fontSize: 16,
		},
		bold: {
			fontWeight: "bold",
		},
		hexSize: {
			fontSize: 16,
			paddingRight: 5,
		},
		errorLabel: {
			padding: 0,
			margin: 0,
		},
		menuTitle: {
			fontSize: 16,
			color: "white",
		},
		iconLabel: {
			fontSize: 20,
			color: "white"
		},
		welcome: {
			fontSize: 18,
			color: "#c2d1db",
		},
		user: {
			fontSize: 18,
			fontWeight: "bold",
			color: "#748494",
		},
		sectionTitle: {
			fontSize: 18,
			color: "#748494",
			width: "100%",
			textAlign: "center"
		},
	},
	images: {
		LogoImage: {
			width: "100%",
			height: 35,
			resizeMode: 'contain'
		},
	},
	inputs: {
		signIn: {
			height: 25,
			minHeight: 25,
			padding: 0,
			margin: 0,
			fontSize: 14,
			paddingHorizontal: 10,
		},
		textInput: {
			padding: 0,
			margin: 0,
			fontSize: 14,
		},
		picker: {
			height: 25,
			fontSize: 14,
			borderBottomWidth: 1,
			paddingHorizontal: 0
		}
	},
	containers: {
		noPaddings: {
			padding: 0,
		},
		inputContainerStyle: {
			height: 30,
		},
		menuIcons: {
			width: "20%",
		},
		checkBoxes: {
			justifyContent: "center"
		},
		settingsButton: {

		},
		usersContainers: {
			width: 175,
			height: 30,
			borderWidth: 1
		},
	},
	checkBoxes: {
		workspace: {
			borderWidth: 0,
			backgroundColor: "transparent",
			padding: 0,
			margin: 0,
			marginLeft: 0,
			marginRight: 0,
		}
	}
}