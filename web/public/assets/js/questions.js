document.addEventListener("DOMContentLoaded", () => {

    let sessionToken = localStorage.getItem("sessionToken");

        verifySession(sessionToken).then(result => {
            try {

                let wideCard;
                let cardWrap = document.getElementById("cards");
                const xhr = new XMLHttpRequest();
                let layer = document.getElementById("cards");

                let from = 60;
                let to = 65;

                let title = document.getElementById("questions");
                title.innerText = "All Questions";
                let allTab = document.getElementById("question-summary");
                let editTab = document.getElementById("editable-questions");
                let fixedTab = document.getElementById("fixed-questions");

                let contentEditable = document.getElementById("content-editable");
                let contentNotEditable = document.getElementById("content-not-editable");
                let seperator = document.getElementById("sep");



                allTab.addEventListener("click", ()=> {
                    allTab.classList.add("active");
                    editTab.classList.remove("active");
                    fixedTab.classList.remove("active");
                    title.innerText = "All Questions";

                    contentEditable.classList.remove("hidden");
                    contentNotEditable.classList.remove("hidden");

                    seperator.classList.remove("hidden");
                    seperator.classList.add("seperator");

                });

                editTab.addEventListener("click", ()=> {
                    allTab.classList.remove("active");
                    editTab.classList.add("active");
                    fixedTab.classList.remove("active");
                    title.innerText = "Editable Questions";

                    contentEditable.classList.remove("hidden");
                    contentNotEditable.classList.add("hidden");

                    seperator.classList.add("hidden");
                    seperator.classList.remove("seperator");

                });

                fixedTab.addEventListener("click", ()=> {
                    allTab.classList.remove("active");
                    editTab.classList.remove("active");
                    fixedTab.classList.add("active");
                    title.innerText = "Non-editable Questions";

                    contentEditable.classList.add("hidden");
                    contentNotEditable.classList.remove("hidden");

                    seperator.classList.add("hidden");
                    seperator.classList.remove("seperator");
                });

                function getQuestions(from, to) {
                    xhr.addEventListener("readystatechange", function () {
                        if (xhr.readyState === XMLHttpRequest.DONE) {
                            let json = xhr.responseText;
                            let users = JSON.parse(json).data;
                            let editableQs = {};
                            let fixedQs = {} ;
                            let keys = Object.keys(users);

                            keys.map(key=> {
                                if (users[key].answer === null || users[key].answer === "") {
                                    editableQs[users[key].question] = users[key];
                                } else {
                                    if (users[key].question in editableQs) {
                                        delete editableQs[users[key].question];
                                    }
                                }
                                if (users[key].answer !== null || users[key].answer !== "") {
                                    fixedQs[users[key].question] = users[key];
                                } else {
                                    if (users[key].question in fixedQs) {
                                        delete fixedQs[users[key].question];
                                    }
                                }
                            });

                            let keysOfEditable = Object.keys(editableQs);
                            console.log(editableQs);
                            keysOfEditable.map(key => {
                                let questionId = editableQs[key].questionID;
                                let question = editableQs[key].question;
                                let questionType = editableQs[key].question_type;
                                let choices = editableQs[key].choices;
                                let answered = false;

                                console.log(editableQs[key].questionID);
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
                        '        <div class="text-margin">\n' +
                        '            <span class="card-heading">Question ID: <span class="card-text">'+ questionID +'</span> </span>\n' +
                        '        </div>\n' +
                        '\n' +
                        '        <div class="text-margin">\n' +
                        '            <span class="card-heading">Question: <span class="card-text">'+ q +'</span> </span>\n' +
                        '        </div>\n' +
                        '\n' +
                        '        <div class="text-margin">\n' +
                        '            <span class="card-heading">Character Limit: <span class="card-text">'+ questionLim +'</span></span>\n' +
                        '        </div>\n' +
                        '\n' +
                        '        <div class="text-margin">\n' +
                        '            <span class="card-heading">Type: <span class="card-text">'+ questionType +'</span> </span>\n' +
                        '        </div>\n' +

                        '    </div>'

                    cardAnchor.appendChild(wideCard);
                    if(answered) {
                        contentNotEditable.appendChild(cardAnchor);
                    } else {
                        contentEditable.appendChild(cardAnchor);
                        wideCard.innerHTML +=  '\n' +
                        '       <div class="card-button-wrapper">\n' +
                        '             <button type="button" class="delete-button"><svg class="SVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"/></svg></button>\n' +
                        '             <button type="button" class="edit-button"><svg class="SVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"/></svg></button>\n' +
                        '       </div>\n' +
                        ''
                    }

                }

                getQuestions(from, to);

                function choiceCard(wideCard, questionID, q, questionLim, questionType, choices) {

                    try {
                        let cardAnchor = document.createElement("a");

                        wideCard = document.createElement("div");
                        wideCard.classList.add("question-wide-card");
                        wideCard.id = "wide-card";

                        let choice = [];
                        let choiceKeys = Object.keys(choices);

                        for (let j = 0; j < choiceKeys.length; j++){
                            choice.push(choices[j+1]);
                        }
                        let choiceStr = choice.join(", ");

                        wideCard.innerHTML = '\n' +
                            '        <div class="text-margin">\n' +
                            '            <span class="card-heading">Question ID: <span class="card-text">' + questionID + '</span> </span>\n' +
                            '        </div>\n' +
                            '\n' +
                            '        <div class="text-margin">\n' +
                            '            <span class="card-heading">Question: <span class="card-text">' + q + '</span> </span>\n' +
                            '        </div>\n' +
                            '\n' +
                            '        <div class="text-margin">\n' +
                            '            <span class="card-heading">Type: <span class="card-text">' + questionType + '</span> </span>\n' +
                            '        </div>\n' +
                            '\n' +
                            '        <div class="text-margin">\n' +
                            '            <span class="card-heading">Choices: <span class="card-text">' + choiceStr + '</span> </span>\n' +
                            '        </div>\n' +
                            '\n' +
                            '    </div>'

                        cardAnchor.appendChild(wideCard);


                        wideCard.getElementsByClassName("delete-button")[0].addEventListener("click", () => {
                            // API request to delete the question

                            try {
                                if (xhr.responseText === "") {
                                    document.getElementById(questionID).remove();
                                } else {
                                    console.log(xhr.responseText);
                                }
                            } catch(error) {
                                console.log(error);
                            }
                        });

                        if(answered) {
                            contentNotEditable.appendChild(cardAnchor);
                        } else {
                            contentEditable.appendChild(cardAnchor);
                            wideCard.innerHTML +=  '\n' +
                            '       <div class="card-button-wrapper">\n' +
                            '             <button type="button" class="delete-button"><svg class="SVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M268 416h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12zM432 80h-82.41l-34-56.7A48 48 0 0 0 274.41 0H173.59a48 48 0 0 0-41.16 23.3L98.41 80H16A16 16 0 0 0 0 96v16a16 16 0 0 0 16 16h16v336a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128h16a16 16 0 0 0 16-16V96a16 16 0 0 0-16-16zM171.84 50.91A6 6 0 0 1 177 48h94a6 6 0 0 1 5.15 2.91L293.61 80H154.39zM368 464H80V128h288zm-212-48h24a12 12 0 0 0 12-12V188a12 12 0 0 0-12-12h-24a12 12 0 0 0-12 12v216a12 12 0 0 0 12 12z"/></svg></button>\n' +
                            '             <button type="button" class="edit-button"><svg class="SVG" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!-- Font Awesome Free 5.15.3 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free (Icons: CC BY 4.0, Fonts: SIL OFL 1.1, Code: MIT License) --><path d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"/></svg></button>\n' +
                            '       </div>\n' +
                            ''
                        }





                    } catch {
                        console.log("error");
                    }


                }



                document.getElementById("prev-button").addEventListener("click", function () {
                    layer.innerHTML = "";
                    from = to - 4 ;
                    to = to - 5 ;
                    getQuestions(from, to);
                });


                document.getElementById("next-button").addEventListener("click", function () {
                    layer.innerHTML = "";
                    from = to + 1;
                    to = to + 5;
                    getQuestions(from, to);
                });






                /**
                 * @desc on DOM loaded, it checks to see if localStorage has the key:'theme', and if it does is it's value:'dark'.
                 *      when that is true, it sets the body with an attribute to turn the theme dark.
                 */
                if(localStorage.getItem('theme') === 'dark') {
                    document.body.setAttribute('data-theme', 'dark');
                } else {
                    document.body.removeAttribute('data-theme', 'dark');
                }

            } catch(error) {
                console.trace(error);
            }
        }).catch(error => {
            window.location.replace("./login.php");
        });





});