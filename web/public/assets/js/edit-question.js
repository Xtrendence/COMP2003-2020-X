document.addEventListener("DOMContentLoaded", () => {
    const xhr = new XMLHttpRequest();
    let questionAutofill
    let numChoicesAutofill
    let choicesAutofill
    let characterLimitAutofill

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

    let sessionToken = localStorage.getItem("sessionToken");

    function getQuestion(){
        xhr.addEventListener("readystatechange", function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let json = xhr.responseText;
                let questions = JSON.parse(json);
                let keys = Object.keys(questions);
                console.log(json);
                try{
                    let question = questions;
                    for (let i = 0; i < keys.length; i++){
                        let questionID = question["questionID"];
                        let questionTxt = question["question"];
                        let questionLim = question["question_charLim"];
                        let questionType = question["question_type"];
                        let questionChoice = question["choices"];

                        questionText.setAttribute("value", questionTxt);
                        numberOfChoices.setAttribute("value", questionTxt);
                        numberOfChoices.setAttribute("value", questionTxt);
                        console.log(questionTxt);
                    }

                }
                catch{
                    console.error("error");
                }
            }
        });
        xhr.open("GET", "./api/questions/read.php?id=" + qID + "&key=8c068d98-874e-46ab-b2a1-5a5eb45a40a6" , true);
        xhr.send();
    }




    function checkForm() {
        let input = document.getElementsByTagName("input");
        let formComplete = true;
        for (let i = 0; i < input.length; i ++) {
            if (input[i].value.trim() === "" && !input[i].classList.contains("hidden") && !input[i].parentElement.classList.contains("hidden")) {
                input[i].classList.add("error");
                formComplete = false;
            } else {
                input[i].classList.remove("error");
            }
        }
        return formComplete;
    }

    multipleChoiceRadioButton.addEventListener("click", function() {
        let input = document.getElementsByTagName("input");
        for (let i = 0; i < input.length; i++) {
            input[i].classList.remove("error");
        }

        for (let i = 0; i < 2; i++) {
            choiceFields[i].value = "";
        }
        numberOfChoices.value = null;
        multipleOption.classList.remove("hidden");
        multipleChoiceRadioButton.classList.add("active");
        longAnswerText.classList.add("hidden");
        longAnswerRadioButton.classList.remove("active");
        multipleChoiceRadioButton.classList.add("active");

        if (optionContainer.children.length > 0) {
            optionContainer.innerHTML = "";
        }

        if (submitText.classList.contains("submission")) {
            submitText.classList.add("hidden");
            submitText.classList.remove("submission");
        }
    });

    longAnswerRadioButton.addEventListener("click", function() {
        let input = document.getElementsByTagName("input");
        for (let i = 0; i < input.length; i++) {
            input[i].classList.remove("error");
        }

        characterLimit.value = null;
        longAnswerText.classList.remove("hidden");
        longAnswerRadioButton.classList.add("active");
        multipleChoiceRadioButton.classList.remove("active");
        multipleOption.classList.add("hidden");
        multipleChoiceRadioButton.classList.remove("active");

        if (submitText.classList.contains("submission")) {
            submitText.classList.add("hidden");
            submitText.classList.remove("submission");
        }
    });

    numberOfChoices.addEventListener("keyup", function(e) {
        if (e.key.toLowerCase() === "backspace") {
            if (numberOfChoices.value > 2 || numberOfChoices.value <= 16) {
                optionContainer.innerHTML = "";
            }
        }
    });

    numberOfChoices.addEventListener("keyup", function() {
        optionContainer.innerHTML = "";
        if (numberOfChoices.value >= 2 && numberOfChoices.value <= 16) {
            numberOfChoices.classList.remove("error");
            for (let i = 2; i < (numberOfChoices.value); i++) {
                let input = document.createElement("input");
                input.type = "text";
                input.classList.add("choice-field");
                input.placeholder = "Choice " + (i + 1) + "...";
                optionContainer.appendChild(input);
            }
        } else {
            numberOfChoices.classList.add("error");
        }
    });

    characterLimit.addEventListener("keyup", function() {
        if (characterLimit.value < 50) {
            characterLimit.classList.add("error");
        } else {
            characterLimit.classList.remove("error");
        }
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
});