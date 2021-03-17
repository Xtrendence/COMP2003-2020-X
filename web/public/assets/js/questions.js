document.addEventListener("DOMContentLoaded", () => {

    console.log("123");
    let wideCard;
    let cardWrap = document.getElementById("cards");
    const xhr = new XMLHttpRequest();




    function getQuestions() {
        xhr.addEventListener("readystatechange", function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let json = xhr.responseText;
                let users = JSON.parse(json);
                let keys = Object.keys(users["data"]);

                try {

                    let question = users["data"];
                    for (let i = 0; i < keys.length; i++) {


                        /* Variables used for "read" api endpoint field values */
                        let questionID = question[i]["questionID"];
                        console.log(i);
                        let q = question[i]["question"];
                        let questionLim = question[i]["question_charLim"];
                        let questionType = question[i]["question_type"];
                        let choices = question[i]["choices"];

                        console.log("debug");
                        questionCard(wideCard, questionID, q, questionLim, questionType, choices);
                    }

                } catch {
                    console.log("error");
                }

            }


        });

        console.log("123");
        xhr.open("GET", "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/api/users/read-all.php?&key=8c068d98-874e-46ab-b2a1-5a5eb45a40a6", true);
        xhr.send();

    }




    function questionCard(wideCard, questionID, q, questionLim, questionType, choices){

        let cardAnchor = document.createElement("a");

        wideCard = document.createElement("div");
        wideCard.classList.add("wide-card");
        wideCard.id = "wideCard";
        wideCard.innerHTML = '\n' +
            '        <div class="text-margin">\n' +
            '            <span class="card-heading">Question ID: '+ questionID +' </span>\n' +
            '        </div>\n' +
            '\n' +
            '        <div class="text-margin">\n' +
            '            <span class="card-heading">Question: '+ q +'</span>\n' +
            '        </div>\n' +
            '\n' +
            '        <div class="text-margin">\n' +
            '            <span class="card-heading">Character Limit: '+ questionLim +'</span>\n' +
            '        </div>\n' +
            '\n' +
            '        <div class="text-margin">\n' +
            '            <span class="card-heading">Type: '+ questionType +' </span>\n' +
            '        </div>\n' +
            '\n' +
            '    </div>'


        cardAnchor.appendChild(wideCard);
        cardWrap.appendChild(cardAnchor);

    }

    getQuestions();

});