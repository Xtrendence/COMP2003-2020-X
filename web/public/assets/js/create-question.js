
document.addEventListener("DOMContentLoaded", () => {

    let enquiry = document.getElementById("question");
    let question = document.getElementById("question").value;

    let multipleChoiceOption = document.getElementById("multiple-choice-op");
    let option = document.getElementById("multiple");
    let choices = document.getElementById("number-of-choices");
    let optionContainer = document.getElementById("multiple-sub");
    let ch1 = document.getElementById("ch1");
    let ch2 = document.getElementById("ch2");

    let longAnswer = document.getElementById("long-answer");
    let longAnswerText = document.getElementById("single");
    let characters = document.getElementById("characters");

    let submit = document.getElementById("submit");
    let sub = document.getElementById("sub");


    multipleChoiceOption.addEventListener("click", function() {
        choices.value = null;

        option.classList.remove("hidden");
        multipleChoiceOption.classList.add("active");
        longAnswerText.classList.add("hidden");
        longAnswer.classList.remove("active");
        multipleChoiceOption.classList.add("active");
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
        multipleChoiceOption.classList.remove("active");
        option.classList.add("hidden");
        multipleChoiceOption.classList.remove("active");

        if (sub.classList.contains("submission")) {
            sub.classList.add("hidden");
            sub.classList.remove("submission");
        }
    });

    choices.addEventListener("keyup", function(e){
        if (e.key.toLowerCase() === "backspace") {
            if (choices.value <= 16) {
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
                    input.id = "ch" + (i + 1);
                    input.placeholder = "Choice " + (i + 1) + "...";
                    optionContainer.appendChild(input);
                }
            }else {
                choices.classList.add("error");
            }
        }

    });

    submit.addEventListener("click", function(){
        if (multipleChoiceOption.classList.contains("active")){
            let choiceOptions = []
            for (let i = 0; i < (choices.value); i++) {
                let theID = "ch" + (i+1);
                let theOption = document.getElementById(theID).value;
                choiceOptions.push(theOption);
            }
            let questionInformation = {"Question" : question , "Type" : "Multiple Choice", "Choices" : choiceOptions};
            sub.classList.remove("hidden");
            sub.classList.add("submission");
            enquiry.value = "";
            choices.value = "";
            ch1.value = "";
            ch2.value = "";
            while (optionContainer.hasChildNodes()) {
                optionContainer.removeChild(optionContainer.lastElementChild);
            }
            Object.keys(questionInformation).forEach(key => {
                console.log(key, questionInformation[key]);
            });
        }
        else{
            if (characters.value < 50) {
                characters.classList.add("error");
            }
            else{
                let questionInformation = {"Question" : question , "Type" : "Long Answer", "Length" : characters.value};
                sub.classList.remove("hidden");
                sub.classList.add("submission");
                enquiry.value = "";
                characters.value = null;
                Object.keys(questionInformation).forEach(key => {
                    console.log(key, questionInformation[key]);
                });
            }
        }

    });
});