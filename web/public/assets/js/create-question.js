
document.addEventListener("DOMContentLoaded", () => {

    /**
     * @desc variables made from id's in the create-question.php
     * all are in order as seen in the php file
     */
    let enquiry = document.getElementById("question");

    let multipleChoiceRadioButton = document.getElementById("multiple-choice-op");
    let longAnswerRadioButton = document.getElementById("long-answer");

    let multipleOption = document.getElementById("multiple");
    let numberOfChoices = document.getElementById("number-of-choices");
    let optionContainer = document.getElementById("multiple-sub");

    let longAnswerText = document.getElementById("single");
    let characterLimit = document.getElementById("characters");

    let submitButton = document.getElementById("submit");
    let submitText = document.getElementById("sub");


    multipleChoiceRadioButton.addEventListener("click", function() {
        numberOfChoices.value = null;

        multipleOption.classList.remove("hidden");
        multipleChoiceRadioButton.classList.add("active");
        longAnswerText.classList.add("hidden");
        longAnswerRadioButton.classList.remove("active");
        multipleChoiceRadioButton.classList.add("active");
        if (optionContainer.children.length > 0){
            while (optionContainer.hasChildNodes()) {
                optionContainer.removeChild(optionContainer.lastElementChild);
            }
        }

        if (submitText.classList.contains("submission")) {
            submitText.classList.add("hidden");
            submitText.classList.remove("submission");
        }
    });

    longAnswerRadioButton.addEventListener("click", function() {
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

    numberOfChoices.addEventListener("keyup", function(e){
        if (e.key.toLowerCase() === "backspace") {
            if (numberOfChoices.value > 3 || numberOfChoices.value <= 16) {
                while (optionContainer.hasChildNodes()) {
                    optionContainer.removeChild(optionContainer.lastElementChild);
                }
            }
        }
    });

    numberOfChoices.addEventListener("keypress", function(e){
        if (e.key.toLowerCase() === "enter") {
            numberOfChoices.classList.remove("error");
            if (numberOfChoices.value <= 16) {
                for (let i = 2; i < (numberOfChoices.value); i++) {
                    let input = document.createElement("input");
                    input.type = "text";
                    input.classList.add("choice-field");
                    input.placeholder = "Choice " + (i + 1) + "...";
                    optionContainer.appendChild(input);
                }
            }else {
                numberOfChoices.classList.add("error");
            }
        }

    });

    submitButton.addEventListener("click", function(){
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

            submitText.classList.remove("hidden");
            submitText.classList.add("submission");

            enquiry.value = "";
            numberOfChoices.value = "";
            for (let i = 0; i < 2; i++) {
                choiceFields[i].value = "";
            }
            while (optionContainer.hasChildNodes()) {
                optionContainer.removeChild(optionContainer.lastElementChild);
            }


        }
        else{
            if (characterLimit.value < 50) {
                characterLimit.classList.add("error");
            }
            else{
                let questionInformation = {"Question" : enquiry.value , "Type" : "Long Answer", "Length" : characterLimit.value};
                submitText.classList.remove("hidden");
                submitText.classList.add("submission");
                enquiry.value = "";
                characterLimit.value = null;
                Object.keys(questionInformation).forEach(key => {
                    console.table(key, questionInformation[key]);
                });
            }
        }

    });
});