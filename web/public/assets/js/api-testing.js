document.addEventListener("DOMContentLoaded", () => {
	const Notify = new XNotify("BottomRight");

	let apiKey;
	let apiKeyDuplicate;
	let apiURL;

	let apiInvalidKey = false;
	let apiAccess;

	let timeoutLimit = 12500; // Default: 12500
	let requestInterval = 750; // Default: 750

	let testsRan = 0;
	
	let yesterday = formatDateTime(new Date(new Date().setDate(new Date().getDate() - 1)));
	let tomorrow = formatDateTime(new Date(new Date().setDate(new Date().getDate() + 1)));

	let researcherLoginToken;
	let patientLoginToken;

	let researcherID1;
	let researcherID2;

	let researcher1 = {
		researcher_nhsRef: "9991111111",
		researcher_username: "testAdmin1",
		researcher_password: "testAdmin1",
		researcher_fName: "TestOne",
		researcher_lName: "AdminOne",
		researcher_tel: "01752766645",
		researcher_mobile: "07723619852",
		researcher_email: "testadmin1@gmail.com"
	};
	let researcher1login = {
		researcher_username: "testAdmin1",
		researcher_password: "testAdmin1"
	}
	let researcher2 = {
		researcher_nhsRef: "9991111112",
		researcher_username: "testAdmin2",
		researcher_password: "testAdmin2",
		researcher_fName: "TestTwo",
		researcher_lName: "AdminTwo",
		researcher_tel: "01752766646",
		researcher_mobile: "07723619822",
		researcher_email: "testadmin2@gmail.com"
	};
	let researcher2login = {
		researcher_username: "testAdmin2",
		researcher_password: "testAdmin2"
	}

	let diaryEntryID1;
	let diaryEntryID2;

	let diaryEntry1 = {
		patientID: null,
		entry: "Test entry 1"
	};
	let diaryEntry2 = {
		patientID: null,
		entry: "Test entry 2"
	};

	let fallID1;
	let fallID2;

	let fall1 = {
		patientID: null,
		falls: 2
	};

	let questionID1;
	let questionID2;

	let question1 = {
		patientID: null,
		question: "Was this for a test? Please explain.",
		question_type: "custom",
		question_charLim: 120
	};
	let question2 = {
		patientID: null,
		question: "Does the API like getting tested?",
		question_type: "choice",
		choices: ["No", "Maybe", "Yes"],
	};

	let answerID1;
	let answerID2;

	let answer2 = {
		patientID: null,
		answerID: null,
		answer: "It Has"
	};

	let patientID1;
	let patientID2;

	let patient1 = {
		researcherID: null,
		patient_nhsRef: "9991111113",
		patient_username: "testPatient1",
		patient_password: "testPatient1",
		patient_fName: "TestOne",
		patient_lName: "PatientOne",
		patient_dob: "2000/12/31 12:54:23",
		patient_addressI: "Test One Street",
		patient_addressII: "Test One Flat",
		patient_postcode: "TESTPC",
		patient_tel: "01752723645",
		patient_mobile: "07723619152",
		patient_email: "testpatient1@gmail.com",
		patient_comment: "Just the first patient for testing.",
	};
	let patient1login = {
		patient_username: "testPatient1",
		patient_password: "testPatient1",
		fcmToken: "-"
	}
	let patient2 = {
		researcherID: null,
		patient_nhsRef: "9991111114",
		patient_username: "testPatient2",
		patient_password: "testPatient2",
		patient_fName: "TestTwo",
		patient_lName: "PatientTwo",
		patient_dob: "2000/12/24 12:54:23",
		patient_addressI: "Test Two Street",
		patient_addressII: "Test Two Flat",
		patient_postcode: "TESTZC",
		patient_tel: "01721723645",
		patient_mobile: "07513619152",
		patient_email: "testpatient2@gmail.com",
		patient_comment: "Just the second patient for testing.",
	};
	let patient2login = {
		patient_username: "testPatient2",
		patient_password: "testPatient2",
		fcmToken: "-"
	}

	let inputUserUsername = document.getElementById("user-username");
	let inputUserPassword = document.getElementById("user-password");

	let inputURL = document.getElementById("api-url");
	let inputKey = document.getElementById("api-key");

	let inputAdminUsername = document.getElementById("admin-username");
	let inputAdminPassword = document.getElementById("admin-password");

	let buttonClear = document.getElementById("clear-button");
	let buttonResults = document.getElementById("results-button");
	let buttonTest = document.getElementById("test-button");
	let buttonBack = document.getElementById("back-button");

	let divOutput = document.getElementById("output");
	let divResultsWrapper = document.getElementById("results-wrapper");
	let divResultsList = document.getElementById("results-list");

	buttonClear.addEventListener("click", () => {
		window.location.reload();
	});

	buttonTest.addEventListener("click", async () => {
		if (!buttonTest.classList.contains("disabled")) {
			apiURL = inputURL.value;
			if (apiURL.substr(apiURL.length - 1) !== "/") {
				apiURL = apiURL + "/";
			}

			if ((empty(inputUserUsername.value) && empty(inputUserPassword.value)) && (empty(inputAdminUsername.value) && empty(inputAdminPassword.value))) {
				let url = new URL(window.location.href);
				let key = url.searchParams.get("key");
				if (empty(key)) {
					apiKey = empty(inputKey.value) ? window.prompt("Login credentials not entered. Do you have an API key already?") : inputKey.value;
				} else {
					apiKey = key;
				}
			}
		
			if ((!empty(inputUserUsername.value) && !empty(inputAdminUsername.value)) || (!empty(inputUserPassword.value) && !empty(inputAdminPassword.value))) {
				Notify.error({
					title: "Error",
					description: "The API can't be tested as an admin and user at the same time."
				});
			}

			if ((!empty(inputUserUsername.value) && !empty(inputUserPassword.value)) && (empty(inputAdminUsername.value) && empty(inputAdminPassword.value))) {
				await loginUser(inputUserUsername.value, inputUserPassword.value).catch(e => {
					Notify.error({
						title: "Error",
						description: e
					});
				});
			}

			if ((empty(inputUserUsername.value) && empty(inputUserPassword.value)) && (!empty(inputAdminUsername.value) && !empty(inputAdminPassword.value))) {
				await loginAdmin(inputAdminUsername.value, inputAdminPassword.value).catch(e => {
					Notify.error({
						title: "Error",
						description: e
					});
				});
			}

			attemptStart();
		}
	});

	buttonResults.addEventListener("click", () => {
		if (divResultsWrapper.classList.contains("hidden")) {
			divResultsWrapper.classList.remove("hidden");
			document.getElementsByClassName("top")[0].classList.add("hidden");
			divOutput.classList.add("hidden");
		} else {
			divResultsWrapper.classList.add("hidden");
			document.getElementsByClassName("top")[0].classList.remove("hidden");
			divOutput.classList.remove("hidden");
		}
	});

	buttonBack.addEventListener("click", () => {
		divResultsWrapper.classList.add("hidden");
		document.getElementsByClassName("top")[0].classList.remove("hidden");
		divOutput.classList.remove("hidden");
	});

	function loginUser(username, password) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			
			xhr.addEventListener("readystatechange", () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (validJSON(xhr.responseText)) {
						let response = JSON.parse(xhr.responseText);

						if (response.valid) {
							apiKey = response.token;

							console.log(apiKey);

							Notify.success({
								title: "Success",
								description: "You are now logged in as a user."
							});

							patientID1 = response.patientID;
							patientID2 = 3;

							log("success", "Logged In As User");

							resolve();
						} else {
							reject("Login failed.");
						}
					} else {
						reject("Invalid JSON.");
					}
				}
			});

			xhr.open("POST", apiURL + "users/login.php", true);
			xhr.send(JSON.stringify({ patient_username:username, patient_password:password, fcmToken:"-" }));
		});
	}

	function loginAdmin(username, password) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			
			xhr.addEventListener("readystatechange", () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (validJSON(xhr.responseText)) {
						let response = JSON.parse(xhr.responseText);

						if (response.valid) {
							apiKey = response.token;

							console.log(apiKey);

							Notify.success({
								title: "Success",
								description: "You are now logged in as an admin."
							});

							log("success", "Logged In As Admin");

							resolve();
						} else {
							reject("Login failed.");
						}
					} else {
						reject("Invalid JSON.");
					}
				}
			});

			xhr.open("POST", apiURL + "admins/login.php", true);
			xhr.send(JSON.stringify({ researcher_username:username, researcher_password:password }));
		});
	}

	function attemptStart() {
		if (empty(apiKey)) {
			Notify.error({
				title: "Error",
				description: "The API cannot be tested without an API key, or login credentials."
			});
		} else {
			runTests();
		}
	}

	async function runTests() {
		try {
			console.log("Starting Tests...");

			buttonTest.classList.add("disabled");
			buttonTest.textContent = "Testing... (0%)";

			divOutput.innerHTML = "";

			apiKeyDuplicate = apiKey;

			if (apiKey.includes("user")) {
				log("alert", "Using User Token");
				apiAccess = "user";
			} else if (apiKey.includes("admin")) {
				log("alert", "Using Admin Token");
				apiAccess = "admin";
			} else {
				log("alert", "Using Development Token");
				apiAccess = "admin";
			}

			await adminsCreate(researcher1).catch(e => {
				handleError(e);
			});
			await adminsCreate(researcher2).catch(e => {
				handleError(e);
			});

			await adminsLogin(researcher1login).then(response => {
				researcherLoginToken = response.token;
				researcherID1 = response.researcherID;
				console.log("Researcher ID 1: " + researcherID1);
				if (!empty(researcherLoginToken)) {
					console.log("Researcher Login Token 1: " + researcherLoginToken);
					apiKey = researcherLoginToken;
				}
			}).catch(e => {
				handleError(e);
			});

			await adminsLogin(researcher2login).then(response => {
				researcherID2 = response.researcherID;
				console.log("Researcher ID 2: " + researcherID2);
				console.log("Researcher Login Token 2: " + response.token);
			}).catch(e => {
				handleError(e);
			});

			await adminsRead(researcherID1).catch(e => {
				handleError(e);
			});

			researcher1.researcher_fName = "NewAdminFName1";
			researcher1.researcher_lName = "NewAdminLName1";

			await adminsUpdate(researcher1).catch(e => {
				handleError(e);
			});

			await adminsReadRange(parseInt(researcherID1) - 2, parseInt(researcherID2) + 2).catch(e => {
				handleError(e);
			});

			await adminsLogout({ researcherID:researcherID1 }).catch(e => {
				handleError(e);
			});

			await adminsRead(researcherID1).catch(e => {
				handleError(e);
			});

			buttonTest.textContent = "Testing... (20%)";

			apiKey = apiKeyDuplicate;

			patient1.researcherID = researcherID1;
			patient2.researcherID = researcherID2;

			await usersCreate(patient1).catch(e => {
				handleError(e);
			});
			await usersCreate(patient2).catch(e => {
				handleError(e);
			});

			if (empty(patientID1)) {
				await usersLogin(patient1login).then(response => {
					patientID1 = response.patientID;
					console.log("Patient ID 1: " + patientID1);
					console.log("Patient Login Token 1: " + response.token);
				}).catch(e => {
					handleError(e);
				});
				await usersLogin(patient2login).then(response => {
					patientID2 = response.patientID;
					console.log("Patient ID 2: " + patientID2);
					console.log("Patient Login Token 2: " + response.token);
				}).catch(e => {
					handleError(e);
				});
			}

			diaryEntry1.patientID = patientID1;
			diaryEntry2.patientID = patientID1;

			await diaryEntriesCreate(diaryEntry1).catch(e => {
				handleError(e);
			});
			await diaryEntriesCreate(diaryEntry2).catch(e => {
				handleError(e);
			});

			await diaryEntriesReadDate(patientID1, yesterday, tomorrow).then(response => {
				let ids = Object.keys(response.data);
				let id1 = ids[ids.length - 2];
				let id2 = ids[ids.length - 1];
				diaryEntryID1 = response.data[id1].entryID;
				diaryEntryID2 = response.data[id2].entryID;
				console.log("Diary Entry ID 1: " + diaryEntryID1);
				console.log("Diary Entry ID 2: " + diaryEntryID2);
			}).catch(e => {
				handleError(e);
			});

			diaryEntry1.entryID = diaryEntryID1;
			diaryEntry1.entry = "Updated diary entry 1 for testing.";

			diaryEntry2.entryID = diaryEntryID2;

			await diaryEntriesUpdate(diaryEntry1).catch(e => {
				handleError(e);
			});

			await diaryEntriesReadAll().catch(e => {
				handleError(e);
			});

			await diaryEntriesDelete({ patientID:patientID1, entryID:diaryEntryID1 }).catch(e => {
				handleError(e);
			});

			await diaryEntriesRead(patientID1, diaryEntryID2).catch(e => {
				handleError(e);
			});

			await diaryEntriesReadDate(patientID1, yesterday, tomorrow).catch(e => {
				handleError(e);
			});

			await diaryEntriesReadUser(patientID1).catch(e => {
				handleError(e);
			});

			await diaryEntriesDelete({ patientID:patientID1, entryID:diaryEntryID2 }).catch(e => {
				handleError(e);
			});

			await diaryEntriesReadUser(patientID1).catch(e => {
				handleError(e);
			});

			buttonTest.textContent = "Testing... (40%)";

			fall1.patientID = patientID1;

			await fallsCreate(fall1).catch(e => {
				handleError(e);
			});

			await fallsReadDate(patientID1, yesterday, tomorrow).then(response => {
				let ids = Object.keys(response.data);
				let id1 = ids[ids.length - 2];
				let id2 = ids[ids.length - 1];
				fallID1 = response.data[id1].fallID;
				fallID2 = response.data[id2].fallID;
				console.log("Fall ID 1: " + fallID1);
				console.log("Fall ID 2: " + fallID2);
			}).catch(e => {
				handleError(e);
			});

			await fallsReadAll().catch(e => {
				handleError(e);
			});

			await fallsDelete({ fallID:fallID1 }).catch(e => {
				handleError(e);
			});

			await fallsReadUser(patientID1).catch(e => {
				handleError(e);
			});
			
			await fallsRead(fallID2).catch(e => {
				handleError(e);
			});

			await fallsDelete({ fallID:fallID2 }).catch(e => {
				handleError(e);
			});

			buttonTest.textContent = "Testing... (60%)";

			question1.patientID = patientID1;
			question2.patientID = patientID1;

			await questionsCreate(question1).catch(e => {
				handleError(e);
			});
			await questionsCreate(question2).catch(e => {
				handleError(e);
			});

			await answersReadAll().then(response => {
				let ids = Object.keys(response.data);
				let id1 = ids[ids.length - 2];
				let id2 = ids[ids.length - 1];
				answerID1 = response.data[id1].answerID;
				answerID2 = response.data[id2].answerID;
				questionID1 = response.data[id1].questionID;
				questionID2 = response.data[id2].questionID;
				question1.questionID = questionID1;
				question2.questionID = questionID2;
				console.log("Question ID 1: " + questionID1);
				console.log("Question ID 2: " + questionID2);
				console.log("Answer ID 1: " + answerID1);
				console.log("Answer ID 2: " + answerID2);
			}).catch(e => {
				handleError(e);
			});

			await questionsReadAll().catch(e => {
				handleError(e);
			});

			question1.question = "Has the question changed for the test?";

			await questionsUpdate(question1).catch(e => {
				handleError(e);
			});

			await questionsReadRange(parseInt(questionID1) - 2, parseInt(questionID1) + 2).catch(e => {
				handleError(e);
			});

			question2.question = "Has the other question changed for another test?";
			question2.choices = ["It Hasn't", "It Has"];

			await questionsUpdate(question2).catch(e => {
				handleError(e);
			});

			await answersReadUser(patientID1).catch(e => {
				handleError(e);
			});
			await answersRead(answerID2).catch(e => {
				handleError(e);
			});

			answer2.patientID = patientID1;
			answer2.answerID = answerID2;

			await answersUpdate(answer2).catch(e => {
				handleError(e);
			});

			await answersRead(answerID2).catch(e => {
				handleError(e);
			});

			await questionsDelete({ questionID:questionID2 }).catch(e => {
				handleError(e);
			});

			await questionsRead(questionID1).catch(e => {
				handleError(e);
			});

			await questionsRead(questionID2).catch(e => {
				handleError(e);
			});

			await questionsDelete({ questionID:questionID1 }).catch(e => {
				handleError(e);
			});

			buttonTest.textContent = "Testing... (80%)";

			await usersReadRange(parseInt(patientID1) - 2, parseInt(patientID2) + 2).catch(e => {
				handleError(e);
			});

			patient1.patient_fName = "ChangedFName";
			patient1.patient_lName = "ChangedLName";

			await usersUpdate(patient1).catch(e => {
				handleError(e);
			});

			await usersReadRange(parseInt(patientID1) - 2, parseInt(patientID2) + 2).catch(e => {
				handleError(e);
			});
				
			await usersDelete({ patientID:patientID2 }).catch(e => {
				handleError(e);
			});

			await usersReadAll().catch(e => {
				handleError(e);
			});

			await usersRead(patientID1).catch(e => {
				handleError(e);
			});

			await usersRead(patientID2).catch(e => {
				handleError(e);
			});
			
			await usersLogout({ patientID:patientID1 }).catch(e => {
				handleError(e);
			});

			apiKey = patientLoginToken;

			await usersRead(patientID1).catch(e => {
				handleError(e);
			});

			apiKey = apiKeyDuplicate;

			await usersDelete({ patientID:patientID1 }).catch(e => {
				handleError(e);
			});

			await usersRead(patientID1).catch(e => {
				handleError(e);
			});

			buttonTest.textContent = "Testing... (90%)";

			await adminsDelete({ researcherID:researcherID1 }).catch(e => {
				handleError(e);
			});

			await adminsRead(researcherID1).catch(e => {
				handleError(e);
			});

			await adminsDelete({ researcherID:researcherID2 }).catch(e => {
				handleError(e);
			});
		
			await adminsReadAll().catch(e => {
				handleError(e);
			});
			
			console.log("Testing Finished.");

			await generateResults().catch(e => {
				console.log(e);
				handleError("Results Generation Failed.");
			});

			buttonTest.textContent = "Finished Testing";

			buttonResults.classList.remove("disabled");
		} catch(e) {
			console.log(e);
		}
	}

	function generateResults() {
		return new Promise((resolve, reject) => {
			try {
				let results = [];
				let endpoints = [];

				let tests = document.getElementsByClassName("test-card");
				for (let i = 0; i < tests.length; i++) {
					let test = tests[i];
					let result = test.getElementsByTagName("textarea")[0].value;
					if (i === 0) {
						if (result.includes("Invalid API key") && apiAccess === "admin") {
							apiInvalidKey = true;
						}
					}
					if (i === 11) {
						if (result !== "" && apiAccess === "user") {
							apiInvalidKey = true;
						}
					}
					results.push(result);
					endpoints.push(test.getElementsByClassName("info")[0].textContent);
				}

				if (apiInvalidKey) {
					let valid = true;
					let issues = [];
					for (let i = 0; i < results.length; i++) {
						if (!results[i].includes("valid\":false") && !results[i].includes("Invalid API key")) {
							valid = false;
							issues.push(i + 1);
						}
					}
					if (valid) {
						console.log("API functioning as expected.");
						divResultsList.innerHTML = '<span class="success">API functioning as expected.</span>';
					} else {
						console.log("Mismatch between expected results and actual ones.");
						divResultsList.innerHTML = '<span class="error">Mismatch between expected and actual results.</span>';
						issues.map(issue => {
							let test = document.getElementById("test-number-" + issue).parentElement;
							let endpoint = test.getElementsByClassName("info")[0];
							divResultsList.innerHTML += '<span class="info">' + endpoint.textContent + '</span>';
						});
					}
				} else {
					valid = true;
					let issues = [];

					if (apiAccess === "user") {
						if (!results[0].includes("Invalid API key")) {
							valid = false;
							issues.push(1);
						}
						if (!results[1].includes("Invalid API key")) {
							valid = false;
							issues.push(2);
						}
						if (!results[2].includes("valid\":false")) {
							valid = false;
							issues.push(3);
						}
						if (!results[3].includes("valid\":false")) {
							valid = false;
							issues.push(4);
						}
						if (!results[4].includes("Invalid API key")) {
							valid = false;
							issues.push(5);
						}
						if (!results[5].includes("Invalid API key")) {
							valid = false;
							issues.push(6);
						}
						if (!results[6].includes("Invalid API key")) {
							valid = false;
							issues.push(7);
						}
						if (!results[7].includes("Invalid API key")) {
							valid = false;
							issues.push(8);
						}
						if (!results[8].includes("Invalid API key")) {
							valid = false;
							issues.push(9);
						}
						if (!results[9].includes("Invalid API key")) {
							valid = false;
							issues.push(10);
						}
						if (!results[10].includes("Invalid API key")) {
							valid = false;
							issues.push(11);
						}
						if (results[11] !== "") {
							valid = false;
							issues.push(12);
						}
						if (results[12] !== "") {
							valid = false;
							issues.push(13);
						}
						if (!results[13].includes("Test entry 1") || !results[13].includes("Test entry 2")) {
							valid = false;
							issues.push(14);
						}
						if (results[14] !== "") {
							valid = false;
							issues.push(15);
						}
						if (!results[15].includes("Invalid API key")) {
							valid = false;
							issues.push(16);
						}
						if (results[16] !== "") {
							valid = false;
							issues.push(17);
						}
						if (!results[17].includes("Test entry 2")) {
							valid = false;
							issues.push(18);
						}
						if (!results[18].includes("Test entry 2")) {
							valid = false;
							issues.push(19);
						}
						if (!results[19].includes("Test entry 2")) {
							valid = false;
							issues.push(20);
						}
						if (results[20] !== "") {
							valid = false;
							issues.push(21);
						}
						if (results[21].includes("Test entry 1") || results[21].includes("Test entry 2")) {
							valid = false;
							issues.push(22);
						}
						if (results[22] !== "") {
							valid = false;
							issues.push(23);
						}
						if (!results[23].includes("fallID\": \"" + fallID1) || !results[23].includes("fallID\": \"" + fallID2)) {
							valid = false;
							issues.push(24);
						}
						if (!results[24].includes("Invalid API key")) {
							valid = false;
							issues.push(25);
						}
						if (!results[25].includes("Invalid API key")) {
							valid = false;
							issues.push(26);
						}
						if (!results[26].includes("fallID\": \"" + fallID1) || !results[26].includes("fallID\": \"" + fallID2)) {
							valid = false;
							issues.push(27);
						}
						if (!results[27].includes("Invalid API key")) {
							valid = false;
							issues.push(28);
						}
						if (!results[28].includes("Invalid API key")) {
							valid = false;
							issues.push(29);
						}
						if (!results[29].includes("Invalid API key")) {
							valid = false;
							issues.push(30);
						}
						if (!results[30].includes("Invalid API key")) {
							valid = false;
							issues.push(31);
						}
						if (!results[31].includes("Invalid API key")) {
							valid = false;
							issues.push(32);
						}
						if (!results[32].includes("Invalid API key")) {
							valid = false;
							issues.push(33);
						}
						if (!results[33].includes("Invalid API key")) {
							valid = false;
							issues.push(34);
						}
						if (!results[34].includes("Invalid API key")) {
							valid = false;
							issues.push(35);
						}
						if (!results[35].includes("Invalid API key")) {
							valid = false;
							issues.push(36);
						}
						if (!results[36].includes("No questions found")) {
							valid = false;
							issues.push(37);
						}
						if (!results[37].includes("Invalid API key")) {
							valid = false;
							issues.push(38);
						}
						if (!results[38].includes("missing") && !results[38].includes("answerID")) {
							valid = false;
							issues.push(39);
						}
						if (!results[39].includes("Invalid API key")) {
							valid = false;
							issues.push(40);
						}
						if (!results[40].includes("Invalid API key")) {
							valid = false;
							issues.push(41);
						}
						if (!results[41].includes("Invalid API key")) {
							valid = false;
							issues.push(42);
						}
						if (!results[42].includes("Invalid API key")) {
							valid = false;
							issues.push(43);
						}
						if (!results[43].includes("Invalid API key")) {
							valid = false;
							issues.push(44);
						}
						if (!results[44].includes("Invalid API key")) {
							valid = false;
							issues.push(45);
						}
						if (!results[45].includes("Invalid API key")) {
							valid = false;
							issues.push(46);
						}
						if (!results[46].includes("Invalid API key")) {
							valid = false;
							issues.push(47);
						}
						if (!results[47].includes("Invalid API key")) {
							valid = false;
							issues.push(48);
						}
						if (!results[48].includes("Invalid API key")) {
							valid = false;
							issues.push(49);
						}
						if (!results[49].includes(inputUserUsername.value)) {
							valid = false;
							issues.push(50);
						}
						if (!results[50].includes("Invalid API key")) {
							valid = false;
							issues.push(51);
						}
						if (results[51] !== "") {
							valid = false;
							issues.push(52);
						}
						if (!results[52].includes("Invalid API key")) {
							valid = false;
							issues.push(53);
						}
						if (!results[53].includes("Invalid API key")) {
							valid = false;
							issues.push(54);
						}
						if (!results[54].includes("Invalid API key")) {
							valid = false;
							issues.push(55);
						}
						if (!results[55].includes("Invalid API key")) {
							valid = false;
							issues.push(56);
						}
						if (!results[56].includes("Invalid API key")) {
							valid = false;
							issues.push(57);
						}
						if (!results[57].includes("Invalid API key")) {
							valid = false;
							issues.push(58);
						}
						if (!results[58].includes("Invalid API key")) {
							valid = false;
							issues.push(59);
						}
					} else if (apiAccess === "admin") {
						if (results[0] !== "") {
							valid = false;
							issues.push(1);
						}
						if (results[1] !== "") {
							valid = false;
							issues.push(2);
						}
						if (!results[2].includes("valid\":true")) {
							valid = false;
							issues.push(3);
						}
						if (!results[3].includes("valid\":true")) {
							valid = false;
							issues.push(4);
						}
						if (!results[4].includes("testAdmin1")) {
							valid = false;
							issues.push(5);
						}
						if (results[5] !== "") {
							valid = false;
							issues.push(6);
						}
						if (!results[6].includes("testAdmin1") || !results[6].includes("testAdmin2")) {
							valid = false;
							issues.push(7);
						}
						if (results[7] !== "") {
							valid = false;
							issues.push(8);
						}
						if (!results[8].includes("testAdmin1")) {
							valid = false;
							issues.push(9);
						}
						if (results[9] !== "") {
							valid = false;
							issues.push(10);
						}
						if (results[10] !== "") {
							valid = false;
							issues.push(11);
						}
						if (!results[11].includes("patientID")) {
							valid = false;
							issues.push(12);
						}
						if (!results[12].includes("patientID")) {
							valid = false;
							issues.push(13);
						}
						if (results[13] !== "") {
							valid = false;
							issues.push(14);
						}
						if (results[14] !== "") {
							valid = false;
							issues.push(15);
						}
						if (!results[15].includes("Test entry 1") || !results[15].includes("Test entry 2")) {
							valid = false;
							issues.push(16);
						}
						if (results[16] !== "") {
							valid = false;
							issues.push(17);
						}
						if (!results[17].includes("Test entry 1") || !results[17].includes("Test entry 2")) {
							valid = false;
							issues.push(18);
						}
						if (results[18] !== "") {
							valid = false;
							issues.push(19);
						}
						if (!results[19].includes("Test entry 2")) {
							valid = false;
							issues.push(20);
						}
						if (!results[20].includes("Test entry 2")) {
							valid = false;
							issues.push(21);
						}
						if (!results[21].includes("Test entry 2")) {
							valid = false;
							issues.push(22);
						}
						if (results[22] !== "") {
							valid = false;
							issues.push(23);
						}
						if (!results[23].includes("No diary entries found")) {
							valid = false;
							issues.push(24);
						}
						if (results[24] !== "") {
							valid = false;
							issues.push(25);
						}
						if (!results[25].includes("fallID\": \"" + fallID1) || !results[25].includes("fallID\": \"" + fallID2)) {
							valid = false;
							issues.push(26);
						}
						if (!results[26].includes("fallID\": \"" + fallID1) || !results[26].includes("fallID\": \"" + fallID2)) {
							valid = false;
							issues.push(27);
						}
						if (results[27] !== "") {
							valid = false;
							issues.push(28);
						}
						if (!results[28].includes("fallID")) {
							valid = false;
							issues.push(29);
						}
						if (!results[29].includes("fallID")) {
							valid = false;
							issues.push(30);
						}
						if (results[30] !== "") {
							valid = false;
							issues.push(31);
						}
						if (!results[31].includes("questionID") && !results[31].includes("missing")) {
							valid = false;
							issues.push(32);
						}
						if (!results[32].includes("questionID") && !results[32].includes("missing")) {
							valid = false;
							issues.push(33);
						}
						if (!results[33].includes("Was this for a test") || !results[33].includes("Does the API like")) {
							valid = false;
							issues.push(34);
						}
						if (!results[34].includes("Was this for a test") || !results[34].includes("Does the API like")) {
							valid = false;
							issues.push(35);
						}
						if (results[35] !== "") {
							valid = false;
							issues.push(36);
						}
						if (!results[36].includes("Has the question changed") || !results[36].includes("Does the API like")) {
							valid = false;
							issues.push(37);
						}
						if (results[37] !== "") {
							valid = false;
							issues.push(38);
						}
						if (!results[38].includes("No questions found")) {
							valid = false;
							issues.push(39);
						}
						if (!results[39].includes("No questions found")) {
							valid = false;
							issues.push(40);
						}
						if (results[40] !== "") {
							valid = false;
							issues.push(41);
						}
						if (!results[41].includes("No questions found")) {
							valid = false;
							issues.push(42);
						}
						if (results[42] !== "") {
							valid = false;
							issues.push(43);
						}
						if (!results[43].includes("No questions found")) {
							valid = false;
							issues.push(44);
						}
						if (!results[44].includes("No questions found")) {
							valid = false;
							issues.push(45);
						}
						if (results[45] !== "") {
							valid = false;
							issues.push(46);
						}
						if (!results[46].includes("testPatient1") || !results[46].includes("testPatient2")) {
							valid = false;
							issues.push(47);
						}
						if (results[47] !== "") {
							valid = false;
							issues.push(48);
						}
						if (!results[48].includes("testPatient1") || !results[48].includes("testPatient2")) {
							valid = false;
							issues.push(49);
						}
						if (results[49] !== "") {
							valid = false;
							issues.push(50);
						}
						if (!results[50].includes("testPatient1") || results[50].includes("testPatient2")) {
							valid = false;
							issues.push(51);
						}
						if (!results[51].includes("testPatient1")) {
							valid = false;
							issues.push(52);
						}
						if (!results[52].includes("User not found")) {
							valid = false;
							issues.push(53);
						}
						if (results[53] !== "") {
							valid = false;
							issues.push(54);
						}
						if (!results[54].includes("Invalid API key")) {
							valid = false;
							issues.push(55);
						}
						if (results[55] !== "") {
							valid = false;
							issues.push(56);
						}
						if (!results[56].includes("User not found")) {
							valid = false;
							issues.push(57);
						}
						if (results[57] !== "") {
							valid = false;
							issues.push(58);
						}
						if (!results[58].includes("Admin not found")) {
							valid = false;
							issues.push(59);
						}
						if (results[59] !== "") {
							valid = false;
							issues.push(60);
						}
					}

					if (valid) {
						divResultsList.innerHTML = '<span class="success">API functioning as expected.</span>';
						console.log("API functioning as expected.");
					} else {
						divResultsList.innerHTML = '<span class="error">Mismatch between expected and actual results.</span>';
						issues.map(issue => {
							let test = document.getElementById("test-number-" + issue).parentElement;
							let endpoint = test.getElementsByClassName("info")[0];
							divResultsList.innerHTML += '<span class="info">' + endpoint.textContent + '</span>';
						});
						console.log(issues);
					}
				}

				resolve();
			} catch(e) {
				reject(e);
			}
		});
	}

	// Start of test functions.

	function adminsCreate(body) {
		return new Promise((resolve, reject) => {
			sendRequest("POST", apiURL + "admins/create.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function adminsDelete(body) {
		return new Promise((resolve, reject) => {
			sendRequest("DELETE", apiURL + "admins/delete.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function adminsLogin(body) {
		return new Promise((resolve, reject) => {
			sendRequest("POST", apiURL + "admins/login.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function adminsLogout(body) {
		return new Promise((resolve, reject) => {
			sendRequest("POST", apiURL + "admins/logout.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function adminsReadAll() {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "admins/read-all.php?key=" + apiKey).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function adminsReadRange(from, to) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "admins/read-range.php?key=" + apiKey + "&from=" + from + "&to=" + to).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function adminsRead(id) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "admins/read.php?key=" + apiKey + "&id=" + id).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function adminsUpdate(body) {
		return new Promise((resolve, reject) => {
			sendRequest("PUT", apiURL + "admins/update.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}

	function diaryEntriesCreate(body) {
		return new Promise((resolve, reject) => {
			sendRequest("POST", apiURL + "diary-entries/create.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function diaryEntriesDelete(body) {
		return new Promise((resolve, reject) => {
			sendRequest("DELETE", apiURL + "diary-entries/delete.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function diaryEntriesReadAll() {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "diary-entries/read-all.php?key=" + apiKey).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function diaryEntriesReadDate(id, from, to) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "diary-entries/read-date.php?key=" + apiKey + "&id=" + id + "&from=" + from + "&to=" + to).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function diaryEntriesReadUser(id) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "diary-entries/read-user.php?key=" + apiKey + "&id=" + id).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function diaryEntriesRead(patientID, entryID) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "diary-entries/read.php?key=" + apiKey + "&patientID=" + patientID + "&entryID=" + entryID).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function diaryEntriesUpdate(body) {
		return new Promise((resolve, reject) => {
			sendRequest("PUT", apiURL + "diary-entries/update.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}

	function fallsCreate(body) {
		return new Promise((resolve, reject) => {
			sendRequest("POST", apiURL + "falls/create.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function fallsDelete(body) {
		return new Promise((resolve, reject) => {
			sendRequest("DELETE", apiURL + "falls/delete.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function fallsReadAll() {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "falls/read-all.php?key=" + apiKey).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function fallsReadDate(id, from, to) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "falls/read-date.php?key=" + apiKey + "&id=" + id + "&from=" + from + "&to=" + to).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function fallsReadUser(id) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "falls/read-user.php?key=" + apiKey + "&id=" + id).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function fallsRead(id) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "falls/read.php?key=" + apiKey + "&id=" + id).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}

	function questionsCreate(body) {
		return new Promise((resolve, reject) => {
			sendRequest("POST", apiURL + "questions/create.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function questionsDelete(body) {
		return new Promise((resolve, reject) => {
			sendRequest("DELETE", apiURL + "questions/delete.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function questionsReadAll() {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "questions/read-all.php?key=" + apiKey).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function questionsReadRange(from, to) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "questions/read-range.php?key=" + apiKey + "&from=" + from + "&to=" + to).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function questionsRead(id) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "questions/read.php?key=" + apiKey + "&id=" + id).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function questionsUpdate(body) {
		return new Promise((resolve, reject) => {
			sendRequest("PUT", apiURL + "questions/update.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}

	function answersReadAll() {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "answers/read-all.php?key=" + apiKey).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function answersReadUser(id) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "answers/read-user.php?key=" + apiKey + "&id=" + id).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function answersRead(id) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "answers/read.php?key=" + apiKey + "&id=" + id).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function answersUpdate(body) {
		return new Promise((resolve, reject) => {
			sendRequest("PUT", apiURL + "answers/update.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}

	function usersCreate(body) {
		return new Promise((resolve, reject) => {
			sendRequest("POST", apiURL + "users/create.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function usersDelete(body) {
		return new Promise((resolve, reject) => {
			sendRequest("DELETE", apiURL + "users/delete.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function usersLogin(body) {
		return new Promise((resolve, reject) => {
			sendRequest("POST", apiURL + "users/login.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function usersLogout(body) {
		return new Promise((resolve, reject) => {
			sendRequest("POST", apiURL + "users/logout.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function usersReadAll() {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "users/read-all.php?key=" + apiKey).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function usersReadRange(from, to) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "users/read-range.php?key=" + apiKey + "&from=" + from + "&to=" + to).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function usersRead(id) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "users/read.php?key=" + apiKey + "&id=" + id).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function usersUpdate(body) {
		return new Promise((resolve, reject) => {
			sendRequest("PUT", apiURL + "users/update.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					if (validJSON(result.response)) {
						resolve(JSON.parse(result.response));
					} else {
						resolve();
					}
				}, requestInterval);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}

	// End of test functions.

	function sendRequest(method, endpoint, body) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();

			xhr.addEventListener("readystatechange", () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (validJSON(xhr.responseText) || empty(xhr.responseText)) {
						if (!empty(body)) {
							resolve({ endpoint:endpoint, response:xhr.responseText, body:body });
						} else {
							resolve({ endpoint:endpoint, response:xhr.responseText });
						}
					} else {
						reject("Invalid JSON.");
					}
				}
			});

			xhr.open(method, endpoint, true);

			xhr.send(JSON.stringify(body));
		});
	}

	function handleResponse(endpoint, response, body) {
		testsRan += 1;
		let id = generateID();
		while (document.getElementById(id)) {
			id = generateID();
		}
		let test = document.createElement("div");
		test.classList.add("test-card");
		test.id = id;
		test.innerHTML = '<span class="test-number" id="test-number-' + testsRan + '">' + testsRan + '</span>';
		divOutput.appendChild(test);
		let parts = endpoint.split("/api");
		output(id, "span", parts[parts.length - 1], "info");
		if (!empty(body)) {
			output(id, "textarea", body);
		}
		output(id, "textarea", response);
		output(id, "span", "Request Successfully Sent", "success");
	}

	function handleError(error) {
		log("error", error);
	}

	function generateID() {
		return new Date().getTime() + "-" + [...Array(32)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');
	}

	function output(testID, type, text, className) {
		let element = document.createElement(type);
		element.textContent = text;

		document.getElementById(testID).appendChild(element);

		if (type === "textarea") {
			element.setAttribute("readonly", true);
			if (element.scrollHeight < 400) {
				element.style.height = element.scrollHeight + "px";
			} else {
				element.style.height = "400px";
			}
		} else {
			element.classList.add(className);
		}
	}

	function log(className, text) {
		let element = document.createElement("span");
		element.textContent = text;

		divOutput.appendChild(element);
		
		element.classList.add(className);
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

	function formatDateTime(date) {
		return date.getFullYear() + "-" +
			("00" + (date.getMonth() + 1)).slice(-2) + "-" +
			("00" + date.getDate()).slice(-2) + "+" +
			("00" + date.getHours()).slice(-2) + ":" +
			("00" + date.getMinutes()).slice(-2) + ":" +
			("00" + date.getSeconds()).slice(-2);
	}

	function validJSON(json) {
		try {
			let object = JSON.parse(json);
			if (object && typeof object === "object") {
				return true;
			}
		}
		catch(e) { }
		return false;
	}
});