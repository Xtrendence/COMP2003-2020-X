import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { globalColors, globalStyles } from '../styles/global';
import { RadioButton } from 'react-native-paper';
import Card from '../components/Card';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const QuestionsPage = ({ navigation }) => {
	const [checked, setChecked] = React.useState("");

	return (
		<View style={styles.container}>
			<View style={styles.topBarPlaceholder}></View>
			<Card>
				<Text style={styles.title}>Have you been getting more headaches?</Text>
				<RadioButton.Group onValueChange={value => setChecked(value)} value={checked}>
					<View style={styles.radioBlock}>
						<RadioButton
							value="No"
							uncheckedColor={globalColors.accentMedium}
							color={globalColors.accentMedium}
							style={styles.radio}
						/>
						<Text style={styles.label}>No</Text>
					</View>
					<View style={styles.radioBlock}>
						<RadioButton
							value="Same"
							uncheckedColor={globalColors.accentMedium}
							color={globalColors.accentMedium}
							style={styles.radio}
						/>
						<Text style={styles.label}>Same</Text>
					</View>
					<View style={styles.radioBlock}>
						<RadioButton
							value="Yes"
							uncheckedColor={globalColors.accentMedium}
							color={globalColors.accentMedium}
							style={styles.radio}
						/>
						<Text style={styles.label}>Yes</Text>
					</View>
				</RadioButton.Group>
			</Card>
			<View style={styles.divider}></View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: globalColors.mainSecond,
	},
	topBarPlaceholder: {
		backgroundColor: globalColors.accentLightest,
		width: "100%",
		height: 50,
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
	},
	radioBlock: {
		flexWrap: "wrap",
		alignItems: "center",
		flexDirection: "row",
	},
	radio: {

	},
	label: {

	}
});