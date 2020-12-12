import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { globalColors, globalStyles, globalComponentStyles } from '../styles/global';
import { RadioButton } from 'react-native-paper';
import Card from '../components/Card';
import { TopBar } from '../components/TopBar';
import LoadingScreen from '../components/LoadingScreen';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export const QuestionsPage = ({ navigation }) => {
	const [recent, setRecent] = React.useState();
	const [unanswered, setUnanswered] = React.useState({});
	const [answered, setAnswered] = React.useState({});
	const [loading, setLoading] = React.useState(false);
	const [checked, setChecked] = React.useState({});
	const [answers, setAnswers] = React.useState({});

	useEffect(() => {
		getData();
	}, []);

	return (
		<View style={styles.container}>
			{ loading &&
				<LoadingScreen>Loading...</LoadingScreen>
			}
			<TopBar navigation={navigation}>Questions</TopBar>
			<ScrollView style={styles.cardContainer} contentContainerStyle={{paddingBottom: 20}}>
				{ !empty(recent) &&
					<View>
						{
							getCards(recent)
						}
						{ !empty(unanswered) &&
							<View style={styles.dividerWrapper}>
								<View style={styles.divider}></View>
							</View>
						}
					</View>
				}
				{ !empty(unanswered) &&
					<View>
						{
							getCards(unanswered)
						}
						{ !empty(answered) &&
							<View style={styles.dividerWrapper}>
								<View style={styles.divider}></View>
							</View>
						}
					</View>
				}
				{ !empty(answered) &&
					<View>
						{
							getCards(answered)
						}
					</View>
				}
			</ScrollView>
		</View>
	);

	function getCards(object) {
		return Object.keys(object).map(questionID => {
			return (
				<Card key={questionID}>
					<Text style={globalComponentStyles.cardTitle}>{ object[questionID]["question"] }</Text>
					{ object[questionID]["question_type"] === "choice" ?
						<RadioButton.Group onValueChange={value => saveChecked(questionID, value)} value={checked[questionID]}>
							{ 
								Object.keys(object[questionID]["choices"]).map(choiceKey => {
									return (
										<View style={styles.radioBlock} key={choiceKey}>
											<RadioButton value={object[questionID]["choices"][choiceKey]} uncheckedColor={globalColors.accentMedium} color={globalColors.accentMedium}/>
											<Text>{object[questionID]["choices"][choiceKey]}</Text>
										</View>
									);
								})
							}
						</RadioButton.Group>
					:
						<View>
							<TextInput style={globalComponentStyles.inputFieldMultiline} placeholder="Answer..." multiline={true} onChangeText={(value) => setAnswers({ ...answers, [questionID]:value })} value={answers[questionID]}></TextInput>
							<View style={styles.buttonWrapper}>
								<TouchableOpacity style={styles.actionButton} onPress={() => saveAnswer(questionID, answers[questionID])}>
									<Text style={styles.actionText}>Save</Text>
								</TouchableOpacity>
							</View>
						</View>
					}
				</Card>
			);
		});
	}
		
	function getData() {
		setLoading(true);
		fetch("https://www.xtrendence.com/tools/temp/data.php", {
			method: "GET",
			headers: {
				Accept: "application/json", "Content-Type": "application/json"
			}
		})
		.then((response) => {
			return response.json();
		})
		.then(async (json) => {
			setLoading(false);
			let questions = json.data;
			let recentQuestion = {};
			let unansweredQuestions = {};
			let answeredQuestions = {};
			let checkedChoices = {};
			let answeredFields = {};
			Object.keys(questions).map(key => {
				let question = questions[key];
				let questionID = question["questionID"];
				if (empty(question["answer"])) {
					Object.assign(unansweredQuestions, { [questionID]:question });
				} else {
					if (question["question_type"] === "choice") {
						Object.assign(checkedChoices, { [questionID]:question["answer"] });
					} else {
						Object.assign(answeredFields, { [questionID]:question["answer"] });
					}
					Object.assign(answeredQuestions, { [questionID]:question });
				}
			});
			let max = Math.max.apply(null, Object.keys(unansweredQuestions));
			Object.assign(recentQuestion, { [max]:unansweredQuestions[max] });
			delete unansweredQuestions[max];

			setRecent(recentQuestion);
			setUnanswered(unansweredQuestions);
			setAnswered(answeredQuestions);
			setChecked(checkedChoices);
			setAnswers(answeredFields);
		})
		.catch((error) => {
			console.log(error);
			setLoading(false);
			showMessage({
				message: "Network Error",
				type: "danger"
			});
		});
	}

	function saveChecked(key, value) {
		setChecked({ ...checked, [key]:value });
		getData();
		console.log("QuestionID: " + key);
		console.log("Answer: " + value);
	}

	function saveAnswer(key, value) {
		getData();
		console.log("QuestionID: " + key);
		console.log("Answer: " + value);
	}

	function empty(value) {
		if (value === null || typeof value === "undefined" || value.toString().trim() === "") {
			return true;
		}
		return false;
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
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
	radioBlock: {
		flexWrap: "wrap",
		alignItems: "center",
		flexDirection: "row",
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