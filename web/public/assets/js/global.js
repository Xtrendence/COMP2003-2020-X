function verifySession(token) {
	return new Promise((resolve, reject) => {
		let xhr = new XMLHttpRequest();
		xhr.addEventListener("readystatechange", () => {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				try {
					let response = JSON.parse(xhr.responseText);
					if ("valid" in response && response.valid) {
						resolve(response);
					} else {
						reject(response);
					}
				} catch(error) {
					reject(error);
				}
			}
		});
		xhr.open("GET", "./api/admins/verify.php?key=" + token, true);
		xhr.send();
	});
}

function checkTheme() {
	if(localStorage.getItem("theme") === "dark") { 
		document.body.setAttribute("data-theme", "dark"); 
	} else { 
		document.body.removeAttribute("data-theme", "dark");
	}
}