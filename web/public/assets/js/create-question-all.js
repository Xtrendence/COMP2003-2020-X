document.addEventListener("DOMContentLoaded", () => {
    //verifySession(localStorage.getItem("sessionToken")).then(result => {

        const Notify = new XNotify("BottomRight");

        let multipleChoiceRadioButton = document.getElementById("multiple-choice-op");
        let longAnswerRadioButton = document.getElementById("long-answer");

        let enquiry = document.getElementById("question");
        let multipleOption = document.getElementById("multiple");
        let numberOfChoices = document.getElementById("number-of-choices");
        let choiceFields = document.getElementsByClassName("choice-field");
        let optionContainer = document.getElementById("multiple-sub");

        let longAnswerText = document.getElementById("single");
        let characterLimit = document.getElementById("characters");

        let submitButton = document.getElementById("submit");

        /**
         * @desc checks to see is all input boxes have been inputted into
         * @returns {boolean}
         */
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

        /**
         * @desc event listener removes any error boxes, then looks for the click on the multiple choice radio button
         *      it clears all the input boxes, not the question box, and shows all the relevant information boxes to be
         *      filled in
         */
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
        });

        /**
         * @desc event listener removes any error boxes, then looks for the click on the long answer radio button
         *      it clears all the input boxes, not the question box, and shows all the relevant information boxes to be
         *      filled in
         */
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
        });

        /**
         * @desc event listener waits for keyup then checks to see if the key pressed is back space,
         *      once that is checked, it removes all the child nodes from the option container where the
         *      number of choices are larger than 2 and 16 or less
         */
        numberOfChoices.addEventListener("keyup", function(e) {
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

        /**
         * @desc checks that limit is more than 50 characters
         */
        characterLimit.addEventListener("keyup", function() {
            if (characterLimit.value < 50) {
                characterLimit.classList.add("error");
            } else {
                characterLimit.classList.remove("error");
            }
        });

        submitButton.addEventListener("click", function() {
            if (checkForm()) {
                let xhr = new XMLHttpRequest();
                xhr.addEventListener("readystatechange", async function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        let json = xhr.responseText;
                        let users = JSON.parse(json);
                        let keys = Object.keys(users["data"]);
                        
                        try {
                            Notify.info({
                                title: "Please Wait", 
                                description: "Your question is being submitted to all patients.", 
                                duration: 4000,
                                background: "var(--accent-gradient)",
                                color: "var(--accent-contrast)",
                            });
                            let patient = users["data"];
                            for (let i = 0; i < keys.length; i++){
                                let userID = patient[i]["patientID"];
                                let checkCreateQuestion = await createQuestion(userID);
                                console.log(checkCreateQuestion);
                            };
                            Notify.success({
                                title: "Success", 
                                description: "Your question has been submitted.", 
                                duration: 4000,
                                background: "var(--accent-gradient)",
                                color: "var(--accent-contrast)",
                            });
                        } catch {
                            console.error("error");
                        }
                    };
                });
                xhr.open("GET", "./api/users/read-all.php?key=8c068d98-874e-46ab-b2a1-5a5eb45a40a6", true);
                xhr.send();

                
            } else {
                Notify.error({
                    title: "Error", 
                    description: "Your question is missing elements.", 
                    duration: 4000,
                    background: "linear-gradient(120deg, rgb(130,30,30) 25%, rgb(100,30,30) 50%, rgb(70,30,30) 100%)",
                    color: "var(--accent-contrast)",
                });
            }
        });

        function createQuestion(ID) {
            return new Promise (resolve => {
                let body;
                let xhr = new XMLHttpRequest();
                if (multipleChoiceRadioButton.classList.contains("active")) {
                    let choiceOptions = [];
                    let choiceFields = document.getElementsByClassName("choice-field");
                    for (let i = 0; i < choiceFields.length; i++) {
                        choiceOptions.push(choiceFields[i].value);
                        choiceFields[i].value = "";
                    }
                    body = {
                        patientID: ID,
                        question: enquiry.value,
                        question_type: "choice",
                        choices: choiceOptions
                    };
                    
                    enquiry.value = "";
                    numberOfChoices.value = "";
                    optionContainer.innerHTML = "";

                } else {
                    body = {
                        patientID: ID,
                        question: enquiry.value,
                        question_type: "custom",
                        question_charLim: characterLimit.value
                    };
                    
                    enquiry.value = "";
                    characterLimit.value = null;
                }
                
                xhr.open("POST", "./api/questions/create.php?key=8c068d98-874e-46ab-b2a1-5a5eb45a40a6", true);
                xhr.send(JSON.stringify(body));
                
                xhr.addEventListener("readystatechange", function() {
                    if (xhr.readyState === XMLHttpRequest.DONE) {
                        let responseJSON = xhr.responseText;
                        try {
                            if(xhr.status == 200) {
                                let response = JSON.parse(responseJSON);
                                resolve(response["questionID"]);
                            }
                        } catch(e) {
                            console.log(e);
                        }
                    }
                });
            });
        };

        /**
         * @desc on DOM loaded, it checks to see if localStorage has the key:'theme', and if it does is it's value:'dark'.
         *      when that is true, it sets the body with an attribute to turn the theme dark.
         */
        if(localStorage.getItem('theme') === 'dark') { 
            document.body.setAttribute('data-theme', 'dark'); 
        } else { 
            document.body.removeAttribute('data-theme', 'dark');
        } 
    //}).catch(error => {
    //    window.location.replace("./login.php");
    //});
});