document.addEventListener("DOMContentLoaded", () => {

    console.log("123");
    let wideCard;
    let cardWrap = document.getElementById("cards");
    const xhr = new XMLHttpRequest();
    let layer = document.getElementById("cards");

    let from = 1;
    let to = 2;



    console.log("debug");

    function getQuestions(from, to) {
        xhr.addEventListener("readystatechange", function () {
            console.log("hello");
            if (xhr.readyState === XMLHttpRequest.DONE) {
                let json = xhr.responseText;
                let users = JSON.parse(json);
                console.log("hello 2");
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

                        console.log("debug");



                        console.log("debug");



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


        });

        console.log("123");
        xhr.open("GET", "http://web.socem.plymouth.ac.uk/COMP2003/COMP2003_X/api/questions/read-range.php?from=" + from + "&to=" + to + "&key=8c068d98-874e-46ab-b2a1-5a5eb45a40a6", true);
        xhr.send();

    }




    function questionCard(wideCard, questionID, q, questionLim, questionType){

            let cardAnchor = document.createElement("a");

            wideCard = document.createElement("div");
            wideCard.classList.add("wide-card");
            wideCard.id = "wideCard";
            wideCard.innerHTML = '\n' +
            '        <div class="text-margin">\n' +
            '            <span class="card-heading">Question ID:'+ questionID +' </span>\n' +
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

    getQuestions(from, to);

    function choiceCard(wideCard, questionID, q, questionLim, questionType, choices) {

        try {
            let cardAnchor = document.createElement("a");

            let printout = Object.keys(choices).length;


            wideCard = document.createElement("div");
            wideCard.classList.add("wide-card");
            wideCard.id = "wideCard";



                wideCard.innerHTML = '\n' +
                    '        <div class="text-margin">\n' +
                    '            <span class="card-heading">Question ID:' + questionID + ' </span>\n' +
                    '        </div>\n' +
                    '\n' +
                    '        <div class="text-margin">\n' +
                    '            <span class="card-heading">Question: ' + q + '</span>\n' +
                    '        </div>\n' +
                    '\n' +
                    '        <div class="text-margin">\n' +
                    '            <span class="card-heading">Type: ' + questionType + '</span>\n' +
                    '        </div>\n' +
                    '\n' +
                    '        <div class="text-margin">\n' +
                    '            <span class="card-heading">Choices: ' + Object.values(choices).join(", ") + ' </span>\n' +
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