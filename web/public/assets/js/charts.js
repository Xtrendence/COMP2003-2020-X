document.addEventListener("DOMContentLoaded", () => {
	let sessionToken = localStorage.getItem("sessionToken");

	verifySession(sessionToken).then(result => {
		const Notify = new XNotify("BottomRight");

		let spanTitle = document.getElementById("title-span");
		
		let buttonExport = document.getElementById("export-button");

		let patientID = new URL(window.location.href).searchParams.get("id");

		let timeFrom = previousWeek(new Date());
		let timeTo = new Date();
		let timespan = "";

		checkTheme();

		getData(timeFrom, timeTo);

		spanTitle.textContent = "Falls Chart - User " + patientID;

		buttonExport.addEventListener("click", () => {
			let pathname = window.location.pathname;
			let frame = document.createElement("iframe");
			frame.classList.add("hidden");
			frame.src = pathname.substring(0, pathname.lastIndexOf('/')) + "/api/falls/export.php?id=" + patientID + "&key=" + result.token;
			frame.addEventListener("load", () => {
				setTimeout(() => {
					frame.remove();
				}, 100);
			});
			document.body.appendChild(frame);
		});

		function getData(from, to) {

		}

		// Navigates to today's date on the chart.
		function navigateToday() {
			let from = previousWeek(new Date());
			let to = new Date();
			timeFrom = from;
			timeTo = to;
			getData(from, to);
		}

		// Navigates to the previous week.
		function navigatePrevious() {
			let from = previousWeek(timeFrom);
			let to = timeFrom;
			timeFrom = from;
			timeTo = to;
			getData(from, to);
		}

		// Navigates to the next week.
		function navigateNext() {
			let from = timeTo;
			let to = nextWeek(timeTo);
			if (to <= new Date()) {
				timeFrom = from;
				timeTo = to;
				getData(from, to);
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
	}).catch(error => {
		console.log(error);
		// window.location.replace("./login.php");
	});
});