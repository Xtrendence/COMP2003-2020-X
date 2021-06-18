document.addEventListener("DOMContentLoaded", () => {
	let sessionToken = localStorage.getItem("sessionToken");

	verifySession(sessionToken).then(result => {
		try {
			let wideCard;

			let from = 1;
			let to = 100;

			let previous = document.getElementById("prev-button");
			let next = document.getElementById("next-button");
			let askButton = document.getElementById("ask-button");

			let title = document.getElementById("questions");
			title.innerText = "All Questions";
			let allTab = document.getElementById("question-summary");
			let editTab = document.getElementById("editable-questions");
			let fixedTab = document.getElementById("fixed-questions");

			let contentEditable = document.getElementById("content-editable");
			let contentNotEditable = document.getElementById("content-not-editable");
			let seperator = document.getElementById("sep");

			allTab.addEventListener("click", () => {
				allTab.classList.add("active");
				editTab.classList.remove("active");
				fixedTab.classList.remove("active");
				title.innerText = "All Questions";

				contentEditable.classList.remove("hidden");
				contentNotEditable.classList.remove("hidden");

				seperator.classList.remove("hidden");
				seperator.classList.add("seperator");
			});

			editTab.addEventListener("click", () => {
				allTab.classList.remove("active");
				editTab.classList.add("active");
				fixedTab.classList.remove("active");
				title.innerText = "Editable Questions";

				contentEditable.classList.remove("hidden");
				contentNotEditable.classList.add("hidden");

				seperator.classList.add("hidden");
				seperator.classList.remove("seperator");
			});

			fixedTab.addEventListener("click", () => {
				allTab.classList.remove("active");
				editTab.classList.remove("active");
				fixedTab.classList.add("active");
				title.innerText = "Non-Editable Questions";

				contentEditable.classList.add("hidden");
				contentNotEditable.classList.remove("hidden");

				seperator.classList.add("hidden");
				seperator.classList.remove("seperator");
			});

			function getQuestions(from, to) {
				let xhr = new XMLHttpRequest();

				xhr.addEventListener("readystatechange", function () {
					if (xhr.readyState === XMLHttpRequest.DONE) {
						try {
							let json = xhr.responseText;
							let questions = JSON.parse(json).data;
							let editableQs = {};
							let fixedQs = {};
							let keys = Object.keys(questions);

							keys.map(key => {
								if (empty(questions[key].answer)) {
									editableQs[questions[key].question] = questions[key];
								} else {
									if (questions[key].question in editableQs) {
										delete editableQs[questions[key].question];
									}

									fixedQs[questions[key].question] = questions[key];
								}
							});

							let keysOfEditable = Object.keys(editableQs);
							keysOfEditable.map(key => {
								let questionId = editableQs[key].questionID;
								let question = editableQs[key].question;
								let questionType = editableQs[key].question_type;
								let choices = editableQs[key].choices;
								let answered = false;

								if (questionType == "choice") {
									choiceCard(wideCard, questionId, question, questionType, choices, answered);
								} else {
									let questionLim = editableQs[key].question_charLim;
									questionCard(wideCard, questionId, question, questionLim, questionType, answered);
								}
							});

							let keysOfNonEditable = Object.keys(fixedQs);
							keysOfNonEditable.map(key => {
								let questionId = fixedQs[key].questionID;
								let question = fixedQs[key].question;
								let questionType = fixedQs[key].question_type;
								let choices = fixedQs[key].choices;
								let answered = true;

								if (questionType == "choice") {
									choiceCard(wideCard, questionId, question, questionType, choices, answered);
								} else {
									let questionLim = fixedQs[key].question_charLim;
									questionCard(wideCard, questionId, question, questionLim, questionType, answered);
								}
							});
						} catch (error) {
							console.log(error);
						}
					}
				});

				xhr.open("GET", "./api/answers/read-range.php?key=" + result.token + "&from=" + from + "&to=" + to, true);
				xhr.send();
			}

			function questionCard(wideCard, questionID, q, questionLim, questionType, answered) {
				let cardAnchor = document.createElement("a");

				wideCard = document.createElement("div");
				wideCard.classList.add("question-wide-card");
				wideCard.id = "wide-card";
				wideCard.innerHTML = '\n' +
					'		<div class="text-margin">\n' +
					'			<span class="card-heading">Question ID: <span class="card-text">' + questionID + '</span> </span>\n' +
					'		</div>\n' +
					'\n' +
					'		<div class="text-margin">\n' +
					'			<span class="card-heading">Question: <span class="card-text">' + q + '</span> </span>\n' +
					'		</div>\n' +
					'\n' +
					'		<div class="text-margin">\n' +
					'			<span class="card-heading">Character Limit: <span class="card-text">' + questionLim + '</span></span>\n' +
					'		</div>\n' +
					'\n' +
					'		<div class="text-margin">\n' +
					'			<span class="card-heading">Type: <span class="card-text">' + questionType + '</span> </span>\n' +
					'		</div>\n' +

					'	</div>';

				cardAnchor.appendChild(wideCard);

				if (answered) {
					contentNotEditable.appendChild(cardAnchor);
				} else {
					contentEditable.appendChild(cardAnchor);
					let butContainer = document.createElement("div");
					butContainer.classList.add("card-button-wrapper");

					let delAnchor = document.createElement("a");
					let delBut = document.createElement("button");
					delBut.classList.add("action-button");
					delBut.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.2 by @fontawesome - https://fontawesome.com/ License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg>';

					let editAnchor = document.createElement("a");
					let editBut = document.createElement("button");
					editBut.classList.add("action-button");
					editBut.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Free 5.15.2 by @fontawesome - https://fontawesome.com/ License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"/></svg>';

					delBut.setAttribute("aria-label", "Delete");
					delBut.setAttribute("data-microtip-position", "top");
					delBut.setAttribute("role", "tooltip");

					editBut.setAttribute("aria-label", "Edit");
					editBut.setAttribute("data-microtip-position", "top");
					editBut.setAttribute("role", "tooltip");

					editAnchor.appendChild(editBut);
					editAnchor.href = "./edit-question.php?id=" + questionID + "";
					delAnchor.appendChild(delBut);
					butContainer.appendChild(delAnchor);
					butContainer.appendChild(editAnchor);
					wideCard.appendChild(butContainer);

					delBut.addEventListener("click", () => {
						// API request to delete the question
						let xhr = new XMLHttpRequest();

						let body = {
							questionID: questionID
						};

						xhr.addEventListener("readystatechange", function () {
							if (xhr.readyState === XMLHttpRequest.DONE) {
								let responseJSON = xhr.responseText;
								try {
									let response = JSON.parse(responseJSON);
									let questionID = response["questionID"];
								} catch (error) {
									console.log(error);
								}
							}
						});

						xhr.open("DELETE", "./api/questions/delete.php?key=" + result.token, true);
						xhr.send(JSON.stringify(body));

						location.reload();
					});
				}
			}

			getQuestions(from, to);

			function choiceCard(wideCard, questionID, q, questionLim, choices, answered) {
				try {
					let cardAnchor = document.createElement("a");

					wideCard = document.createElement("div");
					wideCard.classList.add("question-wide-card");
					wideCard.id = "wide-card";

					let choice = [];
					let choiceKeys = Object.keys(choices);

					for (let j = 0; j < choiceKeys.length; j++) {
						choice.push(choices[j + 1]);
					}

					let choiceStr = choice.join(", ");

					wideCard.innerHTML = '\n' +
						'		<div class="text-margin">\n' +
						'			<span class="card-heading">Question ID: <span class="card-text">' + questionID + '</span> </span>\n' +
						'		</div>\n' +
						'\n' +
						'		<div class="text-margin">\n' +
						'			<span class="card-heading">Question: <span class="card-text">' + q + '</span> </span>\n' +
						'		</div>\n' +
						'\n' +
						'		<div class="text-margin">\n' +
						'			<span class="card-heading">Type: <span class="card-text">Choices</span> </span>\n' +
						'		</div>\n' +
						'\n' +
						'		<div class="text-margin">\n' +
						'			<span class="card-heading">Choices: <span class="card-text">' + choiceStr + '</span> </span>\n' +
						'		</div>\n' +
						'\n' +
						'	</div>';

					cardAnchor.appendChild(wideCard);

					if (answered) {
						contentNotEditable.appendChild(cardAnchor);
					} else {
						contentEditable.appendChild(cardAnchor);
						let butContainer = document.createElement("div");
						butContainer.classList.add("card-button-wrapper");

						let delAnchor = document.createElement("a");
						let delBut = document.createElement("button");
						delBut.classList.add("action-button");
						delBut.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.2 by @fontawesome - https://fontawesome.com/ License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg>';

						let editAnchor = document.createElement("a");
						let editBut = document.createElement("button");
						editBut.classList.add("action-button");
						editBut.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Free 5.15.2 by @fontawesome - https://fontawesome.com/ License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"/></svg>';

						delBut.setAttribute("aria-label", "Delete");
						delBut.setAttribute("data-microtip-position", "top");
						delBut.setAttribute("role", "tooltip");

						editBut.setAttribute("aria-label", "Edit");
						editBut.setAttribute("data-microtip-position", "top");
						editBut.setAttribute("role", "tooltip");

						editAnchor.appendChild(editBut);
						editAnchor.href = "./edit-question.php?id=" + questionID + "";
						delAnchor.appendChild(delBut);
						butContainer.appendChild(delAnchor);
						butContainer.appendChild(editAnchor);
						wideCard.appendChild(butContainer);

						delBut.addEventListener("click", () => {
							// API request to delete the question

							let xhr = new XMLHttpRequest();
							let body = {
								questionID: questionID
							};

							xhr.addEventListener("readystatechange", function () {
								if (xhr.readyState === XMLHttpRequest.DONE) {
									let responseJSON = xhr.responseText;
									try {
										let response = JSON.parse(responseJSON);
										let questionID = response["questionID"];
									} catch (error) {
										console.log(error);
									}
								}
							});
							xhr.open("DELETE", "./api/questions/delete.php?key=" + result.token, true);
							xhr.send(JSON.stringify(body));
							location.reload();
						});
					}
				} catch (error) {
					console.log(error);
				}
			}

			previous.addEventListener("click", function () {
				contentEditable.innerHTML = "";
				contentNotEditable.innerHTML = "";
				from -= 100;
				to -= 100;
				getQuestions(from, to);
			});

			next.addEventListener("click", function () {
				contentEditable.innerHTML = "";
				contentNotEditable.innerHTML = "";
				from += 100;
				to += 100;
				getQuestions(from, to);
			});

			/**
			* @desc on DOM loaded, it checks to see if localStorage has the key:'theme', and if it does is it's value:'dark'.
			*	  when that is true, it sets the body with an attribute to turn the theme dark.
			*/
			checkTheme();

			function empty(value) {
				if (typeof value === "object" && value !== null && Object.keys(value.length === 0)) {
					return true;
				}
				if (value === null || typeof value === "undefined" || value.toString().trim() === "") {
					return true;
				}
				return false;
			}
		} catch (error) {
			console.trace(error);
		}
	}).catch(error => {
		window.location.replace("./login.php");
	});
});