export const globalColors = {
	accentLightest: "rgb(104,112,141)",
	accentLight: "rgb(95,103,129)",
	accentMedium: "rgb(78,84,106)",
	accentDark: "rgb(61,65,82)",
	accentDarkest: "rgb(43,47,59)",
	accentContrast: "rgb(255,255,255)",
	mainFirst: "rgb(255,255,255)",
	mainSecond: "rgb(245,245,245)",
	mainThird: "rgb(240,240,240)",
	mainFourth: "rgb(230,230,230)",
	mainFifth: "rgb(210,210,210)",
	mainSixth: "rgb(190,190,190)",
	mainContrast: "rgb(75,75,75)",
	mainPlaceholder: "rgb(150,150,150)",
};

export const globalColorsDark = {
	accentLightest: "rgb(77,89,138)",
	accentLight: "rgb(79,89,124)",
	accentMedium: "rgb(60,69,102)",
	accentDark: "rgb(52,57,82)",
	accentDarkest: "rgb(40,46,63)",
	accentContrast: "rgb(255,255,255)",
	mainFirst: "rgb(25,25,25)",
	mainSecond: "rgb(10,10,10)",
	mainThird: "rgb(35,35,35)",
	mainFourth: "rgb(45,45,45)",
	mainFifth: "rgb(65,65,65)",
	mainSixth: "rgb(85,85,85)",
	mainContrast: "rgb(200,200,200)",
	mainPlaceholder: "rgb(180,180,180)",
};

export const globalStyles = {
	shadowColor: "rgb(0,0,0)",
	shadowOffset: {
		width: 0,
		height: 2,
	},
	shadowOpacity: 0.25,
	shadowRadius: 3.84,
	shadowElevation: 5,
	borderRadius: 10,
	fontFamily: "Roboto",
	smallFont: 16,
	mediumFont: 18,
	bigFont: 20,
	bottomBarIconSize: 22,
	topBarIconSize: 20,
};

export const globalComponentStyles = {
	inputField: {
		backgroundColor: globalColors.mainThird,
		borderRadius: globalStyles.borderRadius,
		height: 40,
		padding: 10,
		textAlignVertical: "center",
	},
	inputFieldMultiline: {
		backgroundColor: globalColors.mainThird,
		borderRadius: globalStyles.borderRadius,
		height: 60,
		padding: 10,
		textAlignVertical: "top",
	},
	cardTitle: {
		fontFamily: globalStyles.fontFamily,
		fontSize: globalStyles.smallFont,
		fontWeight: "bold",
		color: globalColors.mainContrast,
		marginBottom: 10,
	},
}