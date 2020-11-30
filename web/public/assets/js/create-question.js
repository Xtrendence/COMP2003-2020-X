
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
    let choiceFields = document.getElementsByClassName("choice-field");
    let optionContainer = document.getElementById("multiple-sub");

    let longAnswerText = document.getElementById("single");
    let characterLimit = document.getElementById("characters");

    let submitButton = document.getElementById("submit");
    let submitText = document.getElementById("sub");

    /**
     * @desc event listener that looks for the click on the multiple choice radio button
     *      it clears all the input boxes, not the question box, and shows all the relevant information boxes to be
     *      filled in
     */
    multipleChoiceRadioButton.addEventListener("click", function() {
        for (let i = 0; i < 2; i++) {
            choiceFields[i].value = "";
        }
        numberOfChoices.value = null;
        multipleOption.classList.remove("hidden");
        multipleChoiceRadioButton.classList.add("active");
        longAnswerText.classList.add("hidden");
        longAnswerRadioButton.classList.remove("active");
        multipleChoiceRadioButton.classList.add("active");

        if (optionContainer.children.length > 0){
            optionContainer.innerHTML = "";
        }

        if (submitText.classList.contains("submission")) {
            submitText.classList.add("hidden");
            submitText.classList.remove("submission");
        }
    });

    /**
     * @desc event listener that looks for the click on the long answer radio button
     *      it clears all the input boxes, not the question box, and shows all the relevant information boxes to be
     *      filled in
     */
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

    /**
     * @desc event listener waits for keyup then checks to see if the key pressed is back space,
     *      once that is checked, it removes all the child nodes from the option container where the
     *      number of choices are larger than 2 and 16 or less
     */
    numberOfChoices.addEventListener("keyup", function(e){
        if (e.key.toLowerCase() === "backspace") {
            if (numberOfChoices.value > 2 || numberOfChoices.value <= 16) {
                optionContainer.innerHTML = "";
            }
        }
    });

    /**
     * @desc event listener awaits key press and checks if it was the enter button.
     *      when this is true it will then check to see if the value is 16 or less,
     *      when this is the case it will add the appropriate number of choice boxes into
     *      the option container. if not it will highlight the box with an error
     */
    numberOfChoices.addEventListener("keyup", function(){
        optionContainer.innerHTML = "";
        if (numberOfChoices.value <= 16) {
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

    /**
     * @desc checks that limit is more than 50 characters
     */
    characterLimit.addEventListener("keyup", function(){
        if (characterLimit.value < 50) {
            characterLimit.classList.add("error");
        } else {
            characterLimit.classList.remove("error");
        }
    });

    /**
     * @desc event listener awaits click on the submit button. The first thing it does
     *      is check to see which radio button is active. If it's the multiple choice radio
     *      button then it'll enter al the users custom choices into an array, after that it
     *      constructs the object to be used in the api. This contains the question, type of question
     *      and the choices. Then all of the input boxes are cleared, and a note saying that the
     *      question has been submitted. If the long answer radio button is selected, it checks to
     *      make sure the character limit is no less than 50, if it is, the input box will
     *      be highlighted red. Once corrected, it creates the object containing the question, type of question
     *      and the character limit.
     */
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
            optionContainer.innerHTML = "";
        } else {

        let questionInformation = {"Question" : enquiry.value , "Type" : "Long Answer", "Length" : characterLimit.value};
        submitText.classList.remove("hidden");
        submitText.classList.add("submission");
        enquiry.value = "";
        characterLimit.value = null;

        Object.keys(questionInformation).forEach(key => {
            console.table(key, questionInformation[key]);
        });
        }
    });
});