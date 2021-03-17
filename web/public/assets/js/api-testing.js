document.addEventListener("DOMContentLoaded", () => {
	const Notify = new XNotify("BottomRight");

	let apiKey;
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
		falls: 2,
	};
	let fall2 = {
		patientID: null,
		falls: 4
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

			if (apiKey.includes("user")) {
				log("alert", "Using User Token");
			} else if (apiKey.includes("admin")) {
				log("alert", "Using Admin Token");
			} else {
				log("alert", "Using Development Token");
			}

			log("info", "Testing /admins/");

			await adminsCreate().catch(e => {
				handleError(e);
			});
			await adminsDelete().catch(e => {
				handleError(e);
			});
			await adminsLogin().catch(e => {
				handleError(e);
			});
			await adminsLogout().catch(e => {
				handleError(e);
			});
			await adminsReadAll().catch(e => {
				handleError(e);
			});
			await adminsReadRange().catch(e => {
				handleError(e);
			});
			await adminRead().catch(e => {
				handleError(e);
			});
			await adminUpdate().catch(e => {
				handleError(e);
			});

			log("info", "Testing /diary-entries/");

			await diaryEntriesCreate().catch(e => {
				handleError(e);
			});
			await diaryEntriesDelete().catch(e => {
				handleError(e);
			});
			await diaryEntriesReadAll().catch(e => {
				handleError(e);
			});
			await diaryEntriesReadDate().catch(e => {
				handleError(e);
			});
			await diaryEntriesReadUser().catch(e => {
				handleError(e);
			});
			await diaryEntriesRead().catch(e => {
				handleError(e);
			});
			await diaryEntriesUpdate().catch(e => {
				handleError(e);
			});

			log("info", "Testing /falls/");

			await fallsCreate().catch(e => {
				handleError(e);
			});
			await fallsDelete().catch(e => {
				handleError(e);
			});
			await fallsExport().catch(e => {
				handleError(e);
			});
			await fallsReadAll().catch(e => {
				handleError(e);
			});
			await fallsReadDate().catch(e => {
				handleError(e);
			});
			await fallsReadUser().catch(e => {
				handleError(e);
			});
			await fallsRead().catch(e => {
				handleError(e);
			});

			log("info", "Testing /questions/");

			await questionsCreate().catch(e => {
				handleError(e);
			});
			await questionsDelete().catch(e => {
				handleError(e);
			});
			await questionsReadAll().catch(e => {
				handleError(e);
			});
			await questionsReadRange().catch(e => {
				handleError(e);
			});
			await questionsRead().catch(e => {
				handleError(e);
			});
			await questionsUpdate().catch(e => {
				handleError(e);
			});

			log("info", "Testing /answers/");

			await answersCreate().catch(e => {
				handleError(e);
			});
			await answersDelete().catch(e => {
				handleError(e);
			});
			await answersReadAll().catch(e => {
				handleError(e);
			});
			await answersReadUser().catch(e => {
				handleError(e);
			});
			await answersRead().catch(e => {
				handleError(e);
			});
			await answersUpdate().catch(e => {
				handleError(e);
			});

			log("info", "Testing /users/");

			await usersCreate().catch(e => {
				handleError(e);
			});
			await usersDelete().catch(e => {
				handleError(e);
			});
			await usersLogin().catch(e => {
				handleError(e);
			});
			await usersLogout().catch(e => {
				handleError(e);
			});
			await usersReadAll().catch(e => {
				handleError(e);
			});
			await usersReadRange().catch(e => {
				handleError(e);
			});
			await usersRead().catch(e => {
				handleError(e);
			});
			await usersUpdate().catch(e => {
				handleError(e);
			});
		} catch(e) {
			console.log(e);
		}
	}

	function adminsCreate(body) {
		return new Promise((resolve, reject) => {
			sendRequest("POST", apiURL + "admins/create.php?key=" + apiKey, body).then((result) => {
				setTimeout(() => {
					handleResponse(result.endpoint, result.response);
					resolve();
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
	function adminsDelete() {
		return new Promise((resolve, reject) => {
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
	function adminsLogout() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function adminsReadAll() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function adminsReadRange() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function adminRead() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function adminUpdate() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}

	function diaryEntriesCreate() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function diaryEntriesDelete() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function diaryEntriesReadAll() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function diaryEntriesReadDate() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function diaryEntriesReadUser() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function diaryEntriesRead() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function diaryEntriesUpdate() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}

	function fallsCreate() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function fallsDelete() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function fallsExport() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function fallsReadAll() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function fallsReadDate() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function fallsReadUser() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function fallsRead() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}

	function questionsCreate() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function questionsDelete() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function questionsReadAll() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function questionsReadRange() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function questionsRead() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function questionsUpdate() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}

	function answersCreate() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function answersDelete() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function answersReadAll() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function answersReadUser() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function answersRead() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function answersUpdate() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}

	function usersCreate() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function usersDelete() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function usersLogin() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function usersLogout() {
		return new Promise((resolve, reject) => {
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
					resolve();
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
	function usersReadRange() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function usersRead() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}
	function usersUpdate() {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				reject("Timeout - " + arguments.callee.name + "()");
			}, timeoutLimit);
		});
	}

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