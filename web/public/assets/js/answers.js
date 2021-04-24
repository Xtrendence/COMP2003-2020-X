document.addEventListener("DOMContentLoaded", () => {
    //verifySession(localStorage.getItem("sessionToken")).then(result => {

        let url = new URL(window.location.href);
        let patID = url.searchParams.get("id");

        let titleCard = document.getElementById("question-answer");
        let title = "Questions & Answers - User ";
        let addId = title.concat(patID);
        titleCard.innerText = addId;

        let dropdownButton = document.getElementById("dropdown-button");
        let dropdownContent = document.getElementById("dropdown-content");
        let cardContent = document.getElementById("card-content");
        
        let qAll = document.getElementById("dd-1");
        let qMost = document.getElementById("dd-2");
        let qAnswered = document.getElementById("dd-3");
        let qUnanswered = document.getElementById("dd-4");

        let recentNoAns = document.getElementById("content-not-answered-recent");
        let contentNoAns = document.getElementById("content-not-answered");
        let contentAns = document.getElementById("content-answered");

        let seperator = document.getElementById("sep");
        let seperator2 = document.getElementById("sep2");

        let sessionToken = localStorage.getItem("sessionToken");

        function theSeperators() {
            if (recentNoAns.childNodes.length !== 0){
                seperator.classList.remove("hidden");
                seperator.classList.add("seperator");
            } else {
                seperator.classList.remove("seperator");
                seperator.classList.add("hidden");
            }
            if (contentAns.childNodes.length !== 0){
                seperator2.classList.remove("hidden");
                seperator2.classList.add("seperator");
            } else {
                seperator2.classList.remove("seperator");
                seperator2.classList.add("hidden");
            }
        }

        dropdownButton.addEventListener('click', function() {
            if (dropdownContent.classList.contains("hidden")) {
                dropdownContent.classList.remove("hidden");
                dropdownContent.classList.add("dropdown-content");
                dropdownButton.classList.add("dropdown-button-radius");
                cardContent.classList.add("card-container");
            }
            else {
                dropdownContent.classList.add("hidden");
                dropdownButton.classList.remove("dropdown-button-radius");
                cardContent.classList.remove("card-container");
            }
        });

        qAll.addEventListener('click', function() {
            dropdownButton.innerHTML = "All Questions";
            dropdownContent.classList.add("hidden");
            dropdownButton.classList.remove("dropdown-button-radius");

            let caretContainer = document.createElement("div");
            caretContainer.classList.add("caret-container");
            let rightCaret = document.createElement("span");
            rightCaret.classList.add("right-caret");
            
            let leftCaret = document.createElement("span");
            leftCaret.classList.add("left-caret");

            caretContainer.appendChild(leftCaret);
            caretContainer.appendChild(rightCaret);
            dropdownButton.appendChild(caretContainer);

            if (contentAns.classList.contains("hidden")) {
                contentAns.classList.remove("hidden");
            }
            if (contentNoAns.classList.contains("hidden")) {
                contentNoAns.classList.remove("hidden");
            }
            if (recentNoAns.classList.contains("hidden")) {
                recentNoAns.classList.remove("hidden")
            }
            theSeperators();
        });

        qMost.addEventListener('click', function() {
            dropdownButton.innerHTML = "Most Recent Question";
            dropdownContent.classList.add("hidden");
            dropdownButton.classList.remove("dropdown-button-radius");

            let caretContainer = document.createElement("div");
            caretContainer.classList.add("caret-container");
            let rightCaret = document.createElement("span");
            rightCaret.classList.add("right-caret");
            
            let leftCaret = document.createElement("span");
            leftCaret.classList.add("left-caret");

            caretContainer.appendChild(leftCaret);
            caretContainer.appendChild(rightCaret);
            dropdownButton.appendChild(caretContainer);

            if (recentNoAns.classList.contains("hidden")) {
                recentNoAns.classList.remove("hidden");
            }
            if (!contentAns.classList.contains("hidden")) {
                contentAns.classList.add("hidden");
            }
            if (!contentNoAns.classList.contains("hidden")) {
                contentNoAns.classList.add("hidden");
            }
            seperator.classList.add("hidden");
            seperator2.classList.add("hidden");
            seperator.classList.remove("seperator");
            seperator2.classList.remove("seperator");
        });

        qAnswered.addEventListener('click', function() {
            dropdownButton.innerHTML = "Answered Questions";
            dropdownContent.classList.add("hidden");
            dropdownButton.classList.remove("dropdown-button-radius");

            let caretContainer = document.createElement("div");
            caretContainer.classList.add("caret-container");
            
            let rightCaret = document.createElement("span");
            rightCaret.classList.add("right-caret");

            let leftCaret = document.createElement("span");
            leftCaret.classList.add("left-caret");

            caretContainer.appendChild(leftCaret);
            caretContainer.appendChild(rightCaret);
            dropdownButton.appendChild(caretContainer);

            if (contentAns.classList.contains("hidden")) {
                contentAns.classList.remove("hidden");
            }
            if (!contentNoAns.classList.contains("hidden")) {
                contentNoAns.classList.add("hidden");
            }
            if (!recentNoAns.classList.contains("hidden")) {
                recentNoAns.classList.add("hidden");
            }
            seperator.classList.add("hidden");
            seperator2.classList.add("hidden");
            seperator.classList.remove("seperator");
            seperator2.classList.remove("seperator");
        });

        qUnanswered.addEventListener('click', function() {
            dropdownButton.innerHTML = "Unanswered Questions";
            dropdownContent.classList.add("hidden");
            dropdownButton.classList.remove("dropdown-button-radius");

            let caretContainer = document.createElement("div");
            caretContainer.classList.add("caret-container");
            
            let rightCaret = document.createElement("span");
            rightCaret.classList.add("right-caret");

            let leftCaret = document.createElement("span");
            leftCaret.classList.add("left-caret");

            caretContainer.appendChild(leftCaret);
            caretContainer.appendChild(rightCaret);
            dropdownButton.appendChild(caretContainer);

            if (contentNoAns.classList.contains("hidden")) {
                contentNoAns.classList.remove("hidden");
            }
            if (recentNoAns.classList.contains("hidden")) {
                recentNoAns.classList.remove("hidden")
            }
            if (!contentAns.classList.contains("hidden")) {
                contentAns.classList.add("hidden");
            }
            seperator.classList.remove("seperator");
            seperator2.classList.add("hidden");
            seperator.classList.add("hidden");
            seperator2.classList.remove("seperator");
        });

        function loadInformation () {
            let xhr = new XMLHttpRequest();
            xhr.addEventListener("readystatechange", function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    try {
                        let json = xhr.responseText;
                        let ans = JSON.parse(json);
                        let keys = Object.keys(ans["data"]);

                        recentNoAns.innerHTML = "";
                        contentNoAns.innerHTML = "";
                        contentAns.innerHTML = "";
                        let quest = ans["data"];

                        for (let i = 0; i < keys.length; i++){
                            let questionId = quest[keys[i]]["questionID"];
                            let question = quest[keys[i]]["question"];
                            let questionType = quest[keys[i]]["question_type"];
                            let answer = quest[keys[i]]["answer"];
                            let choices = quest[keys[i]]["choices"];

                            let cardDiv = document.createElement("div");
                            cardDiv.classList.add("wide-card");
                            cardDiv.id = i;

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
                                let choiceStr = choice.join(",");
                                span.innerHTML = ("<br />Question Type: " + questionType + "<br />Choices: " + choiceStr + "<br />Answer: " + answer);
                            } else {
                                let charLim = quest[i]["question_charLim"];
                                span.innerHTML = ("<br />Question Type: " + questionType + "<br />Character Limit: " + charLim + "<br />Answer: " + answer);
                            }

                            let spanContainer = document.createElement("div");
                            spanContainer.classList.add("text-wrapper");

                            let titleContainer = document.createElement("div");
                            titleContainer.classList.add("question-wrapper");

                            spanContainer.appendChild(span)
                            titleContainer.appendChild(titleSpan);
                            cardDiv.appendChild(titleContainer);
                            cardDiv.appendChild(spanContainer);
                            if (answer == "") {
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
                            } else {
                                contentAns.appendChild(cardDiv);
                            }
                        }

                        let recentQuestion = contentNoAns.lastChild;
                        recentNoAns.appendChild(recentQuestion);

                        theSeperators();
                    } catch(error) {
                        seperator.classList.add("hidden");
                        seperator2.classList.add("hidden");
                        seperator.classList.remove("seperator");
                        seperator2.classList.remove("seperator");
                        console.log(error);
                    }
                }
            });
            xhr.open("GET", "http://localhost/COMP2003-2020-X/web/public/api/answers/read-user.php?id=" + patID + "&key=8c068d98-874e-46ab-b2a1-5a5eb45a40a6", true);
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
            xhr.open("DELETE", "./api/questions/delete.php?key=8c068d98-874e-46ab-b2a1-5a5eb45a40a6", true);
            xhr.send(JSON.stringify(body));
            //location.reload(true); 
        }

        loadInformation()

        /**
         * @desc on DOM loaded, it checks to see if localStorage has the key:'theme', and if it does is it's value:'dark'.
         *      when that is true, it sets the body with an attribute to turn the theme dark.
         */
        checkTheme()

    //}).catch(error => {
    //    window.location.replace("./login.php");
    //});
});