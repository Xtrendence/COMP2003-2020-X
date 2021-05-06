document.addEventListener("DOMContentLoaded", () => {
	let sessionToken = localStorage.getItem("sessionToken");
	
	verifySession(sessionToken).then(result => {
		const Notify = new XNotify("BottomRight");

		checkTheme();

		let colorArray = [
			"7d2ee6",
			"c4a9de",
			"dbcfab",
			"53cfbe",
			"dbbf40",
			"db6f51",
			"d47da4",
			"49d169",
			"5571d9",
			"9bbcbf"
		];

		let buttonPieChart = document.getElementById("pie-chart-button");
		let buttonBarChart = document.getElementById("bar-chart-button");

		let divAnswersList = document.getElementById("answers-list");

		getData();

		buttonPieChart.addEventListener("click", () => {
			buttonPieChart.classList.add("active");
			buttonBarChart.classList.remove("active");
			getData();
		});

		buttonBarChart.addEventListener("click", () => {
			buttonPieChart.classList.remove("active");
			buttonBarChart.classList.add("active");
			getData();
		});

		function getData() {
			divAnswersList.innerHTML = "";

			getAnswers().then(answers => {
				if ("data" in answers) {
					let choiceAnswers = getChoiceAnswers(answers.data);

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

						for (let i = 0; i < answers.length; i++) {
							let answer = answers[i];
							counts[answer] = counts[answer] ? counts[answer] + 1 : 1;
						}

						let index = 0;
						let total = 100;
						let percentages = {};

						choices.map(choice => {
							colors.push("#" + colorArray[index]);

							index++;

							let count = counts[choice];
							let percentage = parseInt(((count * 100) / answers.length).toFixed(0));
					
							if (index === choices.length) {
								percentages[choice] = total;
							} else {
								percentages[choice] = percentage;
								total -= percentage;
							}

							card.innerHTML += '<span>' + choice + ': ' + percentages[choice].toFixed(0) + '%</span>';
						});

						let chart;
						if (buttonPieChart.classList.contains("active")) {
							chart = generatePieChart(choices, counts, colors);
						} else {
							chart = generateBarChart(choices, counts, colors);
						}
				
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
		}

		function generatePieChart(labels, dataset, colors) {
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

			let options = {
				legend: {
					labels: {
						fontColor: document.body.getAttribute("data-theme") === "dark" ? "rgb(255,255,255)" : "rgb(75,75,75)",
						fontSize: 14,
					}
				},
			};

			let config = {
				type: "doughnut",
				data,
				options: options
			};

			new Chart(canvas, config);

			Chart.Legend.prototype.afterFit = function() {
				this.height = this.height + 20;
			};

			wrapper.appendChild(canvas);

			return wrapper;
		}

		function generateBarChart(labels, dataset, colors) {
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

			let options = {
				responsive:true,
				legend: {
					display:false
				},
				scales: {
					xAxes: [{
						gridLines: {
							color:document.body.getAttribute("data-theme") === "dark" ? "rgba(255,255,255,0.075)" : "rgba(0,0,0,0.2)",
							borderDash: [8, 4]
						}
					}],
					yAxes: [{
						gridLines: {
							color:document.body.getAttribute("data-theme") === "dark" ? "rgba(255,255,255,0.075)" : "rgba(0,0,0,0.2)",
							borderDash: [8, 4]
						},
						ticks: {
							stepSize:1
						}
					}]
				}
			}

			let config = {
				type: "bar",
				data,
				options: options
			};

			new Chart(canvas, config);

			Chart.Legend.prototype.afterFit = function() {
				this.height = this.height + 20;
			};

			wrapper.appendChild(canvas);

			return wrapper;
		}

		function getChoiceAnswers(answers) {
			let choiceAnswers = {};
			Object.keys(answers).map(key => {
				let answer = answers[key];
				if (answer["question_type"] === "choice" && !empty(answer["answer"])) {
					if (answer["question"] in choiceAnswers) {
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
					if (xhr.readyState === XMLHttpRequest.DONE) {
						if (validJSON(xhr.responseText)) {
							resolve(JSON.parse(xhr.responseText));
						} else {
							reject("Invalid JSON.");
						}
					}
				});
				xhr.open("GET", "./api/answers/read-all.php?key=" + result.token);
				xhr.send();
			});
		}

		function empty(string) {
			if (string != null && typeof string != "undefined" && string.trim() != "" && JSON.stringify(string) != "" && JSON.stringify(string) != "{}") {
				return false;
			}
			return true;
		}

		function validJSON(json) {
			try {
				let object = JSON.parse(json);
				if (object && typeof object === "object") {
					return object;
				}
			}
			catch(e) { }
			return false;
		}
	}).catch(error => {
		window.location.replace("./login.php");
	});
});