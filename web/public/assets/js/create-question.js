document.addEventListener("DOMContentLoaded", () => {

    let multipleChoiceOption = document.getElementById("multiple-choice-op");
    let option = document.getElementById("multiple");
    let choices = document.getElementById("number-of-choices");

    let longAnswer = document.getElementById("long-answer");
    let longAnswerText = document.getElementById("single");

    multipleChoiceOption.addEventListener("click", function() {
        if (multipleChoiceOption.className === "form-radio-button") {
            option.classList.remove("hidden");
            multipleChoiceOption.classList.add("active");
            longAnswerText.classList.add("hidden");
            longAnswer.classList.remove("active");
            multipleChoiceOption.classList.add("active");

        } else {
            option.classList.add("hidden");
            multipleChoiceOption.classList.remove("active");
        }
    });

    longAnswer.addEventListener("click", function() {
        if (longAnswer.className === "form-radio-button") {
            longAnswerText.classList.remove("hidden");
            longAnswer.classList.add("active");
            multipleChoiceOption.classList.remove("active");
            option.classList.add("hidden");
            multipleChoiceOption.classList.remove("active");

        } else {
            longAnswerText.classList.add("hidden");
            longAnswer.classList.remove("active");
        }
    });

    choices.addEventListener("keyup", function(){

    });
});