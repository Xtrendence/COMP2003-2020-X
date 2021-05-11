import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View, TouchableOpacity, Modal, Pressable, Alert, RefreshControl, Dimensions } from 'react-native';
import { globalColors, globalColorsDark, globalStyles, globalComponentStyles,  } from '../styles/global';
import { TopBar } from '../components/TopBar';
import Card from '../components/Card';
import LoadingScreen from '../components/LoadingScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { showMessage, hideMessage } from 'react-native-flash-message';
import { SettingsPopup } from '../components/SettingsPopup';

const screenWidth = Dimensions.get("window").width;
const screenHeight = Dimensions.get("window").height;

export class FallsPage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			falls: 0,
			diary: null,
			loading: false,
			settings: false,
			modalVisible: false
		};
		this.navigation = props.navigation;
	}

	setModalVisible = (visible) => {
		this.setState({ modalVisible: visible });
	}


	setSettings(page, value){
		page.setState({settings:value})
	}

	async saveFalls() {
		let token = await AsyncStorage.getItem("token");

		let patientID = await AsyncStorage.getItem("patientID");

		let endpoint = "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/public/api/falls/create.php?key=" + token;

		let body = { patientID:patientID, falls:this.state.falls};

		fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json", "Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
		.then(() => {
			this.setState({falls:0});
			showMessage({
				message: "Falls Confirmed",
				type: "success"
			})
		})
		.catch((error) => {
			console.log(error);
			showMessage({
				message: "Network Error",
				type: "danger"
			});
		});
	}

	async saveDiary() {
		let token = await AsyncStorage.getItem("token");

		let patientID = await AsyncStorage.getItem("patientID");

		let endpoint = "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/public/api/diary-entries/create.php?key=" + token;

		let body = { patientID:patientID, entry:this.state.diary};

		fetch(endpoint, {
			method: "POST",
			headers: {
				Accept: "application/json", "Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
		.then(() => { 
			this.setState({diary:null});
			showMessage({
				message: "Diary Saved",
				type: "success"
			})
		})
		.catch((error) => {
			console.log(error);
			showMessage({
				message: "Network Error",
				type: "danger"
			});
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
										<View style={[styles.radioView, styles[`radioView${this.state.theme}`]]} key={choiceKey}>
											<RadioButton.Item label={object[questionID]["choices"][choiceKey]} labelStyle={[styles.choiceText, styles[`choiceText${this.state.theme}`]]} value={object[questionID]["choices"][choiceKey]} uncheckedColor={globalColors.accentLight} style={styles.radioBlock} color={globalColors.accentLight}/>
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

	
	render() {
		const { modalVisible } = this.state;
		return (
			<View>
				{ this.state.loading &&
					<LoadingScreen>Loading...</LoadingScreen>
				}
				<TopBar navigation={this.navigation} settings={this.state.settings} setSettings={this.setSettings} page={this}>Recording Falls</TopBar>
				{ this.state.settings &&
                    <SettingsPopup></SettingsPopup> 
				}
				<ScrollView style={styles.cardContainer} contentContainerStyle={{paddingBottom: 20, paddingLeft: 20}}>
					<Card>
						<Text style={[globalComponentStyles.cardTitle, styles[`cardTitle${this.state.theme}`]]}>Today's Number of Falls</Text>
						<TextInput style={globalComponentStyles.inputField} placeholder="Number..." multiline={false} keyboardType="numeric" onChangeText={(value) => this.setState({falls:value})} value={this.state.falls.toString()}></TextInput>
						<View style={styles.buttonWrapper}>
							<TouchableOpacity style={styles.actionButton} onPress={() => this.saveFalls()}>
								<Text style={styles.actionText}>Confirm</Text>
							</TouchableOpacity>
						</View>
					</Card>
					<Card>
						<Text style={[globalComponentStyles.cardTitle, , styles[`cardTitle${this.state.theme}`]]}>Diary Entry</Text>
						<TextInput style={[globalComponentStyles.inputFieldMultiline,{height: 120}]} placeholder="..." multiline={true} onChangeText={(value) => this.setState({diary:value})} value={this.state.diary}></TextInput>
						<View style={styles.buttonWrapper}>
							<TouchableOpacity style={styles.actionButton} onPress={() => this.saveDiary()}>
								<Text style={styles.actionText}>Save</Text>
							</TouchableOpacity>
						</View>
					</Card>
					<View style={styles.diaryWrapper}>
						<TouchableOpacity style={styles.diaryButton} onPress={() => this.setModalVisible(true)}>
							<Text style={styles.actionText}>View Diary Entries</Text>
						</TouchableOpacity>
					</View>
					<View style={styles.centeredView}>
					<Modal
					animationType="slide"
					transparent={true}
					visible={modalVisible}
					onRequestClose={() => {
						Alert.alert("Modal has been closed.");
						this.setModalVisible(!modalVisible);}}>
					<View style={styles.centeredView}>
						<View style={styles.modalView}>
							<Text style={[globalComponentStyles.cardTitle, styles[`cardTitle${this.state.theme}`]]}>Diary Entries</Text>
								<View style={styles.buttonWrapper}>
									<Pressable style={styles.actionButton} onPress={() => this.setModalVisible(!modalVisible)}>
										<Text style={styles.textStyle}>Cancel</Text>
									</Pressable>
								</View>
							
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
					</View>
					</Modal>
				</View>
				</ScrollView>
			</View>
		);
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
	cardTitle: {
		color: globalColors.mainContrast
	},
	cardTitleDark: {
		color: globalColorsDark.mainContrast
	},
	TextColour: {
		color: globalColors.mainContrast
	},
	TextColourDark: {
		color: globalColorsDark.mainContrast
	},
	choiceText: {
		color: globalColors.mainContrast,
		width: "80%",
		overflow: "hidden"
	},
	choiceTextDark: {
		color: globalColorsDark.mainContrast
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
	diaryWrapper: {
		width: "95%",
		marginTop: 45,
		justifyContent: "center",
		alignItems: "center"
	},
	diaryButton: {
		backgroundColor: globalColors.accentDark,
		width: 110,
		height: 55,
		justifyContent: "center",
		borderRadius: globalStyles.borderRadius,
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
	radioView: {
		marginTop: 10,
		backgroundColor: globalColors.mainThird,
		borderRadius: globalStyles.borderRadius
	},
	radioViewDark: {
		backgroundColor: globalColorsDark.mainFourth,
	},
	radioBlock: {
		flexWrap: "wrap",
		alignItems: "center",
		flexDirection: "row",
		width: screenWidth - 60,
	},
	actionText: {
		fontFamily: globalStyles.fontFamily,
		fontSize: globalStyles.mediumFont,
		fontWeight: "bold",
		color: globalColors.accentContrast,
		textAlign: "center"
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
	  },
	  modalView: {
		backgroundColor: "white",
		width: "100%",
		height: "105%",
		alignItems: "center",
		shadowColor: "#000",
		shadowOffset: {
		  width: 0,
		  height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	  },
	  button: {
		borderRadius: 20,
		padding: 10,
		marginTop: "150%",
	  },
	  textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	  },
	  modalText: {
		marginBottom: 15,
		textAlign: "center"
	  },
	  inputFieldMultilineDark: {
		backgroundColor: globalColorsDark.mainThird,
		color: globalColorsDark.mainContrast
	}
});
