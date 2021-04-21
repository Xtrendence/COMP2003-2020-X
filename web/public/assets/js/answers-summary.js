document.addEventListener("DOMContentLoaded", () => {
	if(localStorage.getItem("theme") === "dark") { 
		document.body.setAttribute("data-theme", "dark"); 
	} else { 
		document.body.removeAttribute("data-theme", "dark");
	}

	getQuestions().then(questions => {
		console.log(questions);
	}).catch(error => {
		console.log(error);
	});

	function getQuestions() {
		return new Promise((resolve, reject) => {
			let xhr = new XMLHttpRequest();
			xhr.addEventListener("readystatechange", () => {
				if(xhr.readyState === XMLHttpRequest.DONE) {
					if(validJSON(xhr.responseText)) {
						resolve(JSON.parse(xhr.responseText));
					} else {
						reject("Invalid JSON.");
					}
				}
			});
			xhr.open("GET", "./api/questions/read-all.php?key=8c068d98-874e-46ab-b2a1-5a5eb45a40a6");
			xhr.send();
		});
	}

	function validJSON(json) {
		try {
			let object = JSON.parse(json);
			if(object && typeof object === "object") {
				return object;
			}
		}
		catch(e) { }
		return false;
	}
});