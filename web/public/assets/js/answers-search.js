document.addEventListener("DOMContentLoaded", () => {
	let sessionToken = localStorage.getItem("sessionToken");
	
	verifySession(sessionToken).then(result => {

        try {
            let title = document.getElementById("analysis");

            let choiceTab = document.getElementById("choice-summery");
            let customTab = document.getElementById("custom-search");
            let editTab = document.getElementById("editable-questions");

            let answerChoiceSummery = document.getElementById("answer-choice-summery");

            if(choiceTab.classList.contains("active")) {
                title.innerText = "Choice Question's Answer Summery";
                answerChoiceSummery.classList.remove("hidden");

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
								let id = md5(question);
								
								if (!document.getElementById(id)) {
									card.classList.add("wide-card");
									card.id = md5(question);
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
								}
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

				let md5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}
            }
        } catch(error) {
            console.trace(error);
        }
	}).catch(error => {
		window.location.replace("./login.php");
	});
});