document.addEventListener("DOMContentLoaded", () => {
	const Notify = new XNotify("BottomRight");

	if(localStorage.getItem("theme") === "dark") { 
		document.body.setAttribute("data-theme", "dark"); 
	} else { 
		document.body.removeAttribute("data-theme", "dark");
	}

	let divAnswersList = document.getElementById("answers-list");

	getAnswers().then(answers => {
		if("data" in answers) {
			let choiceAnswers = getChoiceAnswers(answers.data);
			console.log(choiceAnswers);

			Object.keys(choiceAnswers).map(question => {
				let card = document.createElement("div");
				card.classList.add("wide-card");
				card.innerHTML += '<span class="title">' + question + '</span>';

				let choiceAnswer = choiceAnswers[question];
				let answerObjects = choiceAnswer["answers"];

				let counts = {};
				let choices = [];
				let colors = [];

				Object.keys(choiceAnswer["choices"]).map(key => {
					choices.push(choiceAnswer["choices"][key]);
					counts[choiceAnswer["choices"][key]] = 0;
				});

				let answers = [];

				Object.keys(answerObjects).map(key => {
					let answerInfo = answerObjects[key];
					let answer = answerInfo["answer"];
					answers.push(answer);
				});

				for(let i = 0; i < answers.length; i++) {
					let answer = answers[i];
					counts[answer] = counts[answer] ? counts[answer] + 1 : 1;
				}

				let index = 0;
				let total = 100;
				let percentages = {};

				choices.map(choice => {
					index++;

					let count = counts[choice];
					let percentage = parseInt(((count * 100) / answers.length).toFixed(0));
					
					if(index === choices.length) {
						percentages[choice] = total;
					} else {
						percentages[choice] = percentage;
						total -= percentage;
					}

					colors.push(randomRGB());

					card.innerHTML += '<span>' + choice + ': ' + percentages[choice].toFixed(0) + '%</span>';
				});

				let chart = generateChart(choices, counts, colors);
				
				card.appendChild(chart);

				divAnswersList.appendChild(card);
			});
		} else {
			Notify.alert({
				color:"var(--accent-contrast)",
				background:"var(--accent-gradient)",
				title:"No Answers Found",
				description:"No answers were found..."
			});
		}
	}).catch(error => {
		console.log(error);
	});

	function generateChart(labels, dataset, colors) {
		let wrapper = document.createElement("div");
		let canvas = document.createElement("canvas");

		wrapper.classList.add("chart-wrapper");

		let data = {
			labels: labels,
			datasets: [{
				data: Object.values(dataset),
				backgroundColor: colors,
				hoverOffset: 4
			}]
		};

		let config = {
			type: "doughnut",
			data,
			options: {}
		};

		new Chart(canvas, config);

		wrapper.appendChild(canvas);

		return wrapper;
	}

	function getChoiceAnswers(answers) {
		let choiceAnswers = {};
		Object.keys(answers).map(key => {
			let answer = answers[key];
			if(answer["question_type"] === "choice" && !empty(answer["answer"])) {
				if(answer["question"] in choiceAnswers) {
					choiceAnswers[answer["question"]]["answers"].push(answer);
				} else {
					choiceAnswer = {
						question: answer["question"],
						choices: answer["choices"]
					};
					choiceAnswers[answer["question"]] = choiceAnswer;
					choiceAnswers[answer["question"]]["answers"] = [answer];
				}
			}
		});
		return choiceAnswers;
	}

	function getAnswers() {
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
			xhr.open("GET", "./api/answers/read-all.php?key=8c068d98-874e-46ab-b2a1-5a5eb45a40a6");
			xhr.send();
		});
	}

	function empty(string) {
		if(string != null && typeof string != "undefined" && string.trim() != "" && JSON.stringify(string) != "" && JSON.stringify(string) != "{}") {
			return false;
		}
		return true;
	}

	function randomBetween(min, max) {
		return min + Math.floor(Math.random() * (max - min + 1));
	}

	function randomRGB() {
		let r = randomBetween(0, 255);
		let g = randomBetween(0, 255);
		let b = randomBetween(0, 255);
		return rgb = `rgb(${r},${g},${b})`;
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