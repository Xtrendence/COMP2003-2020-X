document.addEventListener("DOMContentLoaded", () => {

    let sessionToken = localStorage.getItem("sessionToken");

    verifySession(sessionToken).then(result => {
        console.log("123");
        let wideCard;
        let cardWrap = document.getElementById("cards");
        const xhr = new XMLHttpRequest();
        let layer = document.getElementById("cards");

        let from = 1;
        let to = 100;





        function getQuestions(from, to) {
            xhr.addEventListener("readystatechange", function () {
                console.log("hello");
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    let json = xhr.responseText;
                    let users = JSON.parse(json);
                    console.log("hello 2");

                    if ("data" in users) {
                        let keys = Object.keys(users["data"]);

                        try {
                            layer.innerHTML = "";
                            let question = users["data"];
                            console.log(keys.length + "look");
                            for (let i = 0; i < keys.length; i++) {


                                /* Variables used for "read" api endpoint field values */
                                let questionID = question[i]["questionID"];
                                let q = question[i]["question"];
                                let questionLim = question[i]["question_charLim"];
                                let questionType = question[i]["question_type"];
                                let choices = question[i]["choices"];



                                /*questionCard(wideCard, questionID, q, questionLim, questionType);
                                choiceCard(wideCard, questionID, q, questionLim, questionType, choices);*/

                                if (questionType == "choice") {



                                    choiceCard(wideCard, questionID, q, questionLim, questionType, choices);


                                } else {
                                    questionCard(wideCard, questionID, q, questionLim, questionType);
                                }



                            }

                        } catch {
                            console.log("error");


                        }

                    }

                    else {

                    }




                }


            });


            xhr.open("GET", "./api/questions/read-all.php?from=" + from + "&to=" + to + "&key=" + result.token, true);
            xhr.send();

        }




        function questionCard(wideCard, questionID, q, questionLim, questionType) {

            let cardAnchor = document.createElement("a");

            wideCard = document.createElement("div");
            wideCard.classList.add("question-wide-card");
            wideCard.id = "wideCard";
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
                '\n' +

                '    </div>'


            cardAnchor.appendChild(wideCard);
            cardWrap.appendChild(cardAnchor);

        }

        getQuestions(from, to);

        function choiceCard(wideCard, questionID, q, questionLim, questionType, choices) {

            try {
                let cardAnchor = document.createElement("a");

                let printout = Object.keys(choices).length;


                wideCard = document.createElement("div");
                wideCard.classList.add("question-wide-card");
                wideCard.id = "wideCard";



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
                    '            <span class="card-heading">Choices: <span class="card-text">' + Object.values(choices).join(", ") + '</span> </span>\n' +
                    '        </div>\n' +
                    '\n' +
                    '    </div>'

                cardAnchor.appendChild(wideCard);
                cardWrap.appendChild(cardAnchor);





            } catch {
                console.log("error");
            }


        }



        document.getElementById("prev-button").addEventListener("click", function () {
            let xhr = new XMLHttpRequest();
            layer.innerHTML = "";
            from = to - 1 ;
            to = to - 2 ;
            getQuestions(from, to);
        });


        document.getElementById("next-button").addEventListener("click", function () {
            let xhr = new XMLHttpRequest();
            layer.innerHTML = "";
            from = to + 1;
            to = to + 2;
            getQuestions(from, to);
        });


        document.getElementById("ask-button").addEventListener("click", function () {

        });


        document.getElementById("ask-button").addEventListener("click", function () {

        });


        document.getElementById("ask-button").addEventListener("click", function () {

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
    }).catch(error => {
        window.location.replace("./login.php");
    });





});