
document.addEventListener("DOMContentLoaded", () => {

    /**
     * @desc variables made from id's in the create-question.php
     */
    let enquiry = document.getElementById("question");

    let multipleChoiceRadioButton = document.getElementById("multiple-choice-op");
    let multipleOption = document.getElementById("multiple");
    let choices = document.getElementById("number-of-choices");
    let optionContainer = document.getElementById("multiple-sub");
    let choiceFields = document.getElementById("choice-field");

    let longAnswer = document.getElementById("long-answer");
    let longAnswerText = document.getElementById("single");
    let characters = document.getElementById("characters");

    let submit = document.getElementById("submit");
    let sub = document.getElementById("sub");


    multipleChoiceRadioButton.addEventListener("click", function() {
        choices.value = null;

        multipleOption.classList.remove("hidden");
        multipleChoiceRadioButton.classList.add("active");
        longAnswerText.classList.add("hidden");
        longAnswer.classList.remove("active");
        multipleChoiceRadioButton.classList.add("active");
        if (optionContainer.children.length > 0){
            while (optionContainer.hasChildNodes()) {
                optionContainer.removeChild(optionContainer.lastElementChild);
            }
        }

        if (sub.classList.contains("submission")) {
            sub.classList.add("hidden");
            sub.classList.remove("submission");
        }
    });

    longAnswer.addEventListener("click", function() {
        characters.value = null;

        longAnswerText.classList.remove("hidden");
        longAnswer.classList.add("active");
        multipleChoiceRadioButton.classList.remove("active");
        multipleOption.classList.add("hidden");
        multipleChoiceRadioButton.classList.remove("active");

        if (sub.classList.contains("submission")) {
            sub.classList.add("hidden");
            sub.classList.remove("submission");
        }
    });

    choices.addEventListener("keyup", function(e){
        if (e.key.toLowerCase() === "backspace") {
            if (choices.value > 3 || choices.value <= 16) {
                while (optionContainer.hasChildNodes()) {
                    optionContainer.removeChild(optionContainer.lastElementChild);
                }
            }
        }
    });

    choices.addEventListener("keypress", function(e){
        if (e.key.toLowerCase() === "enter") {
            choices.classList.remove("error");
            if (choices.value <= 16) {
                for (let i = 2; i < (choices.value); i++) {
                    let input = document.createElement("input");
                    input.type = "text";
                    input.classList.add("choice-field");
                    input.placeholder = "Choice " + (i + 1) + "...";
                    optionContainer.appendChild(input);
                }
            }else {
                choices.classList.add("error");
            }
        }

    });

    submit.addEventListener("click", function(){
        if (multipleChoiceRadioButton.classList.contains("active")){
            let choiceOptions = []
            let choiceFields = document.getElementsByClassName("choice-field");
            for (let i = 0; i < choiceFields.length; i++) {
                choiceOptions.push(choiceFields[i].value);
            }

            let questionInformation = {"Question" : enquiry.value , "Type" : "Multiple Choice", "Choices" : choiceOptions};
            Object.keys(questionInformation).forEach(key => {
                console.table(key, questionInformation[key]);
            });

            sub.classList.remove("hidden");
            sub.classList.add("submission");

            enquiry.value = "";
            choices.value = "";
            for (let i = 0; i < 2; i++) {
                choiceFields[i].value = "";
            }
            while (optionContainer.hasChildNodes()) {
                optionContainer.removeChild(optionContainer.lastElementChild);
            }


        }
        else{
            if (characters.value < 50) {
                characters.classList.add("error");
            }
            else{
                let questionInformation = {"Question" : enquiry.value , "Type" : "Long Answer", "Length" : characters.value};
                sub.classList.remove("hidden");
                sub.classList.add("submission");
                enquiry.value = "";
                characters.value = null;
                Object.keys(questionInformation).forEach(key => {
                    console.table(key, questionInformation[key]);
                });
            }
        }

    });
});