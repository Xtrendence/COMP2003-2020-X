document.addEventListener("DOMContentLoaded", () => {
	let sessionToken = localStorage.getItem("sessionToken");

	verifySession(sessionToken).then(result => {
		try {
			const Notify = new XNotify("BottomRight");

			let spanTime = document.getElementById("time-span");

			let divChartWrapper = document.getElementById("chart-wrapper");
			
			let buttonPrevious = document.getElementById("previous-button");
			let buttonThisWeek = document.getElementById("this-week-button");
			let buttonNext = document.getElementById("next-button");
			let buttonExport = document.getElementById("export-button");

			let timeFrom = previousWeek(new Date());
			let timeTo = new Date();
			let timespan = "";

			checkTheme();

			getData(timeFrom, timeTo).then(data => {
				processData(data);
			}).catch(error => {
				console.log(error);
				Notify.error({
					title: "Error",
					description: error
				});
			});

			buttonPrevious.addEventListener("click", () => {
				navigatePrevious();
			});

			buttonThisWeek.addEventListener("click", () => {
				navigateToday();
			});

			buttonNext.addEventListener("click", () => {
				navigateNext();
			});

			buttonExport.addEventListener("click", () => {
				let pathname = window.location.pathname;
				let frame = document.createElement("iframe");
				frame.classList.add("hidden");
				frame.src = pathname.substring(0, pathname.lastIndexOf('/')) + "/api/falls/export-all.php?key=" + result.token;
				frame.addEventListener("load", () => {
					setTimeout(() => {
						frame.remove();
					}, 100);
				});
				document.body.appendChild(frame);
			});

			function processData(data) {
				let from = timeFrom;
				let to = timeTo;

				timespan = formatDate(from, "/") + " - " + formatDate(to, "/");
				spanTime.textContent = timespan;

				let days = {};
				let chartLabels = [];
				let chartData = [];

				for (let i = 0; i < 7; i++) {
					let dateTime = new Date(from.getTime() + (60 * 60 * 24 * i * 1000));
					let labelDate = formatDate(dateTime, "/");
					let formatted = labelDate.slice(-5);
					chartLabels.push(formatted);

					let date = formatDate(dateTime, "-").toString();
					days[date] = 0;
				}

				if ("data" in data) {
					let falls = data.data;
					Object.keys(falls).map(key => {
						let fall = falls[key];
						let dateTime = fall["fall_date"].toString().replace(" ", "T");
						let date = formatDate(dateTime, "-");
						days[date] = date in days ? days[date] + 1 : 1;
					});
				}

				Object.keys(days).map(key => {
					chartData.push(days[key]);
				});

				generateChart(chartLabels, chartData);
			}

			function generateChart(labels, data) {
				let canvas = document.createElement("canvas");
				canvas.classList.add("chart");
				new Chart(canvas, {
					type:"line",
					data: {
						labels:labels,
						datasets:[{
							label:"Falls",
							backgroundColor:"rgba(0,0,0,0)",
							borderColor:"rgb(95,103,129)",
							data:data
						}],
					},
					options: {
						responsive:true,
						legend: {
							display:true
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
				});

				divChartWrapper.innerHTML = "";
				divChartWrapper.appendChild(canvas);
			}

			function getData(from, to) {
				return new Promise((resolve, reject) => {
					let endpoint = "./api/falls/read-all-date.php?from=" + formatDateTime(from) + "&to=" + formatDateTime(to) + "&key=" + result.token;

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

					xhr.open("GET", endpoint, true);
					xhr.send();
				});
			}

			// Navigates to today's date on the chart.
			function navigateToday() {
				let from = previousWeek(new Date());
				let to = new Date();
				timeFrom = from;
				timeTo = to;
				getData(from, to).then(data => {
					processData(data);
				}).catch(error => {
					console.log(error);
					Notify.error({
						title: "Error",
						description: error
					});
				});
			}

			// Navigates to the previous week.
			function navigatePrevious() {
				let from = previousWeek(timeFrom);
				let to = timeFrom;
				timeFrom = from;
				timeTo = to;
				getData(from, to).then(data => {
					processData(data);
				}).catch(error => {
					console.log(error);
					Notify.error({
						title: "Error",
						description: error
					});
				});
			}

			// Navigates to the next week.
			function navigateNext() {
				let from = timeTo;
				let to = nextWeek(timeTo);
				if (to <= new Date()) {
					timeFrom = from;
					timeTo = to;
					getData(from, to).then(data => {
						processData(data);
					}).catch(error => {
						console.log(error);
						Notify.error({
							title: "Error",
							description: error
						});
					});
				} else {
					Notify.error({
						title: "Error",
						description: "Time travel is strictly prohibited."
					});
				}
			}

			// Format a date to YYYY-MM-DD where the hyphen can be any character.
			function formatDate(date, separator) {
				let d = new Date(date), month = "" + (d.getMonth() + 1), day = "" + d.getDate(), year = d.getFullYear();

				if (month.length < 2) {
					month = "0" + month;
				}
				if (day.length < 2) {
					day = "0" + day;
				}
				return [year, month, day].join(separator);
			}

			// Format a date to YYYY-MM-DD HH:MM:SS.
			function formatDateTime(date) {
				return date.getFullYear() + "-" +
					("00" + (date.getMonth() + 1)).slice(-2) + "-" +
					("00" + date.getDate()).slice(-2) + "+" +
					("00" + date.getHours()).slice(-2) + ":" +
					("00" + date.getMinutes()).slice(-2) + ":" +
					("00" + date.getSeconds()).slice(-2);
			}

			// Get the previous week's date.
			function previousWeek(date) {
				return new Date(date.getTime() - (60 * 60 * 24 * 6 * 1000));
			}

			// Get next week's date.
			function nextWeek(date) {
				return new Date(date.getTime() + (60 * 60 * 24 * 6 * 1000));
			}
		} catch(error) {
			console.trace(error);
		}
	}).catch(error => {
		console.log(error);
		window.location.replace("./login.php");
	});
});

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