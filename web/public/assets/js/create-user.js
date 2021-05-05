document.addEventListener("DOMContentLoaded", () => {
	// TODO: Change to actual session token after login page is complete.
	let sessionToken = "8c068d98-874e-46ab-b2a1-5a5eb45a40a6";

	const Notify = new XNotify("BottomRight");

	let createForm = document.getElementById("create-form");
	let createUser = document.getElementById("create-user");

	createUser.addEventListener("click", () => {
		let user = {};

		let inputs = createForm.getElementsByTagName("input");

		for (let i = 0; i < inputs.length; i++) {
			let input = inputs[i];
			let key = input.getAttribute("data-key");
			let value = input.value;
			user[key] = value;
		}

		create(user).then(response => {
			if ("error" in response) {
				Notify.error({
					title: "Error", 
					description: response.error, 
					duration: 4000,
				});
			} else {
				Notify.success({
					title: "User Created", 
					description: "The user has been created.", 
					duration: 4000,
					background: "var(--accent-gradient)",
					color: "var(--accent-contrast)",
				});
			}
		}).catch(error => {
			Notify.error({
				title: "Error", 
				description: "User couldn't be created.", 
				duration: 4000,
			});
			console.log(error);
		});
	});

	function create(user) {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			
			xhr.addEventListener("readystatechange", () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (validJSON(xhr.responseText)) {
						resolve(JSON.parse(xhr.responseText));
					} else if (empty(xhr.responseText)) {
						resolve({});
					} else {
						reject("Invalid JSON.");
					}
				}
			});

			xhr.open("POST", "./api/users/create.php?key=" + sessionToken, true);
			xhr.send(JSON.stringify(user));
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