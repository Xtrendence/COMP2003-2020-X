import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput, ScrollView, TouchableOpacity, BackHandler, RefreshControl } from 'react-native';
import { showMessage, hideMessage } from 'react-native-flash-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Notifier from '../utils/Notifier';
import { globalColors, globalColorsDark, globalStyles, globalComponentStyles } from '../styles/global';
import { RadioButton } from 'react-native-paper';
import Card from '../components/Card';
import { TopBar } from '../components/TopBar';
import LoadingScreen from '../components/LoadingScreen';
import { ThemeContext } from '../utils/ThemeProvider';
import { wait } from '../utils/Utils';
import { SettingsPopup } from '../components/SettingsPopup';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export class QuestionsPage extends Component {
	static contextType = ThemeContext;

	constructor(props) {
		super(props);
		this.state = {
			firstNavigator: true,
			refreshing: false,
			recent: null,
			unanswered: {},
			answered: {},
			loading: false,
			checked: {},
			custom: {},
			settings: false,
		};
		this.navigation = props.navigation;
		this._mounted;
		this.toggleTheme;
	}

	setSettings(page, value){
		page.setState({settings:value})
	}

	onRefresh = () => {
		this.setState({refreshing:true})
		this.getData();
		wait(750).then(() => this.setState({refreshing:false}));
	};

	// Save radio input answers.
	saveChecked(key, answerID, value) {
		if (this._mounted) {
			this.setState({checked:{ ...this.state.checked, [key]:value }});
		}
		this.saveAnswer(key, answerID, value);
	}

	// Save text field answers.
	saveCustom(key, answerID, value) {
		this.saveAnswer(key, answerID, value);
	}

	// Send a request to the /answers/ endpoint of the API to update an answer.
	async saveAnswer(questionID, answerID, answer) {		
		let patientID = await AsyncStorage.getItem("patientID");
		let key = await AsyncStorage.getItem("token");

		let endpoint;
		let method;
		let body;

		endpoint = "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/public/api/answers/update.php?key=" + key;
		method = "PUT";
		body = { patientID:patientID, questionID:questionID, answerID:answerID, answer:answer };

		if (this._mounted) {
			this.setState({loading:true});
		}
		
		fetch(endpoint, {
			method: method,
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
		.then(() => {
			setTimeout(() => {
				this.getData();
			}, 1000);
		})
		.catch((error) => {
			console.log(error);
			this.getData();
			showMessage({
				message: "Network Error",
				type: "danger"
			});
		});
	}

	// Generate the appropriate Card components given an object containing the questions asked by researchers, and the user's answers.
	getCards(object) {
		return Object.keys(object).map(questionID => {
			return (
				<Card key={questionID}>
					<Text style={[globalComponentStyles.cardTitle, styles[`cardTitle${this.state.theme}`]]}>{ object[questionID]["question"] }</Text>
					{ object[questionID]["question_type"] === "choice" ?
						<RadioButton.Group onValueChange={value => this.saveChecked(questionID, object[questionID]["answerID"], value)} value={this.state.checked[questionID]}>
							{ 
								Object.keys(object[questionID]["choices"]).map(choiceKey => {
									return (
										<View style={styles.radioBlock} key={choiceKey}>
											<RadioButton value={object[questionID]["choices"][choiceKey]} uncheckedColor={globalColors.accentMedium} color={globalColors.accentMedium}/>
											<Text style={[styles.choiceText, styles[`choiceText${this.state.theme}`]]}>{object[questionID]["choices"][choiceKey]}</Text>
										</View>
									);
								})
							}
						</RadioButton.Group>
					:
						<View>
							<TextInput style={[globalComponentStyles.inputFieldMultiline, styles[`inputFieldMultiline${this.state.theme}`]]} placeholder="Answer..." multiline={true} onChangeText={(value) => this.setState({custom:{ ...this.state.custom, [questionID]:value }})} value={this.state.custom[questionID]} placeholderTextColor={(this.state.theme === "Dark") ? globalColorsDark.mainPlaceholder : globalColors.mainPlaceholder}></TextInput>
							<View style={styles.buttonWrapper}>
								<TouchableOpacity style={styles.actionButton} onPress={() => this.saveCustom(questionID, object[questionID]["answerID"], this.state.custom[questionID])}>
									<Text style={styles.actionText}>Save</Text>
								</TouchableOpacity>
							</View>
						</View>
					}
				</Card>
			);
		});
	}

	// Fetch the user's questions and answers from the API.
	async getData() {
		let token = await AsyncStorage.getItem("token");

		let patientID = await AsyncStorage.getItem("patientID");

		let endpoint = "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/public/api/answers/read-user.php?id=" + patientID + "&key=" + token;

		if (this._mounted) {
			this.setState({loading:true});
		}

		fetch(endpoint, {
			method: "GET",
			headers: {
				Accept: "application/json", "Content-Type": "application/json"
			}
		})
		.then((response) => {
			return response.json();
		})
		.then(async (json) => {
			let recentQuestion = {};
			let unansweredQuestions = {};
			let answeredQuestions = {};
			let checkedChoices = {};
			let answeredFields = {};

			if ("data" in json) {
				let questions = json.data;
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

				// Since the keys of the unansweredQuestions object would be the questionIDs, and since questionIDs are incremented automatically, the highest one would always be the most recent question.
				if (Object.keys(unansweredQuestions).length > 0) {
					let max = Math.max.apply(null, Object.keys(unansweredQuestions));
					Object.assign(recentQuestion, { [max]:unansweredQuestions[max] });
					delete unansweredQuestions[max];
				}

				if (this._mounted) {
					this.setState({recent:recentQuestion});
					this.setState({unanswered:unansweredQuestions});
					this.setState({answered:answeredQuestions});
					this.setState({checked:checkedChoices});
					this.setState({custom:answeredFields});
				}
			}

			if (this._mounted) {
				this.setState({loading:false});
			}
		})
		.catch((error) => {
			console.log(error);
			if (this._mounted) {
				this.setState({loading:false});
			}
			showMessage({
				message: "Network Error",
				type: "danger"
			});
		});
	}

	componentDidUpdate() {
		AsyncStorage.getItem("theme").then(result => {
			if (result !== this.state.theme && (result === "Light" || result === "Dark")) {
				this.setState({theme:result});
			}
		}).catch(error => {
			console.log(error);
		});
	}

	componentDidMount() {
		this._mounted = true;

		const { theme, toggleTheme } = this.context;
		
		this.setState({theme:theme});
		this.toggleTheme = toggleTheme;

		this.getData();

		if (this._mounted) {
			this.setState({loading:true});
		}

		// By default, since the BottomBar NavigationContainer is a child of the StackNavigator, going back isn't possible unless the app's back action is overridden.
		const goBack = () => {
			if (this.state.firstNavigator) {
				this.navigation.dangerouslyGetParent().navigate("LoginPage");
				return true;
			} else {
				return false;
			}
		}

		this.navigation.addListener("focus", () => {
			this.getData();
			BackHandler.addEventListener("hardwareBackPress", goBack);
		});
		
		this.navigation.addListener("blur", () => {
			BackHandler.removeEventListener("hardwareBackPress", goBack);
		});
	}

	componentWillUnmount() {
		this._mounted = false;
	}

	render() {
		let notifier = new Notifier(
			onRegister.bind(this),
			onNotification.bind(this)
		);

		return (
			<View style={[styles.container, styles[`container${this.state.theme}`]]}>
				{ this.state.loading &&
					<LoadingScreen>Loading...</LoadingScreen>
				}
				<TopBar navigation={this.navigation} settings={this.state.settings} setSettings={this.setSettings} page={this}>Questions</TopBar>
				{ this.state.settings &&
                    <SettingsPopup></SettingsPopup> 
				}
				<ScrollView style={styles.cardContainer} contentContainerStyle={{paddingBottom: 20, paddingLeft: 20}} refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh}/>}>
					{ !empty(this.state.recent) &&
						<View>
							{
								this.getCards(this.state.recent)
							}
							{ !empty(this.state.unanswered) &&
								<View style={styles.dividerWrapper}>
									<View style={styles.divider}></View>
								</View>
							}
						</View>
					}
					{ !empty(this.state.unanswered) &&
						<View>
							{
								this.getCards(this.state.unanswered)
							}
							{ !empty(this.state.answered) &&
								<View style={styles.dividerWrapper}>
									<View style={styles.divider}></View>
								</View>
							}
						</View>
					}
					{ !empty(this.state.answered) &&
						<View>
							{
								this.getCards(this.state.answered)
							}
						</View>
					}
				</ScrollView>
			</View>
		);

		function onRegister(token) {
			let fcm = token.token;
		}

		function onNotification(notification) {
			notifier.localNotification(notification.title, notification.message);
			getData();
		}
	}
}

function empty(value) {
	if (typeof value === "object" && value !== null && Object.keys(value).length === 0) {
		return true;
	}
	if (value === null || typeof value === "undefined" || value.toString().trim() === "") {
		return true;
	}
	return false;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		backgroundColor: globalColors.mainSecond,
		width: "100%",
	},
	containerDark: {
		backgroundColor: globalColorsDark.mainThird
	},
	cardContainer: {
		width: "100%",
		height: "100%"
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
		fontFamily: globalStyles.fontFamily,
		fontSize: globalStyles.mediumFont,
		fontWeight: "bold",
		color: globalColors.accentContrast,
		textAlign: "center"
	},
	cardTitle: {
		color: globalColors.mainContrast
	},
	cardTitleDark: {
		color: globalColorsDark.mainContrast
	},
	choiceText: {
		color: globalColors.mainContrast
	},
	choiceTextDark: {
		color: globalColorsDark.mainContrast
	},
	inputFieldMultilineDark: {
		backgroundColor: globalColorsDark.mainThird,
		color: globalColorsDark.mainContrast
	}
});