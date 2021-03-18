document.addEventListener("DOMContentLoaded", () => {
	const Notify = new XNotify("BottomRight");

	let apiKey;
	let apiKeyDuplicate;
	let apiURL;

	let timeoutLimit = 2000;

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
		charLim: 120
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
		patient_password: "testPatient1"
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
		patient_password: "testPatient2"
	}

	let inputUserUsername = document.getElementById("user-username");
	let inputUserPassword = document.getElementById("user-password");

	let inputURL = document.getElementById("api-url");

	let inputAdminUsername = document.getElementById("admin-username");
	let inputAdminPassword = document.getElementById("admin-password");

	let buttonTest = document.getElementById("test-button");

	let divOutput = document.getElementById("output");

	buttonTest.addEventListener("click", async () => {
		apiURL = inputURL.value;
		if (apiURL.substr(apiURL.length - 1) !== "/") {
			apiURL = apiURL + "/";
		}

		if ((empty(inputUserUsername.value) && empty(inputUserPassword.value)) || (empty(inputAdminUsername.value) && empty(inputAdminPassword.value))) {
			let url = new URL(window.location.href);
			let key = url.searchParams.get("key");
			if (empty(key)) {
				apiKey = window.prompt("Login credentials not entered. Do you have an API key already?");
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
	});

	function loginUser(username, password) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			
			xhr.addEventListener("readystatechange", () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					console.log(xhr.responseText);
					if (validJSON(xhr.responseText)) {
						let response = JSON.parse(xhr.responseText);

						if (response.valid) {
							apiKey = response.token;

							console.log(apiKey);

							Notify.success({
								title: "Success",
								description: "You are now logged in as a user."
							});

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
			divOutput.innerHTML = "";

			apiKeyDuplicate = apiKey;

			if (apiKey.includes("user")) {
				log("alert", "Using User Token");
			} else if (apiKey.includes("admin")) {
				log("alert", "Using Admin Token");
			} else {
				log("alert", "Using Development Token");
			}

			log("info", "Testing /admins/");

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
					apiKey = researcherLoginToken;
				}
			}).catch(e => {
				handleError(e);
			});

			await adminsLogin(researcher2login).then(response => {
				researcherID2 = response.researcherID;
				console.log("Researcher ID 2: " + researcherID2);
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

			apiKey = apiKeyDuplicate;

			patient1.researcherID = researcherID1;
			patient2.researcherID = researcherID2;

			await usersCreate(patient1).catch(e => {
				handleError(e);
			});
			await usersCreate(patient2).catch(e => {
				handleError(e);
			});

			await usersLogin(patient1login).then(response => {
				patientID1 = response.patientID;
			}).catch(e => {
				handleError(e);
			});
			await usersLogin(patient2login).then(response => {
				patientID2 = response.patientID;
			}).catch(e => {
				handleError(e);
			});

			log("info", "Testing /diary-entries/");

			diaryEntry1.patientID = patientID1;
			diaryEntry2.patientID = patientID1;

			await diaryEntriesCreate(diaryEntry1).catch(e => {
				handleError(e);
			});
			await diaryEntriesCreate(diaryEntry2).catch(e => {
				handleError(e);
			});

			await diaryEntriesReadAll().then(response => {
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

			diaryEntry1.entry = "Updated diary entry 1 for testing.";

			await diaryEntriesUpdate(diaryEntry1).catch(e => {
				handleError(e);
			});

			let yesterday = formatDateTime(new Date().setDate(new Date().getDate() - 1));
			let tomorrow = formatDateTime(new Date().setDate(new Date().getDate() + 1));

			await diaryEntriesReadDate(yesterday, tomorrow).catch(e => {
				handleError(e);
			});

			await diaryEntriesDelete({ patientID:patientID1, entryID:diaryEntryID1 }).catch(e => {
				handleError(e);
			});

			await diaryEntriesRead(diaryEntryID2).catch(e => {
				handleError(e);
			});

			await diaryEntriesReadDate(yesterday, tomorrow).catch(e => {
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
			
			log("info", "Testing /falls/");

			fall1.patientID = patientID1;

			await fallsCreate(fall1).catch(e => {
				handleError(e);
			});

			await fallsReadAll().then(response => {
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

			await fallsExport(patientID1).catch(e => {
				handleError(e);
			});

			await fallsReadDate(yesterday, tomorrow).catch(e => {
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

			log("info", "Testing /questions/");

			question1.patientID = patientID1;
			question2.patientID = patientID1;

			await questionsCreate(question1).then(response => {
				questionID1 = response.questionID;
			}).catch(e => {
				handleError(e);
			});
			await questionsCreate(question2).then(response => {
				questionID2 = response.questionID;
			}).catch(e => {
				handleError(e);
			});

			await answersReadAll().then(response => {
				let ids = Object.keys(response.data);
				let id1 = ids[ids.length - 2];
				let id2 = ids[ids.length - 1];
				answerID1 = response.data[id1].answerID;
				answerID2 = response.data[id2].answerID;
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

			log("info", "Testing /answers/");

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

			log("info", "Testing /users/");

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
		} catch(e) {
			console.log(e);
		}
	}

	// Start of test functions.

	function adminsCreate(body) {
		return new Promise((resolve, reject) => {
			sendRequest("POST", apiURL + "admins/create.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function adminsLogin() {
		return new Promise((resolve, reject) => {
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function diaryEntriesReadDate(from, to) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "diary-entries/read-date.php?key=" + apiKey + "&from=" + from + "&to=" + to).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function diaryEntriesRead(id) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "diary-entries/read.php?key=" + apiKey + "&id=" + id).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function fallsExport(id) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "falls/export.php?key=" + apiKey + "&id=" + id).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
			}).catch((e) => {
				handleError("Error - " + result.endpoint);
				reject(e);
			});

			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function fallsReadDate(from, to) {
		return new Promise((resolve, reject) => {
			sendRequest("GET", apiURL + "falls/read-date.php?key=" + apiKey + "&from=" + from + "&to=" + to).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
			sendRequest("PUT", apiURL + "admins/update.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
			sendRequest("DELETE", apiURL + "answers/delete.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					resolve(JSON.parse(result.response));
				}, 200);
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
					if (validJSON(xhr.responseText)) {
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
		let id = generateID();
		let test = document.createElement("div");
		test.id = id;
		divOutput.appendChild(test);
		let parts = endpoint.split("/api");
		output(id, "span", parts[parts.length - 1], "info");
		if (!empty(body)) {
			output(id, "textarea", body);
		}
		output(id, "textarea", "Expected Response");
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
			if(object && typeof object === "object") {
				return true;
			}
		}
		catch(e) { }
		return false;
	}
});