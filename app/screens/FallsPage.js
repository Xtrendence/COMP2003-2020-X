import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { globalColors, globalStyles, globalComponentStyles } from '../styles/global';
import { TopBar } from '../components/TopBar';
import Card from '../components/Card';

export const FallsPage = ({ navigation }) => {

	const [falls, setFalls] = React.useState();
	const [diary, setDiary] = React.useState({});

	return (
		<View>
			<TopBar navigation={navigation}>Recording Falls</TopBar>
			<ScrollView style={styles.cardContainer} contentContainerStyle={{paddingBottom: 20}}>
				<Card>
					<Text style={globalComponentStyles.cardTitle}>Today's Number of Falls</Text>
					<TextInput style={globalComponentStyles.inputField} placeholder="Number..." multiline={false} keyboardType="numeric" onChangeText={(value) => setFalls(value)} value={falls}></TextInput>
					<View style={styles.buttonWrapper}>
						<TouchableOpacity style={styles.actionButton} onPress={() => saveAnswer(1, answers[1])}>
							<Text style={styles.actionText}>Confirm</Text>
						</TouchableOpacity>
					</View>
				</Card>
				<Card>
					<Text style={globalComponentStyles.cardTitle}>Diary Entry</Text>
					<TextInput style={[globalComponentStyles.inputFieldMultiline,{height: 120}]} placeholder="..." multiline={true} onChangeText={(value) => setDiary({ ...diary, 1:value })} value={diary[1]}></TextInput>
					<View style={styles.buttonWrapper}>
						<TouchableOpacity style={styles.actionButton} onPress={() => saveAnswer(1, answers[1])}>
							<Text style={styles.actionText}>Save</Text>
						</TouchableOpacity>
					</View>
				</Card>
			</ScrollView>
		</View>
	);
}

function saveAnswer(key, value) {
	setLoading(true);
	setTimeout(() => {
		setLoading(false);
	}, 100);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: globalColors.mainSecond,
		width: "100%",
	},
	cardContainer: {
		width: "100%",
		height: "100%",
		paddingLeft: 20,
	},
	buttonWrapper: {
		width: "100%",
		marginTop: 15,
		justifyContent: "center",
		alignItems: "center"
	},
	actionButton: {
		backgroundColor: globalColors.accentDark,
		width: 80,
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