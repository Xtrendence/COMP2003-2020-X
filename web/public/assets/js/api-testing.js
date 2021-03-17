document.addEventListener("DOMContentLoaded", () => {
	const Notify = new XNotify("BottomRight");

	let apiKey;
	let apiURL;

	let inputUserUsername = document.getElementById("user-username");
	let inputUserPassword = document.getElementById("user-password");

	let inputURL = document.getElementById("api-url");

	let inputAdminUsername = document.getElementById("admin-username");
	let inputAdminPassword = document.getElementById("admin-password");

	let buttonTest = document.getElementById("test-button");

	let divOutput = document.getElementById("output");

	buttonTest.addEventListener("click", () => {
		apiURL = inputURL.value;
		if (apiURL.substr(apiURL.length - 1) !== "/") {
			apiURL = apiURL + "/";
		}

		if (empty(inputUserUsername) || empty(inputUserPassword) || empty(inputAdminUsername) || empty(inputAdminPassword)) {
			let url = new URL(window.location.href);
			let key = url.searchParams.get("key");
			if (empty(key)) {
				apiKey = window.prompt("Login credentials not entered. Do you have an API key already?");
			} else {
				apiKey = key;
			}
		}

		attemptStart();
	});

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
		divOutput.innerHTML = "";

		log("info", "Testing /admins/");

		await adminsCreate();
		await adminsDelete();
		await adminsLogin();
		await adminsLogout();
		await adminsReadAll();
		await adminsReadRange();
		await adminRead();
		await adminUpdate();

		log("info", "Testing /answers/");

		await answersCreate();
		await answersDelete();
		await answersReadAll();
		await answersReadUser();
		await answersRead();
		await answersUpdate();

		log("info", "Testing /diary-entries/");

		await diaryEntriesCreate();
		await diaryEntriesDelete();
		await diaryEntriesReadAll();
		await diaryEntriesReadDate();
		await diaryEntriesReadUser();
		await diaryEntriesRead();
		await diaryEntriesUpdate();

		log("info", "Testing /falls/");

		await fallsCreate();
		await fallsDelete();
		await fallsExport();
		await fallsReadAll();
		await fallsReadDate();
		await fallsReadUser();
		await fallsRead();

		log("info", "Testing /questions/");

		await questionsCreate();
		await questionsDelete();
		await questionsReadAll();
		await questionsReadRange();
		await questionsRead();
		await questionsUpdate();

		log("info", "Testing /users/");

		await usersCreate();
		await usersDelete();
		await usersLogin();
		await usersLogout();
		await usersReadAll();
		await usersReadRange();
		await usersRead();
		await usersUpdate();
	}

	function adminsCreate() {
		return new Promise((resolve, reject) => {

		});
	}
	function adminsDelete() {
		return new Promise((resolve, reject) => {

		});
	}
	function adminsLogin() {
		return new Promise((resolve, reject) => {

		});
	}
	function adminsLogout() {
		return new Promise((resolve, reject) => {

		});
	}
	function adminsReadAll() {
		return new Promise((resolve, reject) => {

		});
	}
	function adminsReadRange() {
		return new Promise((resolve, reject) => {

		});
	}
	function adminRead() {
		return new Promise((resolve, reject) => {

		});
	}
	function adminUpdate() {
		return new Promise((resolve, reject) => {

		});
	}

	function answersCreate() {
		return new Promise((resolve, reject) => {

		});
	}
	function answersDelete() {
		return new Promise((resolve, reject) => {

		});
	}
	function answersReadAll() {
		return new Promise((resolve, reject) => {

		});
	}
	function answersReadUser() {
		return new Promise((resolve, reject) => {

		});
	}
	function answersRead() {
		return new Promise((resolve, reject) => {

		});
	}
	function answersUpdate() {
		return new Promise((resolve, reject) => {

		});
	}

	function diaryEntriesCreate() {
		return new Promise((resolve, reject) => {

		});
	}
	function diaryEntriesDelete() {
		return new Promise((resolve, reject) => {

		});
	}
	function diaryEntriesReadAll() {
		return new Promise((resolve, reject) => {

		});
	}
	function diaryEntriesReadDate() {
		return new Promise((resolve, reject) => {

		});
	}
	function diaryEntriesReadUser() {
		return new Promise((resolve, reject) => {

		});
	}
	function diaryEntriesRead() {
		return new Promise((resolve, reject) => {

		});
	}
	function diaryEntriesUpdate() {
		return new Promise((resolve, reject) => {

		});
	}

	function fallsCreate() {
		return new Promise((resolve, reject) => {

		});
	}
	function fallsDelete() {
		return new Promise((resolve, reject) => {

		});
	}
	function fallsExport() {
		return new Promise((resolve, reject) => {

		});
	}
	function fallsReadAll() {
		return new Promise((resolve, reject) => {

		});
	}
	function fallsReadDate() {
		return new Promise((resolve, reject) => {

		});
	}
	function fallsReadUser() {
		return new Promise((resolve, reject) => {

		});
	}
	function fallsRead() {
		return new Promise((resolve, reject) => {

		});
	}

	function questionsCreate() {
		return new Promise((resolve, reject) => {

		});
	}
	function questionsDelete() {
		return new Promise((resolve, reject) => {

		});
	}
	function questionsReadAll() {
		return new Promise((resolve, reject) => {

		});
	}
	function questionsReadRange() {
		return new Promise((resolve, reject) => {

		});
	}
	function questionsRead() {
		return new Promise((resolve, reject) => {

		});
	}
	function questionsUpdate() {
		return new Promise((resolve, reject) => {

		});
	}

	function usersCreate() {
		return new Promise((resolve, reject) => {

		});
	}
	function usersDelete() {
		return new Promise((resolve, reject) => {

		});
	}
	function usersLogin() {
		return new Promise((resolve, reject) => {

		});
	}
	function usersLogout() {
		return new Promise((resolve, reject) => {

		});
	}
	function usersReadAll() {
		return new Promise((resolve, reject) => {

		});
	}
	function usersReadRange() {
		return new Promise((resolve, reject) => {

		});
	}
	function usersRead() {
		return new Promise((resolve, reject) => {

		});
	}
	function usersUpdate() {
		return new Promise((resolve, reject) => {

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