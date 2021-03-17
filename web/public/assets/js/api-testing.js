document.addEventListener("DOMContentLoaded", () => {
	let inputUserUsername = document.getElementById("user-username");
	let inputUserPassword = document.getElementById("user-password");

	let inputURL = document.getElementById("api-url");

	let inputAdminUsername = document.getElementById("admin-username");
	let inputAdminPassword = document.getElementById("admin-password");

	let buttonTest = document.getElementById("test-button");

	let divOutput = document.getElementById("output");

	function sendRequest(method, endpoint, body) {
		let url = inputURL.value;

		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();

			xhr.addEventListener("readystatechange", () => {
				if (xhr.readyState === XMLHttpRequest.DONE) {
					if (validJSON(xhr.responseText)) {
						resolve(JSON.parse(xhr.responseText));
					} else {
						reject("Invalid JSON.");
					}
				}
			});

			xhr.open(method, url + endpoint, true);

			xhr.send(JSON.stringify(body));
		});
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