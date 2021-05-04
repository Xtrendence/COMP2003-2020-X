document.addEventListener("DOMContentLoaded", () => {
	const Notify = new XNotify("BottomRight");

	let apiKey = localStorage.getItem("sessionToken");
	let apiURL = "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/public/api/";
	let apiAccess;

	let inputAdminUsername = document.getElementById("admin-username");
	let inputAdminPassword = document.getElementById("admin-password");

	let buttonAdminLogin = document.getElementById("admin-login");

	checkSession().then(() => {
		window.location.replace("./");
	}).catch(error => {
		Notify.error({
			title: "Error",
			description: error
		});
	});

	buttonAdminLogin.addEventListener("click", async () => {
		if (!empty(inputAdminUsername.value) && !empty(inputAdminPassword.value)) {
			login(inputAdminUsername.value, inputAdminPassword.value).then(() => {
				window.location.replace("./");
			}).catch(error => {
				Notify.error({
					title: "Error",
					description: error
				});
			});
		} else {
			Notify.error({
				title: "Error",
				description: "Please fill out both fields."
			});
		}
	});

	function login(username, password) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();

			xhr.addEventListener("readystatechange", () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (validJSON(xhr.responseText)) {
						let response = JSON.parse(xhr.responseText);

						if (response.valid) {
							localStorage.setItem("sessionToken", response.token);

							Notify.success({
								title: "Success",
								description: "You are now logged in as an administrator."
							});

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
			xhr.send(JSON.stringify({ researcher_username: username, researcher_password: password, fcmToken: "-" }));
		});
	}

	function validJSON(json) {
		try {
			let object = JSON.parse(json);
			if (object && typeof object === "object") {
				return true;
			}
		}
		catch (e) { }
		return false;
	}

	function checkSession() {
		return new Promise((resolve, reject) => {
			if (!empty(apiKey)) {
				let xhr = new XMLHttpRequest();

				xhr.addEventListener("readystatechange", () => {
					if (xhr.readyState === XMLHttpRequest.DONE) {
						if (validJSON(xhr.responseText)) {
							let response = JSON.parse(xhr.responseText);

							if (response.valid) {
								localStorage.setItem("sessionToken", response.token);
								resolve();
							} else {
								reject("Login failed.");
							}
						} else {
							reject("Invalid JSON.");
						}
					}
				});

				xhr.open("GET", apiURL + "admins/verify.php?key=" + apiKey, true);
				xhr.send();
			}
		});
	}

	function empty(value) {
		if (typeof value === "object" && value !== null && Object.keys(value.length === 0)) {
			return true;
		}
		if (value === null || typeof value === "undefined" || value.toString().trim() === "") {
			return true;
		}
		return false;
	}
});