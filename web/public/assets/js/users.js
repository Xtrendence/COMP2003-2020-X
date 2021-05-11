document.addEventListener("DOMContentLoaded", () => {
	let sessionToken = localStorage.getItem("sessionToken");

	verifySession(sessionToken).then(result => {
		try {
			let from = 1;
			let to = 50;
			let layer = document.getElementById("table-body");
			let deleteButton;
			let editButton;
			let profileButton;
			let chartButton;
			let nextButton = document.getElementById("next-button");
			let prevButton = document.getElementById("prev-button");
			let searchButton = document.getElementById("search-button");
			nextButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">\n' +
				'  <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>\n' +
				'</svg>';
			prevButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-caret-left-fill" viewBox="0 0 16 16">\n' +
				'  <path d="M3.86 8.753l5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z"/>\n' +
				'</svg>';

			let sessionToken = localStorage.getItem("sessionToken");

			let idInput = document.getElementById("id-search");

			idInput.addEventListener("keydown", (e) => {
				if (e.key.toLowerCase() === "enter") {
					searchButton.click();
				}
			});

			function getUsers(from, to) {
				let xhr = new XMLHttpRequest();
				xhr.addEventListener("readystatechange", function() {
					if (xhr.readyState === XMLHttpRequest.DONE) {
						let json = xhr.responseText;
						let users = JSON.parse(json);
						let keys = Object.keys(users["data"]);
						try {
							layer.innerHTML = "";
							let patient = users["data"];
							for (let i = 0; i < keys.length; i++) {
								let userID = patient[i]["patientID"];
								let firstName = patient[i]["patient_fName"];
								let lastName = patient[i]["patient_lName"];
								let row = document.createElement("tr");
								let cell1 = row.insertCell(0);
								let cell2 = row.insertCell(1);
								let cell3 = row.insertCell(2);
								let cellAct = row.insertCell(3);
								row.id = userID;
								cell1.innerHTML = (userID);
								cell2.innerHTML = (firstName);
								cell3.innerHTML = (lastName);
								layer.appendChild(row);

								createButtons(deleteButton, editButton, profileButton, chartButton, userID, cellAct, row);
							}
						} catch {
							console.error("error");
						}

					}
				});
				xhr.open("GET", "./api/users/read-range.php?from=" + from + "&to=" + to + "&key=" + sessionToken, true);
				xhr.send();
			}

			searchButton.addEventListener("click", function () {
				let id = idInput.value;
				if (id !== "") {
					let xhr = new XMLHttpRequest();
					xhr.addEventListener("readystatechange", function () {
						if (xhr.readyState === XMLHttpRequest.DONE) {
							let json = xhr.responseText;
							let patient = JSON.parse(json);
							let keys = Object.keys(patient);
							try {
								layer.innerHTML = "";
								let userID = patient["patientID"];
								let firstName = patient["patient_fName"];
								let lastName = patient["patient_lName"];
								let row = document.createElement("tr");
								let cell1 = row.insertCell(0);
								let cell2 = row.insertCell(1);
								let cell3 = row.insertCell(2);
								let cellAct = row.insertCell(3);
								row.id = userID;
								cell1.innerHTML = (userID);
								cell2.innerHTML = (firstName);
								cell3.innerHTML = (lastName);
								layer.appendChild(row);

								createButtons(deleteButton, editButton, profileButton, chartButton, userID, cellAct, row);
							} catch {
								console.error("error");
							}
						}
					});
					xhr.open("GET", "./api/users/read.php?id=" + id + "&key=" + sessionToken, true);
					xhr.send();
				}
				else {
					getUsers(from, to);
				}
			});

			nextButton.addEventListener("click", function () {
				layer.innerHTML = "";
				from = to + 1;
				to = to + 50;
				getUsers(from, to);
			});

			prevButton.addEventListener("click", function () {
				layer.innerHTML = "";
				from = to - 99;
				to = to - 50;
				getUsers(from, to);
			});

			function deleteCheck(userID) {
				if (confirm("Are you sure you want to delete this user?")) {
					window.location = "./api/users/delete.php?id=" + userID + "";
				} else {
					window.alert("User was not deleted");
				}
			}

			function createButtons(deleteButton, editButton, profileButton, chartButton, userID, cellAct, row) {
				let editAnchor = document.createElement("a");
				let profileAnchor = document.createElement("a");
				let chartAnchor = document.createElement("a");

				deleteButton = document.createElement("button");
				deleteButton.classList.add("action-button");
				deleteButton.id = "delete-button";
				deleteButton.innerHTML = '<div class="svg-div"></div><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">\n' +
					'  <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>\n' +
					'</svg></div>'
				deleteButton.addEventListener("click", deleteCheck)
				// deleteButton.href = "./api/users/delete.php" + userID + "";

				editButton = document.createElement("button");
				editButton.classList.add("action-button");
				editButton.id = "edit-button";
				editButton.innerHTML = '<div class="svg-div"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">\n' +
					'  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>\n' +
					'</svg></div>'
				editAnchor.href = "./edit-user.php?id=" + userID + "";
				editAnchor.appendChild(editButton);

				profileButton = document.createElement("button");
				profileButton.classList.add("action-button");
				profileButton.id = "profile-button";
				profileButton.innerHTML = '<div class="svg-div"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-person-fill" viewBox="0 0 16 16">\n' +
					'  <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>\n' +
					'</svg></div>'
				profileAnchor.href = "./view-user.php?id=" + userID + "";
				profileAnchor.appendChild(profileButton);

				chartButton = document.createElement("button");
				chartButton.classList.add("action-button");
				chartButton.id = "chart-button";
				chartButton.innerHTML = '<div class="svg-div"><svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">\n' +
					'   <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1v-3zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V2z"/>\n' +
					'</svg></div>'
				chartAnchor.href = "./charts.php?id=" + userID + "";
				chartAnchor.appendChild(chartButton);

				cellAct.appendChild(deleteButton);
				cellAct.appendChild(editAnchor);
				cellAct.appendChild(profileAnchor);
				cellAct.appendChild(chartAnchor);
				row.appendChild(cellAct);
			}

			getUsers(from, to);

			/**
			 * @desc on DOM loaded, it checks to see if localStorage has the key:'theme', and if it does is it's value:'dark'.
			 *      when that is true, it sets the body with an attribute to turn the theme dark.
			 */
			checkTheme();
		} catch(error) {
			console.trace(error);
		}
	}).catch(error => {
		window.location.replace("./login.php");
	});
});