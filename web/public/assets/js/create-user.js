document.addEventListener("DOMContentLoaded", () => {
	// TODO: Change to actual session token after login page is complete.
	let sessionToken = "8c068d98-874e-46ab-b2a1-5a5eb45a40a6";

	const Notify = new XNotify("BottomRight");

	let researcherID = document.getElementById("researcher-id");
	let nhsRef = document.getElementById("patient-nhs-ref");
	let username = document.getElementById("patient-username");
	let password = document.getElementById("patient-password");
	let firstName = document.getElementById("patient-first-name");
	let lastName = document.getElementById("patient-last-name");
	let dateOfBirth = document.getElementById("patient-dob");
	let addressLine1 = document.getElementById("patient-address-line-1");
	let addressLine2 = document.getElementById("patient-address-line-2");
	let postcode = document.getElementById("patient-postcode");
	let telephone = document.getElementById("patient-telephone");
	let mobile = document.getElementById("patient-mobile");
	let email = document.getElementById("patient-email");
	let comment = document.getElementById("patient-comment");

	let createForm = document.getElementById("create-form");
	let createUser = document.getElementById("create-user");

	let testing = true;

	if(testing) {
		researcherID.value = "1";
		nhsRef.value = "1191191303";
		username.value = "AdrianX";
		password.value = "JustATest";
		firstName.value = "Adrian";
		lastName.value = "Nouchin";
		dateOfBirth.value = "1969-11-01 15:00:00";
		addressLine1.value = "Some Place";
		addressLine2.value = "Some Flat";
		postcode.value = "PL3XQC";
		telephone.value = "01752123999";
		mobile.value = "+447849198656";
		email.value = "adrian@xtrendence.com";
		comment.value = "This is just a test.";
	}

	createUser.addEventListener("click", () => {
		let user = {};

		let inputs = createForm.getElementsByTagName("input");

		for(let i = 0; i < inputs.length; i++) {
			let input = inputs[i];
			let key = input.getAttribute("data-key");
			let value = input.value;
			user[key] = value;
		}

		create(user).then(response => {
			if("error" in response) {
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
				if(xhr.readyState === XMLHttpRequest.DONE) {
					if(validJSON(xhr.responseText)) {
						resolve(JSON.parse(xhr.responseText));
					} else if(empty(xhr.responseText)) {
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