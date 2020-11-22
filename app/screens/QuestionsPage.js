import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { globalColors, globalStyles } from '../styles/global';
import { RadioButton } from 'react-native-paper';
import Card from '../components/Card';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const QuestionsPage = ({ navigation }) => {
	const [selected, setSelected] = React.useState({});

	return (
		<View style={styles.container}>
			<View style={styles.topBarPlaceholder}></View>
			<ScrollView style={styles.cardContainer} contentContainerStyle={{paddingBottom: 20}}>
				<Card>
					<Text style={styles.title}>Have you been getting more headaches?</Text>
					<RadioButton.Group onValueChange={value => setSelected({ ...selected, 0:value })} value={selected[0]}>
						<View style={styles.radioBlock}>
							<RadioButton value="No" uncheckedColor={globalColors.accentMedium} color={globalColors.accentMedium}/>
							<Text>No</Text>
						</View>
						<View style={styles.radioBlock}>
							<RadioButton value="Same" uncheckedColor={globalColors.accentMedium} color={globalColors.accentMedium}/>
							<Text>Same</Text>
						</View>
						<View style={styles.radioBlock}>
							<RadioButton value="Yes" uncheckedColor={globalColors.accentMedium} color={globalColors.accentMedium}/>
							<Text>Yes</Text>
						</View>
					</RadioButton.Group>
				</Card>
				<View style={styles.dividerWrapper}>
					<View style={styles.divider}></View>
				</View>
				<Card>
					<Text style={styles.title}>What did you have for lunch?</Text>
					<TextInput style={styles.inputField} placeholder="Answer..." multiline={true}></TextInput>
					<View style={styles.buttonWrapper}>
						<TouchableOpacity style={styles.actionButton}>
							<Text style={styles.actionText}>Save</Text>
						</TouchableOpacity>
					</View>
				</Card>
				<View style={styles.dividerWrapper}>
					<View style={styles.divider}></View>
				</View>
				<Card>
					<Text style={styles.title}>You feel more balance issues at night.</Text>
					<RadioButton.Group onValueChange={value => setSelected({ ...selected, 1:value })} value={selected[1]}>
						<View style={styles.radioBlock}>
							<RadioButton value="Disagree" uncheckedColor={globalColors.accentMedium} color={globalColors.accentMedium}/>
							<Text>Disagree</Text>
						</View>
						<View style={styles.radioBlock}>
							<RadioButton value="Somewhat Disagree" uncheckedColor={globalColors.accentMedium} color={globalColors.accentMedium}/>
							<Text>Somewhat Disagree</Text>
						</View>
						<View style={styles.radioBlock}>
							<RadioButton value="Neutral" uncheckedColor={globalColors.accentMedium} color={globalColors.accentMedium}/>
							<Text>Neutral</Text>
						</View>
						<View style={styles.radioBlock}>
							<RadioButton value="Somewhat Agree" uncheckedColor={globalColors.accentMedium} color={globalColors.accentMedium}/>
							<Text>Somewhat Agree</Text>
						</View>
						<View style={styles.radioBlock}>
							<RadioButton value="Agree" uncheckedColor={globalColors.accentMedium} color={globalColors.accentMedium}/>
							<Text>Agree</Text>
						</View>
					</RadioButton.Group>
				</Card>
				<Card>
					<Text style={styles.title}>What did you have for lunch?</Text>
					<TextInput style={styles.inputField} placeholder="Answer..." multiline={true}></TextInput>
					<View style={styles.buttonWrapper}>
						<TouchableOpacity style={styles.actionButton}>
							<Text style={styles.actionText}>Save</Text>
						</TouchableOpacity>
					</View>
				</Card>
			</ScrollView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: globalColors.mainSecond,
		width: "100%",
	},
	topBarPlaceholder: {
		backgroundColor: globalColors.accentLightest,
		width: "100%",
		height: 50,
	},
	cardContainer: {
		width: "100%",
		height: "100%",
		paddingLeft: 20,
	},
	dividerWrapper: {
		flex: 1,
		width: "100%",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: -20
	},
	divider: {
		width: screenWidth - 200,
		height: 4,
		backgroundColor: globalColors.accentLightest,
		marginTop: 20,
		borderRadius: globalStyles.borderRadius,
	},
	title: {
		fontSize: globalStyles.smallFont,
		fontWeight: "bold",
		color: globalColors.mainContrast,
		marginBottom: 10,
	},
	radioBlock: {
		flexWrap: "wrap",
		alignItems: "center",
		flexDirection: "row",
	},
	inputField: {
		backgroundColor: globalColors.mainThird,
		borderRadius: globalStyles.borderRadius,
		height: 60,
		padding: 10,
		textAlignVertical: "top",
	},
	buttonWrapper: {
		width: "100%",
		marginTop: 10,
		justifyContent: "center",
		alignItems: "flex-end"
	},
	actionButton: {
		backgroundColor: globalColors.accentDark,
		width: 70,
		height: 35,
		justifyContent: "center",
		borderRadius: globalStyles.borderRadius,
	},
	actionText: {
		fontSize: globalStyles.mediumFont,
		fontWeight: "bold",
		color: globalColors.accentContrast,
		textAlign: "center"
	},
});