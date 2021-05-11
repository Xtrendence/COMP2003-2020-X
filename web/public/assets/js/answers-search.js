document.addEventListener("DOMContentLoaded", () => {
	let sessionToken = localStorage.getItem("sessionToken");
	
	verifySession(sessionToken).then(result => {

        try {
            const Notify = new XNotify("BottomRight");

            let title = document.getElementById("analysis");

            let choiceTab = document.getElementById("choice-summary");
            let customTab = document.getElementById("custom-search");
            let editTab = document.getElementById("editable-questions");

            let buttonPieChart = document.getElementById("pie-chart-button");
            let buttonBarChart = document.getElementById("bar-chart-button");
            let divAnswersList = document.getElementById("answers-list");

            let customAnswerData = document.getElementById("custom-answer-data")

            let answerChoiceSummary = document.getElementById("answer-choice-summary");
            let answerCustomSummary = document.getElementById("answer-custom-summary");
            let editableQuestions = document.getElementById("editable-question");

            let recentNoAns = document.getElementById("content-not-answered-recent");
            let contentNoAns = document.getElementById("content-not-answered");

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

            let md5 = function(d){var r = M(V(Y(X(d),8*d.length)));return r.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

            choiceTab.addEventListener("click", ()=> {
                choiceTab.classList.add("active");
                customTab.classList.remove("active");
                editTab.classList.remove("active");

                displayChartInfo()
            });

            customTab.addEventListener("click", ()=> {
                choiceTab.classList.remove("active");
                customTab.classList.add("active");
                editTab.classList.remove("active");

                customAnswerData.innerHTML = "";

                displayCustomInfo()
            });

            editTab.addEventListener("click", ()=> {
                choiceTab.classList.remove("active");
                customTab.classList.remove("active");
                editTab.classList.add("active");

                contentNoAns.innerHTML = "";
                recentNoAns.innerHTML = "";

                displayEditInfo()
            });

            function displayChartInfo() {
                title.innerText = "Choice Question's Answer Summary";

                answerChoiceSummary.classList.remove("hidden");
                answerCustomSummary.classList.add("hidden");
                editableQuestions.classList.add("hidden");

                getChoiceData();

                buttonPieChart.addEventListener("click", () => {
                    buttonPieChart.classList.add("active");
                    buttonBarChart.classList.remove("active");
                    getChoiceData();
                });

                buttonBarChart.addEventListener("click", () => {
                    buttonPieChart.classList.remove("active");
                    buttonBarChart.classList.add("active");
                    getChoiceData();
                });
            }

            function displayCustomInfo () {
                title.innerText = "Custom Question's Answer Summary";

                answerChoiceSummary.classList.add("hidden");
                answerCustomSummary.classList.remove("hidden");
                editableQuestions.classList.add("hidden");

                getCustomData()
            }

            function displayEditInfo () {
                title.innerText = "Unanswered Questions Available for Edit";

                answerChoiceSummary.classList.add("hidden");
                answerCustomSummary.classList.add("hidden");
                editableQuestions.classList.remove("hidden");

                getEditData()
            }

            function getChoiceData() {
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

            function getCustomData () {
                getAnswers().then(answers => {
                    if ("data" in answers) {
                        let customAnswers = getCustomAnswers(answers.data);

                        Object.keys(customAnswers).map(key => {
                            let customInfoAccess = customAnswers[key];
                            let card = document.createElement("div");
                            card.classList.add("new-wide");
                            card.innerHTML += '<span class="title">' + customInfoAccess["question"] + '</span>';
                            console.log(customInfoAccess);

                            Object.keys(customInfoAccess).map(index => {
                                card.innerHTML += '<span class="title">' + customInfoAccess["answers"][index]["answer"] + '</span>';
                                console.log(customInfoAccess["answers"][index]["answer"]);
                            });

                            customAnswerData.appendChild(card);
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

            function getCustomAnswers (answers) {
                let customAnswers = {};

                Object.keys(answers).map(key => {
                    let answer = answers[key];
                    
                    if (answer["question_type"] === "custom" && !empty(answer["answer"])) {
                        if (answer["question"] in customAnswers) {
                            customAnswers[answer["question"]]["answers"].push(answer);
                        } else {
                            customAnswer = {
                                question: answer["question"],
                            };
                            customAnswers[answer["question"]] = customAnswer;
                            customAnswers[answer["question"]]["answers"] = [answer];
                        }
                    }
                });
                return customAnswers;
            }

            function getEditData () {
                let xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        try {
                            let json = xhr.responseText;
                            let allQuestions = JSON.parse(json).data;
                            let editable = {};
                            let keys = Object.keys(allQuestions);
                            keys.map(key => {
                                if (allQuestions[key].answer === null || allQuestions[key].answer === "") {
                                    editable[allQuestions[key].question] = allQuestions[key];
                                } else {
                                    if (allQuestions[key].question in editable) {
                                        delete editable[allQuestions[key].question];
                                    }
                                }
                            });

                            let keysOfEditable = Object.keys(editable);
                                keysOfEditable.map(key => {
                                let questionId = editable[key].questionID
                                let question = editable[key].question;
                                let questionType = editable[key].question_type;
                                let choices = editable[key].choices;

                                let cardDiv = document.createElement("div");
                                cardDiv.classList.add("new-wide");

                                let titleSpan = document.createElement("span");
                                titleSpan.classList.add("title-span")
                                let span = document.createElement("span");
                                titleSpan.innerHTML = (question);
                                
                                if (questionType == "choice") {
                                    let choice = [];
                                    let choiceKeys = Object.keys(choices);

                                    for (let j = 0; j < choiceKeys.length; j++){
                                        choice.push(choices[j+1]);
                                    }
                                    let choiceStr = choice.join(", ");
                                    span.innerHTML = ("<br />Question Type: " + questionType + "<br />Choices: " + choiceStr);
                                } else {
                                    let charLim = editable[key].question_charLim;
                                    span.innerHTML = ("<br />Question Type: " + questionType + "<br />Character Limit: " + charLim);
                                }

                                let spanContainer = document.createElement("div");
                                spanContainer.classList.add("text-wrapper");

                                let titleContainer = document.createElement("div");
                                titleContainer.classList.add("question-wrapper");

                                spanContainer.appendChild(span)
                                titleContainer.appendChild(titleSpan);
                                cardDiv.appendChild(titleContainer);
                                cardDiv.appendChild(spanContainer);

                                let butContainer = document.createElement("div");
                                butContainer.classList.add("button-wrapper");

                                let delAnchor = document.createElement("a");
                                let delBut = document.createElement("button");
                                delBut.classList.add("action-button");
                                delBut.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"/></svg>';
                                delBut.addEventListener('click', function() {
                                    deleteQuestion(questionId);
                                });

                                delAnchor.appendChild(delBut);
                                butContainer.appendChild(delAnchor);

                                let editAnchor = document.createElement("a");
                                let editBut = document.createElement("button");
                                editBut.classList.add("action-button");
                                editBut.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Free 5.15.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M497.9 142.1l-46.1 46.1c-4.7 4.7-12.3 4.7-17 0l-111-111c-4.7-4.7-4.7-12.3 0-17l46.1-46.1c18.7-18.7 49.1-18.7 67.9 0l60.1 60.1c18.8 18.7 18.8 49.1 0 67.9zM284.2 99.8L21.6 362.4.4 483.9c-2.9 16.4 11.4 30.6 27.8 27.8l121.5-21.3 262.6-262.6c4.7-4.7 4.7-12.3 0-17l-111-111c-4.8-4.7-12.4-4.7-17.1 0zM124.1 339.9c-5.5-5.5-5.5-14.3 0-19.8l154-154c5.5-5.5 14.3-5.5 19.8 0s5.5 14.3 0 19.8l-154 154c-5.5 5.5-14.3 5.5-19.8 0zM88 424h48v36.3l-64.5 11.3-31.1-31.1L51.7 376H88v48z"/></svg>';

                                editAnchor.appendChild(editBut);
                                editAnchor.href = "./edit-question.php?id=" + questionId + "";
                                butContainer.appendChild(editAnchor);

                                cardDiv.appendChild(butContainer);
                                contentNoAns.appendChild(cardDiv);
                            });
                            let recentQuestion = contentNoAns.lastChild;
                            recentNoAns.appendChild(recentQuestion);
                        } catch(error) {
                            console.trace(error)
                        }
                    }
                });
                xhr.open("GET", "./api/answers/read-all.php?key=" + result.token, true);
                xhr.send();
            }

            function deleteQuestion(id) {
                let xhr = new XMLHttpRequest();
                let body = {
                        questionID: id
                };
    
                xhr.addEventListener("readystatechange", function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        let responseJSON = xhr.responseText;
                        try {
                            let response = JSON.parse(responseJSON);
                            let questionID = response["questionID"];
                        } catch(error){
                            console.log(error);
                        }
                    }
                });
                xhr.open("DELETE", "./api/questions/delete.php?key=" + result.token, true);
                xhr.send(JSON.stringify(body));
                location.reload(true); 
            }

            displayChartInfo()

            checkTheme();

        } catch(error) {
            console.trace(error);
        }
	}).catch(error => {
		window.location.replace("./login.php");
	});
});