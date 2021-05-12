document.addEventListener("DOMContentLoaded", () => {
    let sessionToken = localStorage.getItem("sessionToken");

    verifySession(sessionToken).then(result => {
        let multipleChoiceRadioButton = document.getElementById("multiple-choice-op");
        let longAnswerRadioButton = document.getElementById("long-answer");

        let questionText = document.getElementById("question");
        let multipleOption = document.getElementById("multiple");
        let numberOfChoices = document.getElementById("number-of-choices");
        let choiceFields = document.getElementsByClassName("choice-field");
        let optionContainer = document.getElementById("multiple-sub");

        let longAnswerText = document.getElementById("single");
        let characterLimit = document.getElementById("characters");

        let submitButton = document.getElementById("submit");
        let submitText = document.getElementById("sub");

        let url = new URL(window.location.href);
        let qID = url.searchParams.get("id");
        let titleCard = document.getElementById("user-question");
        let title = "Ask a Question - Question ";
        let addID = title.concat(qID);
        titleCard.innerText = addID;

        let hidInputID = document.createElement("input");
        hidInputID.classList.add("hidden");
        let hidInputType = document.createElement("input");
        hidInputType.classList.add("hidden");

        function getQuestion(){
            let xhr = new XMLHttpRequest();

            xhr.addEventListener("readystatechange", function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    let json = xhr.responseText;
                    let questions = JSON.parse(json);
                    let keys = Object.keys(questions);

                    try{
                        let questionID = questions["questionID"];
                        let questionTxt = questions["question"];
                        let questionLim = questions["question_charlim"];
                        let questionType = questions["question_type"];
                        let questionChoice = questions["choices"];

                        hidInputType.setAttribute("value", questionType);

                        questionText.setAttribute("value", questionTxt);
                        characterLimit.setAttribute("value", questionLim);

                        if(questionType == "choice"){
                            multipleOption.classList.remove("hidden");
                            multipleChoiceRadioButton.classList.add("active");
                            longAnswerText.classList.add("hidden");
                            longAnswerRadioButton.classList.remove("active");
                            multipleChoiceRadioButton.classList.add("active");

                            let choiceLength = Object.keys(questionChoice);
                            let leng = choiceLength.length.toString();

                            for (let x = 1; x <= choiceLength.length; x++){
                                numberOfChoices.setAttribute("value", leng);
                                let input = document.createElement("input");
                                input.setAttribute("value", questionChoice[x]);
                                input.type = "text";
                                input.classList.add("choice-field");
                                optionContainer.appendChild(input);
                            }
                        }
                        else {
                            longAnswerText.classList.remove("hidden");
                            longAnswerRadioButton.classList.add("active");
                            multipleChoiceRadioButton.classList.remove("active");
                            multipleOption.classList.add("hidden");
                            multipleChoiceRadioButton.classList.remove("active");
                        }
                    }
                    catch(error) {
                        console.log(error);
                    }
                }
            });
			
            xhr.open("GET", "./api/questions/read.php?id=" + qID + "&key=" + result.token, true);
            xhr.send();
        }

        submitButton.addEventListener("click", function (){
            let xhr = new XMLHttpRequest();
            let changes;
            if (multipleChoiceRadioButton.classList.contains("active")) {
                let choiceOptions = [];
                let choiceFields = document.getElementsByClassName("choice-field");
                for (let i = 0; i < choiceFields.length; i++) {
                    choiceOptions.push(choiceFields[i].value);
                    choiceFields[i].value = "";
                }
                changes = {
                    questionID: hidInputID.value,
                    question: questionText.value,
                    question_type: hidInputType.value,
                    choices: choiceOptions
                };
            }
            else{
                changes = {
                    questionID: hidInputID.value,
                    question: questionText.value,
                    question_charLim: characterLimit.value,
                    question_type: hidInputType.value
                };
            }
            xhr.addEventListener("readystatechange", function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    getQuestion();
                }
            });
            xhr.open("PUT", "./api/users/update.php?key=" + result.token, true);
            xhr.send(JSON.stringify(changes));
        });

        getQuestion();

        /**
         * @desc on DOM loaded, it checks to see if localStorage has the key:'theme', and if it does is it's value:'dark'.
         *      when that is true, it sets the body with an attribute to turn the theme dark.
         */
        if(localStorage.getItem('theme') === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme', 'dark');
        }
    }).catch(error => {
        window.location.replace("./login.php");
    });
});